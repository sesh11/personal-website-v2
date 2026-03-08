import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-12">
      <nav className="flex justify-end w-full gap-5">
        <Link
          href="/blog"
          className="font-bold text-black bg-white no-underline"
        >
          POSTS
        </Link>
        <Link
          href="/"
          className="font-bold text-black bg-white no-underline"
        >
          ABOUT
        </Link>
      </nav>
    </header>
  )
}
