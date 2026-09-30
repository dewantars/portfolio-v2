# Tailwind CSS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gradually migrate all custom CSS classes in `src/app/globals.css` to Tailwind CSS v4 utility classes across all components, preserving 100% of the visual styling, responsive design, animations, and functionality.

**Architecture:** Tailwind CSS v4 via `@import 'tailwindcss';` with a `@theme` block defining portfolio tokens (`--color-bg`, `--color-card`, `--color-border`, etc.). Each component's legacy classes will be systematically replaced with Tailwind utility classes in a staged order, followed by pruning unused CSS declarations from `src/app/globals.css`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS v4, PostCSS, ESLint 9.

## Global Constraints

- Preserve the existing UI/UX: identical spacing, typography, colors, borders, shadows, and transitions.
- Zero changes to business logic, component props, state management, or route structure.
- Incremental migration: never delete CSS classes still in use by unmigrated components.
- Avoid unnecessary `!important`; use standard Tailwind utilities where available.
- Validate with `pnpm build` and `pnpm lint` after each major milestone.

---

### Task 1: Setup Theme Tokens, Utility Helpers & Base Styles in Tailwind CSS v4

**Files:**
- Modify: `src/app/globals.css:1-40`
- Create: `src/lib/utils.ts` (helper `cn()` using `clsx` and `tailwind-merge` if added, or native class string concatenation)

**Interfaces:**
- Consumes: Tailwind v4 `@theme` engine.
- Produces: Tailwind color utilities (`bg-bg`, `bg-card`, `bg-secondary`, `text-text`, `text-muted`, `border-border`, `border-border-hover`) and font tokens (`font-outfit`).

- [ ] **Step 1: Install `clsx` and `tailwind-merge`**

Run: `npx -y pnpm add clsx tailwind-merge`
Expected: Packages added to `dependencies` in `package.json`.

- [ ] **Step 2: Create class merger utility `src/lib/utils.ts`**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Define `@theme` tokens in `src/app/globals.css`**

Add the `@theme` block in `src/app/globals.css` right below `@import 'tailwindcss';`:

```css
@import 'tailwindcss';

@theme {
  --color-bg: #050505;
  --color-card: #0a0a0a;
  --color-secondary: #141414;
  --color-text: #fafafa;
  --color-muted: #999999;
  --color-faint: #666666;
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-hover: rgba(255, 255, 255, 0.2);
  --font-outfit: var(--font-outfit), 'Outfit', ui-sans-serif, system-ui, sans-serif;
}
```

- [ ] **Step 4: Verify theme token compilation**

Run: `npx -y pnpm build`
Expected: Build succeeds with code 0.

- [ ] **Step 5: Commit changes**

```bash
git add package.json pnpm-lock.yaml src/lib/utils.ts src/app/globals.css
git commit -m "chore(style): setup Tailwind v4 @theme tokens and cn utility"
```

---

