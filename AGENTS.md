# my-portfolio-v2

Next.js + React + Tailwind CSS v4 portfolio site.

## Development

```bash
pnpm dev      # Start dev server (default: http://localhost:3000)
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Project Structure

- `src/app/layout.tsx` - Root layout with Outfit font (next/font/google) and metadata
- `src/app/page.tsx` - Home page composing all section components
- `src/app/globals.css` - Global CSS with Tailwind CSS v4, design tokens, and all custom styles
- `src/components/sections/` - Section components (navigation, hero, about, experience, projects, skills, quality, contact, footer)
- `src/components/ui/icons.tsx` - Shared UI primitives (Arrow, SectionLabel)
- `src/components/scroll-reveal.tsx` - Client component for IntersectionObserver scroll animations
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS config with `@tailwindcss/postcss` plugin
- `eslint.config.mjs` - ESLint flat config with next/core-web-vitals
- `package.json` - Dependencies and scripts

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Build: TypeScript 5.x
- Linting: ESLint 9 with eslint-config-next

## Styling

Uses **Tailwind CSS v4** via `@tailwindcss/postcss` in `postcss.config.mjs`. `src/app/globals.css` imports Tailwind with `@import 'tailwindcss';` and defines all design tokens as CSS custom properties. The portfolio uses extensive custom CSS rather than Tailwind utility classes.

## Server / Client Components

Most components are Server Components. Only these require `"use client"`:
- `src/components/sections/navigation.tsx` — uses `useState` for mobile menu
- `src/components/scroll-reveal.tsx` — uses `useEffect` and `IntersectionObserver`
