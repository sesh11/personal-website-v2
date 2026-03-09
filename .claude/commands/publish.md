Publish new blog content from Notion to the live site.

Steps:
1. Run the Notion sync script: `npx tsx scripts/notion-sync.ts`
2. Check for changes with `git status content/posts/`
3. If there are changes (new, modified, or deleted files in content/posts/):
   - Stage the changes: `git add content/posts/`
   - Commit with message: `sync from notion`
   - Push to main: `git push origin main`
   - Report what was synced (the sync script logs additions, updates, and removals)
4. If there are no changes, report: "Nothing new to publish — content is already up to date."

The push to main will automatically trigger the GitHub Actions deploy workflow which builds the site and deploys to S3 + CloudFront.
