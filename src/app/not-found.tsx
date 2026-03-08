import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-5 text-center mt-24">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-text-muted mb-8">Page not found.</p>
      <Link href="/" className="text-text underline">
        Go home
      </Link>
    </div>
  )
}
