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
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <Header />

      <main className="mb-24">
        <Link
          href="/blog"
          className="text-text-muted no-underline hover:underline"
        >
          &larr; Back to posts
        </Link>

        <article className="mt-6">
          <h1 className="text-4xl font-bold mb-2">{post.frontmatter.title}</h1>
          <p className="text-sm text-text-muted mb-8">
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
