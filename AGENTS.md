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

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->
