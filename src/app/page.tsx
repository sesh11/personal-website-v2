import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import { getAllPostSummaries } from '@/lib/content'

export default function HomePage() {
  const recentPosts = getAllPostSummaries().slice(0, 3)

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-2xl mx-auto px-6 pt-24 pb-12">
        {/* Name */}
        <h1
          className="text-3xl sm:text-4xl font-light tracking-tight mb-10"
          style={{ color: 'var(--color-heading)' }}
        >
          Nithin Seshadri
        </h1>

        {/* About */}
        <section className="mb-12">
          <div
            className="space-y-4 text-sm leading-relaxed"
            style={{ color: 'var(--color-text)' }}
          >
            <p>
              Hi, I&rsquo;m Nithin.
            </p>
            <p>
              Thanks for taking the time to visit my website. I build systems, teams, and ideas.
            </p>
            <p>
              We are living through one of the most exciting moments to build. AI has changed how I work, learn, and think. Knowing how to use it well is becoming a foundational skill, and that starts with building the right intuitions.
            </p>
            <p>
              My work sits at the intersection of engineering leadership and hands-on building. I&rsquo;ve spent my career architecting systems that operate at enterprise scale and solving hard operational problems where precision matters. Today, I&rsquo;m focused on AI in healthcare, especially how to apply language models and decision systems in ways that are practical, rigorous, and useful.
            </p>
            <p>
              My background is in industrial engineering, operations research, and decision science. That foundation shapes how I think. I care about leverage, compounding, and designing systems that make better decisions over time. Increasingly, I&rsquo;m interested in systems that can build, improve, and evolve other systems.
            </p>
            <p>
              This site is where I share what I&rsquo;m building, what I&rsquo;m learning, and how I&rsquo;m thinking.
            </p>
          </div>
        </section>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section>
            <h2
              className="text-xs tracking-widest uppercase mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Recent Writing
            </h2>
            <div>
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </div>
  )
}
