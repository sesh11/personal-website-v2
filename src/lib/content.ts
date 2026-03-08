import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDir = path.join(process.cwd(), 'content', 'posts')
const aboutDir = path.join(process.cwd(), 'content', 'about')

export interface PostFrontmatter {
  title: string
  date: string
  summary: string
  tags: string[]
}

export interface PostSummary {
  slug: string
  frontmatter: PostFrontmatter
}

export interface Post extends PostSummary {
  contentHtml: string
}

async function markdownToHtml(md: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md)
  return result.toString()
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace('.md', ''))
}

export function getAllPostSummaries(): PostSummary[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  return files
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return { slug, frontmatter: data as PostFrontmatter }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const contentHtml = await markdownToHtml(content)
  return { slug, frontmatter: data as PostFrontmatter, contentHtml }
}

export async function getAboutSection(section: string): Promise<string> {
  const filePath = path.join(aboutDir, `${section}.md`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  return markdownToHtml(raw)
}
