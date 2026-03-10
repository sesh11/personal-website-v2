'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface Theme {
  key: string
  label: string
  vars: Record<string, string>
}

const themes: Theme[] = [
  {
    key: 'cosmos',
    label: 'Cosmos',
    vars: {
      '--color-bg': '#000000',
      '--color-text': '#d0cfd8',
      '--color-text-muted': '#5a5a70',
      '--color-heading': '#ffffff',
      '--color-accent': '#8b8bac',
      '--color-accent-hover': '#b0b0d0',
      '--color-header-bg': 'rgba(0, 0, 0, 0.85)',
      '--color-header-border': 'rgba(255, 255, 255, 0.06)',
      '--color-card-border': 'rgba(255, 255, 255, 0.06)',
      '--color-code-bg': 'rgba(255, 255, 255, 0.05)',
      '--color-pre-bg': 'rgba(0, 0, 0, 0.6)',
      '--color-pre-border': 'rgba(255, 255, 255, 0.06)',
      '--color-icon-bg': 'rgba(255, 255, 255, 0.05)',
      '--accent-rgb': '139, 139, 172',
      '--starfield-opacity': '0',
      '--star-color': '200, 200, 220',
    },
  },
  {
    key: 'daylight',
    label: 'Daylight',
    vars: {
      '--color-bg': '#fafaf8',
      '--color-text': '#2c2c2c',
      '--color-text-muted': '#888888',
      '--color-heading': '#111111',
      '--color-accent': '#555555',
      '--color-accent-hover': '#222222',
      '--color-header-bg': 'rgba(250, 250, 248, 0.9)',
      '--color-header-border': 'rgba(0, 0, 0, 0.08)',
      '--color-card-border': 'rgba(0, 0, 0, 0.08)',
      '--color-code-bg': 'rgba(0, 0, 0, 0.05)',
      '--color-pre-bg': '#f0f0ee',
      '--color-pre-border': 'rgba(0, 0, 0, 0.08)',
      '--color-icon-bg': 'rgba(0, 0, 0, 0.05)',
      '--accent-rgb': '85, 85, 85',
      '--starfield-opacity': '0',
      '--star-color': '0, 0, 0',
    },
  },
  {
    key: 'terminal',
    label: 'Terminal',
    vars: {
      '--color-bg': '#0a0e0a',
      '--color-text': '#b0ccb0',
      '--color-text-muted': '#4a6a4a',
      '--color-heading': '#00ff41',
      '--color-accent': '#00ff41',
      '--color-accent-hover': '#33ff66',
      '--color-header-bg': 'rgba(10, 14, 10, 0.85)',
      '--color-header-border': 'rgba(0, 255, 65, 0.1)',
      '--color-card-border': 'rgba(0, 255, 65, 0.08)',
      '--color-code-bg': 'rgba(0, 255, 65, 0.06)',
      '--color-pre-bg': 'rgba(0, 0, 0, 0.5)',
      '--color-pre-border': 'rgba(0, 255, 65, 0.1)',
      '--color-icon-bg': 'rgba(0, 255, 65, 0.05)',
      '--accent-rgb': '0, 255, 65',
      '--starfield-opacity': '0',
      '--star-color': '100, 200, 120',
    },
  },
  {
    key: 'terminator',
    label: 'Terminator',
    vars: {
      '--color-bg': '#0e0808',
      '--color-text': '#ccb0b0',
      '--color-text-muted': '#6a4a4a',
      '--color-heading': '#ff1a1a',
      '--color-accent': '#ff1a1a',
      '--color-accent-hover': '#ff4d4d',
      '--color-header-bg': 'rgba(14, 8, 8, 0.85)',
      '--color-header-border': 'rgba(255, 26, 26, 0.1)',
      '--color-card-border': 'rgba(255, 26, 26, 0.08)',
      '--color-code-bg': 'rgba(255, 26, 26, 0.06)',
      '--color-pre-bg': 'rgba(0, 0, 0, 0.5)',
      '--color-pre-border': 'rgba(255, 26, 26, 0.1)',
      '--color-icon-bg': 'rgba(255, 26, 26, 0.05)',
      '--accent-rgb': '255, 26, 26',
      '--starfield-opacity': '0',
      '--star-color': '200, 100, 100',
    },
  },
]

function applyTheme(theme: Theme) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value)
  }
}

export default function ThemeToggle() {
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)

  const cycle = useCallback(() => {
    const next = (indexRef.current + 1) % themes.length
    indexRef.current = next
    setIndex(next)
    applyTheme(themes[next])
    localStorage.setItem('theme-index', String(next))
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('theme-index')
    if (saved !== null) {
      const i = parseInt(saved, 10)
      if (i >= 0 && i < themes.length) {
        indexRef.current = i
        setIndex(i)
        applyTheme(themes[i])
      }
    }
  }, [])

  const icons: Record<string, React.ReactNode> = {
    cosmos: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
    daylight: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    terminal: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    terminator: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  }

  return (
    <button
      onClick={cycle}
      title={`Theme: ${themes[index].label}`}
      aria-label={`Switch theme, currently ${themes[index].label}`}
      className="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        padding: '0.25rem',
        cursor: 'pointer',
        color: 'var(--color-text-muted)',
      }}
    >
      {icons[themes[index].key]}
    </button>
  )
}
