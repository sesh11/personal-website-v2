# nsesh.com

Personal website built with Next.js (App Router) and deployed as a static site to S3 + CloudFront.

## Development

```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Generate static site to /out
npm run lint    # Run ESLint
```

## Content

Blog posts live in `content/posts/` as markdown files with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2025-01-01"
summary: "Short description"
tags: ["tag1", "tag2"]
---
```

About page sections live in `content/about/` as plain markdown (no frontmatter).

## Architecture

- **Framework:** Next.js with static export (`output: 'export'`)
- **Styling:** Tailwind CSS v4
- **Content:** Markdown parsed at build time with gray-matter + remark
- **Hosting:** S3 + CloudFront
