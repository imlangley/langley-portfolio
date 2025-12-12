# Langley Portfolio

Portfolio website built with Next.js, Tailwind CSS, and Sanity CMS.

## Branch Strategy

This repository uses two main branches:

- **`main`** - The production branch that contains stable code
- **`rebuild/ae-vscode`** - The development/rebuild branch where new features and updates are made

### Automatic Sync

Changes pushed to the `rebuild/ae-vscode` branch are automatically merged into the `main` branch via GitHub Actions. The workflow:

1. Triggers on every push to `rebuild/ae-vscode`
2. Automatically merges changes into `main`
3. Can also be manually triggered via workflow dispatch

This ensures that all updates from the rebuild branch are consistently synchronized to the main branch.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Sanity CMS
- TypeScript
- Framer Motion
- Lenis Smooth Scroll