### Task 2: Migrate Site Shell, Root Layout & Navigation Bar

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/navigation.tsx`
- Modify: `src/app/globals.css` (prune migrated `.nav-*` rules)

**Interfaces:**
- Consumes: Tailwind utilities, `useState` in Navigation.
- Produces: Fully Tailwind-styled fixed full-width header with active states, responsive menu drawer, and site shell background.

- [ ] **Step 1: Migrate `src/app/page.tsx` site shell container**

Replace `.site-shell` class with Tailwind utilities:
- `min-h-screen bg-[radial-gradient(circle_at_50%_-15%,rgba(255,255,255,0.07),transparent_25%)] bg-[#050505] text-[#fafafa]`

- [ ] **Step 2: Migrate `src/components/sections/navigation.tsx`**

Replace custom classes:
- `.nav-wrap` -> `fixed top-0 left-0 right-0 w-full z-50 p-0 bg-[#050505]/85 backdrop-blur-[18px] border-b border-white/10`
- `.nav` -> `max-w-[1320px] h-16 mx-auto px-5 md:px-7 lg:px-8 grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center border-none rounded-none bg-transparent shadow-none`
- `.brand` -> `inline-flex w-fit items-center gap-2.5 font-semibold text-sm tracking-tight text-[#fafafa]`
- `.nav-links` -> `hidden lg:flex items-center gap-[26px]`
- `.nav-links a` -> `text-[#999999] text-[13px] hover:text-[#fafafa] transition-colors duration-250`
- `.nav-socials` -> `hidden lg:flex justify-self-end items-center`
- `.nav-cta-btn` -> `inline-flex items-center justify-center h-[38px] px-[18px] bg-[#fafafa] text-[#050505] text-[13px] font-semibold rounded-[10px] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] transition-all duration-250`
- `.menu-toggle` -> `flex lg:hidden w-[38px] h-[38px] flex-col justify-center items-center gap-1.5 border border-white/10 rounded-[10px] bg-transparent text-white cursor-pointer`
- `.mobile-menu` -> `w-full max-w-full m-0 px-5 py-4 md:px-7 md:py-5 flex-col gap-1 border-t border-white/10 rounded-none bg-[#050505]/95 backdrop-blur-[18px]`

- [ ] **Step 3: Remove obsolete `.nav-*` and `.site-shell` styles from `src/app/globals.css`**

- [ ] **Step 4: Verify build and visual check**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 5: Commit changes**

```bash
git add src/app/page.tsx src/components/sections/navigation.tsx src/app/globals.css
git commit -m "refactor(nav): migrate site-shell and navigation bar to Tailwind CSS"
```

---

### Task 3: Migrate Shared UI Primitives (`SectionLabel`, `Arrow`, `Button`) & Footer

**Files:**
- Modify: `src/components/ui/icons.tsx`
- Modify: `src/components/sections/footer.tsx`
- Modify: `src/app/globals.css` (prune migrated `.section-label`, `.button`, `footer` rules)

**Interfaces:**
- Consumes: SVG icons, SectionLabel component, Footer component.
- Produces: Standardized Tailwind styling for section headers, arrows, buttons, and site footer.

- [ ] **Step 1: Migrate `src/components/ui/icons.tsx`**

- `SectionLabel`: `flex items-center gap-3 mb-10 md:mb-14 text-[#999999] text-[11px] font-semibold tracking-[0.16em] uppercase`
- Line inside `SectionLabel`: `w-7 h-[1px] bg-[#777777]`
- `.icon`: `w-4 h-4 fill-none stroke-current stroke-[1.7] stroke-linecap-round stroke-linejoin-round`

- [ ] **Step 2: Migrate `src/components/sections/footer.tsx`**

- `footer`: `max-w-[1320px] mx-auto px-5 py-8 md:px-8 md:pt-8 md:pb-12 flex flex-col md:flex-row justify-between border-t border-white/10 text-[#666666] text-[11px] gap-5`

- [ ] **Step 3: Remove obsolete `footer`, `.section-label`, and `.icon` rules from `src/app/globals.css`**

- [ ] **Step 4: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 5: Commit changes**

```bash
git add src/components/ui/icons.tsx src/components/sections/footer.tsx src/app/globals.css
git commit -m "refactor(ui): migrate SectionLabel, icons, and Footer to Tailwind CSS"
```

---

### Task 4: Migrate Hero Section

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/app/globals.css` (prune migrated `.hero*` rules)

**Interfaces:**
- Consumes: Hero component with personal intro on left, portrait card with glow/grid on right.
- Produces: Tailwind-styled 2-column hero layout with responsive stacking, CTA buttons, and backdrop glow effects.

- [ ] **Step 1: Migrate `src/components/sections/hero.tsx`**

Map classes:
- `.hero`: `min-h-[calc(100vh-88px)] flex items-center pt-24 pb-16 md:pt-28 lg:pt-[120px] lg:pb-20 max-w-[1320px] mx-auto px-5 md:px-7 lg:px-8`
- `.hero-container`: `w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-16`
- `.hero-left`: `w-full lg:flex-[0_1_55%] lg:max-w-[680px] flex flex-col`
- `.hero-name`: `m-0 mb-5 lg:mb-7 text-[clamp(42px,8.5vw,52px)] md:text-[clamp(52px,5.2vw,68px)] lg:text-[clamp(64px,5.8vw,88px)] font-bold leading-[1.02] tracking-[-0.04em] text-[#fafafa]`
- `.hero-summary-wrap`: `flex flex-col gap-3.5 mb-9 lg:mb-10`
- `.hero-summary-primary`: `m-0 text-[#e2e2e2] text-base md:text-[19px] leading-[1.55] font-normal`
- `.hero-summary-secondary`: `m-0 text-[#999999] text-sm md:text-[15px] leading-[1.6]`
- `.cta-row`: `flex flex-col sm:flex-row gap-3 shrink-0`
- Primary button: `h-[50px] px-5 inline-flex items-center justify-center gap-4 border border-[#fafafa] rounded-xl text-sm font-medium text-[#050505] bg-[#fafafa] hover:bg-[#ddd] hover:-translate-y-0.5 transition-all duration-250`
- Secondary button: `h-[50px] px-5 inline-flex items-center justify-center gap-4 border border-white/10 rounded-xl text-sm font-medium text-[#fafafa] bg-[#0c0c0c] hover:border-white/20 hover:bg-[#131313] hover:-translate-y-0.5 transition-all duration-250`
- `.hero-right`: `w-full lg:flex-[0_1_45%] flex justify-center items-center relative`
- `.hero-photo-wrapper`: `relative w-full max-w-[340px] md:max-w-[380px] lg:max-w-[440px] aspect-[4/5] flex items-center justify-center`
- `.photo-backdrop-glow`: `absolute -inset-6 rounded-[44px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[28px] pointer-events-none`
- `.photo-backdrop-grid`: `absolute -inset-3.5 rounded-[38px] border border-white/[0.06] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle_at_50%_50%,black_30%,transparent_80%)] pointer-events-none`
- `.photo-card`: `relative w-full h-full rounded-[28px] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_rgba(255,255,255,0.1)] hover:scale-[1.01] hover:border-white/20 hover:shadow-[0_30px_75px_rgba(0,0,0,0.8),inset_0_1px_rgba(255,255,255,0.16)] transition-all duration-400 group`
- `.hero-photo`: `w-full h-full object-cover object-top block grayscale-[15%] contrast-[105%] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.02] transition-all duration-500`

- [ ] **Step 2: Prune migrated `.hero*`, `.photo-*` CSS from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/hero.tsx src/app/globals.css
git commit -m "refactor(hero): migrate Hero section to Tailwind CSS utilities"
```

---

### Task 5: Migrate About Section

**Files:**
- Modify: `src/components/sections/about.tsx`
- Modify: `src/app/globals.css` (prune `.editorial-grid`, `.about-copy`, `.metadata-grid`, `.meta-card`)

**Interfaces:**
- Consumes: About component with editorial heading, copy, and 4 metadata cards.
- Produces: Tailwind grid layouts with hover lifts and responsive columns.

- [ ] **Step 1: Migrate `src/components/sections/about.tsx`**

Map classes:
- Section container: `max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal`
- `.editorial-grid`: `grid grid-cols-1 lg:grid-cols-[1.65fr_0.65fr] gap-12 lg:gap-[9vw] items-end`
- Heading: `max-w-[850px] m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]`
- `.about-copy`: `max-w-[650px] flex flex-col gap-4 text-[#999999] text-base leading-[1.7]`
- `.metadata-grid`: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-14 lg:mt-[88px]`
- `.meta-card`: `min-h-[145px] lg:min-h-[176px] p-[22px] flex flex-col border border-white/10 rounded-2xl bg-gradient-to-br from-[#0d0d0d] to-[#080808] hover:-translate-y-1 hover:border-white/20 transition-all duration-250 group`
- `.meta-card > span`: `text-[#555555] text-[10px] tracking-[0.12em]`
- `.meta-card p`: `max-w-[170px] mt-auto text-[17px] leading-[1.25] text-[#fafafa]`
- `.meta-dot`: `w-[5px] h-[5px] mt-5 ml-auto rounded-full bg-[#555555] group-hover:bg-[#888888] transition-colors`

- [ ] **Step 2: Prune migrated `.editorial-grid`, `.about-copy`, `.metadata-grid`, `.meta-card` from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/about.tsx src/app/globals.css
git commit -m "refactor(about): migrate About section to Tailwind CSS utilities"
```

---

### Task 6: Migrate Experience Section

**Files:**
- Modify: `src/components/sections/experience.tsx`
- Modify: `src/app/globals.css` (prune `.section-heading-row`, `.timeline*`, `.tag-row`)

**Interfaces:**
- Consumes: Experience timeline items with date, company, role, description, and technology tags.
- Produces: Tailwind grid and flex layout for career timeline.

- [ ] **Step 1: Migrate `src/components/sections/experience.tsx`**

Map classes:
- Section container: `max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal`
- `.section-heading-row`: `flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-[60px] mb-14 lg:mb-[88px]`
- Heading: `m-0 text-[43px] md:text-[clamp(45px,5.6vw,78px)] leading-[1.04] tracking-[-0.05em] font-medium text-[#fafafa]`
- Section intro text: `max-w-[380px] mb-1 text-[#999999] leading-[1.6]`
- `.timeline`: `border-t border-white/10`
- `.timeline-item`: `grid grid-cols-[1fr_auto] lg:grid-cols-[150px_1fr_auto] gap-5 lg:gap-[38px] py-12 border-b border-white/10`
- `.timeline-date`: `text-[#666666] text-xs tracking-[0.1em]`
- `.timeline-index`: `text-[#666666] text-xs tracking-[0.1em] text-right`
- `.organization`: `mb-3 text-[#999999] text-[10px] font-semibold tracking-[0.14em] uppercase`
- Role title `h3`: `mb-4 text-[25px] lg:text-[29px] font-medium tracking-[-0.02em] text-[#fafafa]`
- `.timeline-description`: `max-w-[670px] text-[#999999] leading-[1.65] mb-5`
- `.tag-row`: `flex flex-wrap gap-[7px]`
- Tag pill: `px-2.5 py-[7px] text-[#aaaaaa] text-[10px] border border-white/10 rounded-full bg-[#0b0b0b]`

- [ ] **Step 2: Prune migrated `.timeline*` from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/experience.tsx src/app/globals.css
git commit -m "refactor(experience): migrate Experience section to Tailwind CSS utilities"
```

---

### Task 7: Migrate Projects Section

**Files:**
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/app/globals.css` (prune `.project-grid`, `.project-card`, `.mock-window`, `.project-info`, etc.)

**Interfaces:**
- Consumes: Project items, mock workspace window graphics, and project metadata.
- Produces: Tailwind grid with featured/wide cards, perspective 3D mock window, and conditional links.

- [ ] **Step 1: Migrate `src/components/sections/projects.tsx`**

Map classes:
- Section container: `max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10`
- `.project-grid`: `grid grid-cols-1 lg:grid-cols-2 gap-5`
- `.project-card`: `min-w-0 border border-white/10 rounded-[20px] bg-[#0a0a0a] overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:border-white/20 group`
- Featured card modifier: `lg:col-span-full lg:grid lg:grid-cols-[1.4fr_0.6fr]`
- Wide card modifier: `lg:col-span-full lg:grid lg:grid-cols-[0.8fr_1.2fr]`
- `.project-visual`: `min-h-[340px] lg:min-h-[400px] p-6 lg:p-[50px] flex items-center overflow-hidden relative bg-[#0c0c0d]`
- Theme radial gradients:
  - violet: `bg-[radial-gradient(circle_at_65%_30%,#241c2a,#0a090c_60%)]`
  - sky: `bg-[radial-gradient(circle_at_30%_40%,#14242b,#090b0c_60%)]`
  - emerald: `bg-[radial-gradient(circle_at_30%_70%,#14241e,#090b0a_60%)]`
  - amber: `bg-[radial-gradient(circle_at_70%_40%,#272116,#0c0b08_60%)]`
  - green: `bg-[radial-gradient(circle_at_50%_50%,#11231a,#090b0a_60%)]`
- Mock window: `relative w-full max-w-[660px] mx-auto border border-white/15 rounded-xl bg-[#0b0c0e] shadow-[0_30px_70px_rgba(0,0,0,0.5)] [transform:perspective(900px)_rotateX(2deg)_rotateY(-3deg)] group-hover:[transform:perspective(900px)_rotateX(0)_rotateY(0)_scale(1.02)] transition-transform duration-400 overflow-hidden`
- `.project-info`: `p-6 lg:p-8 flex flex-col justify-between gap-10 lg:gap-14 border-t border-white/10 lg:border-t-0`
- `.project-header`: `flex items-center justify-between gap-3 mb-1.5`
- `.project-role`: `text-[#888888] text-[11px] font-medium tracking-[0.03em] px-2 py-[3px] rounded-md bg-white/[0.05] border border-white/[0.08]`
- `.project-links a`: `flex items-center gap-1.5 text-[#bbbbbb] text-xs hover:text-white transition-colors duration-200`
- `.project-confidential`: `inline-flex items-center gap-1.5 text-[#666666] text-[11px] tracking-[0.03em]`

- [ ] **Step 2: Prune migrated `.project-*` and `.mock-*` rules from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/projects.tsx src/app/globals.css
git commit -m "refactor(projects): migrate Projects section to Tailwind CSS utilities"
```

---

### Task 8: Migrate Skills Section

**Files:**
- Modify: `src/components/sections/skills.tsx`
- Modify: `src/app/globals.css` (prune `.skill-list`, `.skill-row`, `.skill-title`, `.skill-pills`, `.skill-pill`)

**Interfaces:**
- Consumes: Category skill rows (Frontend, Backend, Quality Assurance, Design, Other Tools).
- Produces: Tailwind grid and pill rows.

- [ ] **Step 1: Migrate `src/components/sections/skills.tsx`**

Map classes:
- Section container: `max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal`
- `.skill-list`: `border-t border-white/10`
- `.skill-row`: `min-h-[130px] py-7 lg:py-0 grid grid-cols-1 lg:grid-cols-[270px_1fr] items-center gap-6 lg:gap-0 border-b border-white/10`
- `.skill-title`: `flex items-center gap-7 text-[17px] text-[#fafafa]`
- `.skill-title span`: `text-[#555555] text-[10px]`
- `.skill-pills`: `flex flex-wrap gap-2.5`
- `.skill-pill`: `px-3.5 py-2 inline-flex items-center border border-white/10 rounded-[11px] text-[#bbbbbb] text-xs bg-[#0a0a0a] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_28px_rgba(255,255,255,0.05)] transition-all duration-250`

- [ ] **Step 2: Prune migrated `.skill-*` rules from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/skills.tsx src/app/globals.css
git commit -m "refactor(skills): migrate Skills section to Tailwind CSS utilities"
```

---

### Task 9: Migrate Achievements Section

**Files:**
- Modify: `src/components/sections/achievements.tsx`
- Modify: `src/app/globals.css` (prune `.achievements*`)

**Interfaces:**
- Consumes: Interactive tabbed achievements with left vertical track indicator and dynamic right image frame.
- Produces: Tailwind layout matching vertical track line and A4 image preview.

- [ ] **Step 1: Migrate `src/components/sections/achievements.tsx`**

Map classes:
- Section container: `max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal relative`
- `.achievements-layout`: `grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-[60px] items-start`
- `.achievements-list`: `relative flex flex-col gap-5 pl-5 before:content-[''] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.12] before:rounded-sm`
- `.achievement-item`: `relative w-full flex items-start bg-transparent border-0 p-0 text-left cursor-pointer outline-none group`
- `.achievement-indicator`: `absolute -left-5 top-0 bottom-0 w-1 rounded transition-all duration-300`
- Active indicator state: `bg-white shadow-[0_0_14px_rgba(255,255,255,0.7)]`
- `.achievement-card-content`: `w-full p-4 md:p-[18px_22px] rounded-xl border transition-all duration-300`
- Active card content state: `border-white/20 bg-[#121212]/75 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`
- Inactive card content state: `border-transparent hover:bg-white/[0.02]`
- Title: `text-lg font-medium leading-[1.35] transition-colors duration-250`
- Active title: `text-white font-semibold`
- Inactive title: `text-[#777777] group-hover:text-[#bbbbbb]`
- Date: `text-[11px] font-medium tracking-[0.04em]`
- Active date: `text-[#888888]`; Inactive date: `text-[#555555]`
- Description: `text-sm leading-[1.55] mt-1.5`
- Active description: `text-[#b0b0b0]`; Inactive description: `text-[#555555] group-hover:text-[#777777]`
- `.achievement-preview`: `flex justify-center lg:sticky lg:top-[100px]`
- `.achievement-card-frame`: `w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#080808] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.75),inset_0_1px_rgba(255,255,255,0.08)] flex flex-col gap-4 hover:border-white/20 transition-colors duration-300`
- Image wrap: `w-full relative rounded-2xl border border-white/[0.08] bg-[#030303] overflow-hidden flex items-center justify-center animate-[fadeInScale_0.4s_cubic-bezier(0.16,1,0.3,1)]`
- Image: `w-full h-auto max-h-[480px] object-cover block rounded-[14px] hover:scale-[1.02] transition-transform duration-400`

- [ ] **Step 2: Prune migrated `.achievements*` rules from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/achievements.tsx src/app/globals.css
git commit -m "refactor(achievements): migrate Achievements section to Tailwind CSS utilities"
```

---

### Task 8: Migrate Contact Section

**Files:**
- Modify: `src/components/sections/contact.tsx`
- Modify: `src/app/globals.css` (prune `.contact*`, `.social-btn*`)

**Interfaces:**
- Consumes: Contact section with orb backdrop, large heading, and social icon buttons.
- Produces: Tailwind layout with custom orb background and white social buttons.

- [ ] **Step 1: Migrate `src/components/sections/contact.tsx`**

Map classes:
- Section container: `relative min-h-[680px] lg:min-h-[730px] flex flex-col items-center justify-center text-center overflow-hidden max-w-[1320px] mx-auto px-5 py-[88px] md:px-7 md:py-[110px] lg:px-8 lg:py-[144px] border-t border-white/10 reveal`
- `.contact-orb`: `absolute w-[680px] h-[680px] border border-white/[0.05] rounded-full shadow-[0_0_110px_rgba(127,146,169,0.08),inset_0_0_100px_rgba(255,255,255,0.02)] pointer-events-none`
- Heading `h2`: `relative m-0 text-[50px] md:text-[clamp(54px,7.2vw,98px)] font-medium leading-none tracking-[-0.06em] text-[#fafafa]`
- Heading span: `text-[#6f6f6f]`
- Description `p`: `relative max-w-[600px] my-9 text-[#999999] leading-[1.6]`
- `.contact-actions`: `relative flex items-center justify-center gap-3 md:gap-4 flex-wrap mb-[34px]`
- `.social-btn`: `w-[54px] h-[54px] inline-flex items-center justify-center border border-white/10 rounded-[14px] bg-[#0d0d0d] text-white hover:-translate-y-1 hover:border-white/30 hover:bg-[#181818] hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-250`
- `.social-btn-cv`: `w-auto px-5 gap-2 text-sm font-semibold tracking-[0.04em]`

- [ ] **Step 2: Prune migrated `.contact*` and `.social-btn*` rules from `src/app/globals.css`**

- [ ] **Step 3: Verify build**

Run: `npx -y pnpm build`
Expected: Build passes with 0 errors.

- [ ] **Step 4: Commit changes**

```bash
git add src/components/sections/contact.tsx src/app/globals.css
git commit -m "refactor(contact): migrate Contact section to Tailwind CSS utilities"
```

---

### Task 9: Final CSS Cleanup & Production Verification

**Files:**
- Modify: `src/app/globals.css`
- Verify: all components & pages

**Interfaces:**
- Consumes: Cleaned `globals.css` containing only Tailwind v4 imports, `@theme`, global reset, and scrollbar hiding rules.
- Produces: Zero dead CSS code and 100% verified production build.

- [ ] **Step 1: Retain only necessary global primitives in `src/app/globals.css`**

In `src/app/globals.css`:
- `@import 'tailwindcss';`
- `@theme` definition
- Universal box-sizing reset
- Global scrollbar suppression
- Keyframes (`@keyframes fadeInScale`)
- `.reveal` transition helper class used by `IntersectionObserver` in `scroll-reveal.tsx`
- Remove all remaining obsolete component classes.

- [ ] **Step 2: Run linter**

Run: `npx -y pnpm lint`
Expected: No ESLint errors.

- [ ] **Step 3: Run production build**

Run: `npx -y pnpm build`
Expected: Production build passes with 0 errors and 0 warnings.

- [ ] **Step 4: Commit cleanup**

```bash
git add src/app/globals.css
git commit -m "chore(style): finalize Tailwind CSS v4 migration and prune legacy CSS"
```
