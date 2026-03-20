import { render, screen } from '@testing-library/react'
import Footer from './Footer'

const expectedLinks = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nithin-seshadri-b5703766/',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/sesh11',
  },
  {
    title: 'X / Twitter',
    href: 'https://x.com/seshadrinithin',
  },
  {
    title: 'Substack',
    href: 'https://substack.com/@nithinseshadri',
  },
]

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renders exactly 4 social links', () => {
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(4)
  })

  it.each(expectedLinks)(
    '$title link has correct href and attributes',
    ({ title, href }) => {
      const link = screen.getByTitle(title)
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    },
  )

  it.each(expectedLinks)(
    '$title link contains an SVG icon',
    ({ title }) => {
      const link = screen.getByTitle(title)
      const svg = link.querySelector('svg')
      expect(svg).toBeInTheDocument()
    },
  )
})
