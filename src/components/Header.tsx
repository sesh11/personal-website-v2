import Link from 'next/link'
import ThemeToggle from '@/components/ColorToggle'

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'var(--color-header-bg)',
        borderBottom: '1px solid var(--color-header-border)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Link
        href="/"
        className="text-sm font-medium no-underline tracking-wider uppercase"
        style={{ color: 'var(--color-text)' }}
      >
        Nithin Seshadri
      </Link>
      <div className="flex items-center gap-5">
        <nav className="flex gap-5">
          <Link
            href="/blog"
            className="no-underline text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Posts
          </Link>
          <Link
            href="/"
            className="no-underline text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: 'var(--color-text-muted)' }}
          >
            About
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
