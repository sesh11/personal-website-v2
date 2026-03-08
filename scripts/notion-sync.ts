import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import fs from 'fs'
import path from 'path'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

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

  // Clear existing posts — Notion is the sole source of truth
  if (fs.existsSync(POSTS_DIR)) {
    for (const file of fs.readdirSync(POSTS_DIR)) {
      if (file.endsWith('.md')) {
        fs.unlinkSync(path.join(POSTS_DIR, file))
      }
    }
  } else {
    fs.mkdirSync(POSTS_DIR, { recursive: true })
  }

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

    console.log(`Syncing: ${meta.title} → content/posts/${meta.slug}.md`)

    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = n2m.toMarkdownString(mdBlocks)
    const body = typeof mdString === 'string' ? mdString : mdString.parent

    const frontmatter = [
      '---',
      `title: "${meta.title}"`,
      `date: "${meta.date}"`,
      `summary: "${meta.summary}"`,
      `tags: [${meta.tags.map((t) => `"${t}"`).join(', ')}]`,
      '---',
    ].join('\n')

    const fileContent = `${frontmatter}\n\n${body.trim()}\n`
    fs.writeFileSync(path.join(POSTS_DIR, `${meta.slug}.md`), fileContent)
  }

  console.log('Sync complete.')
}

syncNotionToMarkdown().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
