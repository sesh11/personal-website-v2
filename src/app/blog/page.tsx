import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getAllPostSummaries } from '@/lib/content'

export default function BlogPage() {
  const posts = getAllPostSummaries()

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
      <Header />

      <main className="mb-16">
        <h1
          className="text-2xl font-light mb-8"
          style={{ color: 'var(--color-heading)' }}
        >
          Posts
        </h1>

        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }} className="text-center py-4 text-sm">
            No posts yet.
          </p>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
