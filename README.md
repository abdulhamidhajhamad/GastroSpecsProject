# GastroSpecsProject

Marketing website built with Next.js App Router and Tailwind CSS.

## Setup

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Create production build:

```bash
pnpm build
pnpm start
```

## Architecture

Homepage content is data-driven and centralized in `lib/home-data.ts`.

- UI sections live in `components/*.tsx`.
- Static content and links live in `lib/home-data.ts`.
- Root metadata and fonts live in `app/layout.tsx`.

This keeps components simple and makes scaling content safer.

## Extending Data

To add more content blocks, update the arrays in `lib/home-data.ts`:

- `mainNavigation`
- `stats`
- `solutions`
- `projects`
- `footerCatalogLinks`
- `footerServicesLinks`
- `footerLegalLinks`

Most section components render directly from these arrays, so you can scale content without rewriting UI logic.

## Notes

- The project uses optimized Next.js images and local assets under `public/assets`.
- The homepage remains statically prerendered for fast performance.
