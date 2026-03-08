import Link from 'next/link'
import type { PostSummary } from '@/lib/content'

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline text-inherit">
      <article className="py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-1">{post.frontmatter.title}</h2>
        <p className="text-sm text-text-muted mb-1">
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <p className="text-base">{post.frontmatter.summary}</p>
      </article>
    </Link>
  )
}
