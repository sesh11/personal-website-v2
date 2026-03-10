import type { Metadata } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import StarField from '@/components/StarField'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nithin Seshadri',
  description: "Nithin Seshadri's personal website",
  icons: {
    icon: '/ns1.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body style={{ fontFamily: "var(--font-ibm-plex-mono), 'SF Mono', monospace" }}>
        <StarField />
        {children}
      </body>
    </html>
  )
}
