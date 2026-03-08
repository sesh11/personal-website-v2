import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getAllPostSummaries } from '@/lib/content'

export default function BlogPage() {
  const posts = getAllPostSummaries()

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-5">
      <Header />

      <main className="mb-24">
        <h1 className="text-5xl font-normal my-8">POSTS</h1>

        {posts.length === 0 ? (
          <p className="text-text-muted text-center py-4">No posts yet.</p>
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
