import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllPostSlugs, getPostBySlug } from '@/lib/content'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
      <Header />

      <main className="mb-16">
        <Link
          href="/blog"
          className="no-underline text-xs tracking-wide transition-colors duration-200"
          style={{ color: 'var(--color-accent)' }}
        >
          &larr; Back to posts
        </Link>

        <article className="mt-6">
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: 'var(--color-heading)' }}
          >
            {post.frontmatter.title}
          </h1>
          <p className="text-xs mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>

      <Footer />
    </div>
  )
}
