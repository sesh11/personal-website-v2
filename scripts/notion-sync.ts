import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'posts')

async function downloadImage(
  url: string,
  slug: string,
): Promise<{ localPath: string; filename: string } | null> {
  try {
    const urlObj = new URL(url)
    const pathOnly = urlObj.origin + urlObj.pathname
    const hash = crypto.createHash('sha256').update(pathOnly).digest('hex').slice(0, 12)

    const ext = path.extname(urlObj.pathname).toLowerCase() || '.png'
    const filename = `${hash}${ext}`

    const slugDir = path.join(IMAGES_DIR, slug)
    const filePath = path.join(slugDir, filename)

    if (fs.existsSync(filePath)) {
      return { localPath: `/images/posts/${slug}/${filename}`, filename }
    }

    fs.mkdirSync(slugDir, { recursive: true })

    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      console.warn(`  warning: failed to download image (${response.status}): ${pathOnly}`)
      return null
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    fs.writeFileSync(filePath, buffer)
    console.log(`  downloaded: ${filename}`)

    return { localPath: `/images/posts/${slug}/${filename}`, filename }
  } catch (err) {
    console.warn(`  warning: image download failed: ${err}`)
    return null
  }
}

interface PostMeta {
  title: string
  slug: string
  date: string
  summary: string
  tags: string[]
}

function getProperty(page: any, name: string, type: string): any {
  const prop = page.properties[name]
  if (!prop) return null

  switch (type) {
    case 'title':
      return prop.title?.map((t: any) => t.plain_text).join('') || ''
    case 'rich_text':
      return prop.rich_text?.map((t: any) => t.plain_text).join('') || ''
    case 'date':
      return prop.date?.start || ''
    case 'multi_select':
      return prop.multi_select?.map((s: any) => s.name) || []
    case 'select':
      return prop.select?.name || ''
    default:
      return null
  }
}

async function syncNotionToMarkdown() {
  console.log('Querying Notion database for published posts...')

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'Status',
      status: { equals: 'Published' },
    },
  })

  console.log(`Found ${response.results.length} published post(s)`)

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }

  const notionSlugs = new Set<string>()
  const stats = { added: 0, updated: 0, removed: 0, unchanged: 0 }

  for (const page of response.results) {
    const meta: PostMeta = {
      title: getProperty(page, 'Title', 'title') || getProperty(page, 'Name', 'title'),
      slug: getProperty(page, 'Slug', 'rich_text'),
      date: getProperty(page, 'Date', 'date'),
      summary: getProperty(page, 'Summary', 'rich_text') || '',
      tags: getProperty(page, 'Tags', 'multi_select') || [],
    }

    if (!meta.slug) {
      console.warn(`Skipping post "${meta.title}" — no slug defined`)
      continue
    }

    if (!meta.date) {
      console.warn(`Skipping post "${meta.title}" — no date defined`)
      continue
    }

    notionSlugs.add(meta.slug)

    const currentPostImages = new Set<string>()

    n2m.setCustomTransformer('image', async (block: any) => {
      const imageBlock = block.image
      const url = imageBlock?.file?.url || imageBlock?.external?.url
      if (!url) return ''

      const caption =
        imageBlock.caption?.map((c: any) => c.plain_text).join('') ||
        path.basename(new URL(url).pathname)

      const result = await downloadImage(url, meta.slug)
      if (result) {
        currentPostImages.add(result.filename)
        return `![${caption}](${result.localPath})`
      }
      return `![${caption}](${url})`
    })

    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = n2m.toMarkdownString(mdBlocks)
    const body = typeof mdString === 'string' ? mdString : mdString.parent

    // Prune stale images for this post
    const slugImageDir = path.join(IMAGES_DIR, meta.slug)
    if (fs.existsSync(slugImageDir)) {
      for (const file of fs.readdirSync(slugImageDir)) {
        if (!currentPostImages.has(file)) {
          fs.unlinkSync(path.join(slugImageDir, file))
          console.log(`  pruned stale image: ${meta.slug}/${file}`)
        }
      }
      // Remove directory if empty
      if (fs.readdirSync(slugImageDir).length === 0) {
        fs.rmdirSync(slugImageDir)
      }
    }

    const frontmatter = [
      '---',
      `title: "${meta.title}"`,
      `date: "${meta.date}"`,
      `summary: "${meta.summary}"`,
      `tags: [${meta.tags.map((t) => `"${t}"`).join(', ')}]`,
      '---',
    ].join('\n')

    const fileContent = `${frontmatter}\n\n${body.trim()}\n`
    const filePath = path.join(POSTS_DIR, `${meta.slug}.md`)

    // Delta check: only write if content has changed
    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, 'utf-8')
      if (existing === fileContent) {
        console.log(`  unchanged: ${meta.slug}.md`)
        stats.unchanged++
        continue
      }
      console.log(`  updated: ${meta.slug}.md`)
      stats.updated++
    } else {
      console.log(`  added: ${meta.slug}.md`)
      stats.added++
    }

    fs.writeFileSync(filePath, fileContent)
  }

  // Remove posts that are no longer published in Notion
  for (const file of fs.readdirSync(POSTS_DIR)) {
    if (!file.endsWith('.md')) continue
    const slug = file.replace('.md', '')
    if (!notionSlugs.has(slug)) {
      console.log(`  removed: ${file}`)
      fs.unlinkSync(path.join(POSTS_DIR, file))
      // Also remove the post's image directory
      const slugImageDir = path.join(IMAGES_DIR, slug)
      if (fs.existsSync(slugImageDir)) {
        fs.rmSync(slugImageDir, { recursive: true })
        console.log(`  removed images: ${slug}/`)
      }
      stats.removed++
    }
  }

  console.log(
    `\nSync complete — added: ${stats.added}, updated: ${stats.updated}, removed: ${stats.removed}, unchanged: ${stats.unchanged}`,
  )
}

syncNotionToMarkdown().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
