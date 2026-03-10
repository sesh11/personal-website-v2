import Link from 'next/link'
import type { PostSummary } from '@/lib/content'

export default function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <article
        className="py-4 transition-all duration-200"
        style={{ borderBottom: '1px solid var(--color-card-border)' }}
      >
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h2
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--color-text)' }}
          >
            <span className="group-hover:text-[var(--color-accent)]">
              {post.frontmatter.title}
            </span>
          </h2>
          <span
            className="text-xs shrink-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </span>
        </div>
        {post.frontmatter.summary && (
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {post.frontmatter.summary}
          </p>
        )}
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.65rem] px-1.5 py-0.5 rounded"
                style={{
                  color: 'var(--color-accent)',
                  background: 'rgba(var(--accent-rgb), 0.08)',
                  border: '1px solid rgba(var(--accent-rgb), 0.12)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
