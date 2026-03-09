Publish new blog content from Notion to the live site.

## Pre-flight checks

1. **Uncommitted changes check** — Run `git status --porcelain`. If there is any output, stop and tell the user:
   > "You have uncommitted changes. Please commit or stash them first before publishing."
   Do not proceed.

2. **Branch check** — Run `git branch --show-current`. If the result is not `main`, stop and tell the user:
   > "You're on branch `<branch>`. Switch to main first: `git checkout main && git pull origin main`"
   Do not auto-switch branches. Do not proceed.

3. **Pull latest** — Run `git pull origin main` to ensure the local branch is up to date and avoid push conflicts.

## Sync

4. Run `npx tsx scripts/notion-sync.ts`. If it exits with a non-zero code, report the error output and stop. Mention common causes:
   - Missing or invalid `.env.local` (NOTION_API_KEY, NOTION_DATABASE_ID)
   - Notion API rate limits or auth errors
   - Network connectivity issues

## Check for changes

5. Run `git status --porcelain content/posts/`. If the output is empty, report:
   > "Nothing new to publish — content is already up to date."
   Stop here.

## Commit and push

6. **Build a descriptive commit message from the sync results:**
   - Examine the git status output to categorize changes:
     - Files with `?? ` or `A ` prefix → **added**
     - Files with `M ` or ` M` prefix → **updated**
     - Files with `D ` or ` D` prefix → **removed**
   - First line of the commit message:
     - If only additions: `publish: add N new post(s) from notion`
     - If only updates: `publish: update N post(s) from notion`
     - If only removals: `publish: remove N post(s) from notion`
     - If mixed: `publish: sync N post(s) from notion`
   - Commit body: list each changed file grouped by action, e.g.:
     ```
     Added:
       - content/posts/new-post.md

     Updated:
       - content/posts/existing-post.md

     Removed:
       - content/posts/old-post.md
     ```
   - N is the total number of changed files (added + updated + removed).

7. Stage changes: `git add content/posts/`

8. Commit with the constructed message.

9. Push: `git push origin main`

10. Report what was published (summarize additions, updates, removals) and mention that the push will trigger the GitHub Actions deploy workflow. Link: https://github.com/sesh11/personal-website-v2/actions
