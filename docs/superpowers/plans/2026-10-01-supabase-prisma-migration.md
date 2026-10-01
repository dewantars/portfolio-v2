# Supabase + Prisma Data Layer Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio's hardcoded data arrays to Supabase PostgreSQL via Prisma ORM, keeping the existing UI/UX 100% identical.

**Architecture:** Next.js Server Components fetch data via Prisma from Supabase PostgreSQL. Client components (Achievements, Navigation) receive data as props from their parent Server Components. No API routes needed — all reads happen server-side. Images remain in `/public` (local assets) or at existing external URLs (Unsplash) — no Supabase Storage migration for this phase.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.7, Prisma 6.x, Supabase PostgreSQL, Tailwind CSS v4.

## Global Constraints

- Zero UI/UX changes — identical spacing, typography, colors, animations, responsive behavior.
- Zero business logic changes — no new routes, no admin panel, no auth.
- Database access is server-side only via Prisma — never import Prisma in `"use client"` components.
- Never expose `DATABASE_URL` or `DIRECT_URL` to client-side code.
- `.env.local` is already in `.gitignore` (via `.env*` glob).
- Existing `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are already set in `.env.local`.
- `DATABASE_URL` and `DIRECT_URL` must be added to `.env.local` from the Supabase dashboard before running migrations.

## Audit Summary

### Hardcoded Data Locations

| Component | File | Data Shape |
|---|---|---|
| Hero | `src/components/sections/hero.tsx` | Inline strings: name, summary, headline, photoUrl (`/assets/profile.jpg`) |
| About | `src/components/sections/about.tsx` | Inline strings: heading, 2 copy paragraphs, 4 role labels array |
| Experience | `src/components/sections/experience.tsx` | 2 hardcoded `<article>` blocks with inline year, org, role, description, tags array |
| Projects | `src/components/sections/projects.tsx:16-88` | `const projects: Project[]` — 6 items with number, name, role, description, stack[], type, theme, github?, liveUrl? |
| Skills | `src/components/sections/skills.tsx:3-18` | `const skillGroups` — 5 groups each with title + skills[] |
| Achievements | `src/components/sections/achievements.tsx:16-51` | `const achievementsData: Achievement[]` — 5 items with id, title, date, description, image (Unsplash URLs). **Client component** (`"use client"`) |
| Contact | `src/components/sections/contact.tsx` | 5 inline social links: email, CV, Instagram, LinkedIn, GitHub |
| Footer | `src/components/sections/footer.tsx` | Inline: copyright + name |

---

### Task 1: Install Prisma, Configure Database Connection, and Create Schema

**Files:**
- Modify: `package.json`
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`

**Interfaces:**
- Consumes: Supabase PostgreSQL connection from `.env.local`
- Produces: Prisma CLI, `@prisma/client`, singleton at `src/lib/prisma.ts`, all models

- [ ] **Step 1: Verify DATABASE_URL exists** — If missing, stop and ask the user.
- [ ] **Step 2: Install dependencies** — `pnpm add prisma @prisma/client server-only`
- [ ] **Step 3: Initialize Prisma** — `npx prisma init --datasource-provider postgresql`
- [ ] **Step 4: Write schema** (Profile, Experience, Project, SkillGroup, Achievement, SocialLink)
- [ ] **Step 5: Create Prisma Client singleton** at `src/lib/prisma.ts`
- [ ] **Step 6: Generate Client** — `npx prisma generate`
- [ ] **Step 7: Run migration** — `npx prisma migrate dev --name init`
- [ ] **Step 8: Commit**

---

### Task 2: Create Seed Script with All Existing Portfolio Data

**Files:**
- Create: `prisma/seed.ts`
- Modify: `package.json` (prisma.seed config)

**Interfaces:**
- Consumes: Prisma Client, all models
- Produces: Populated database with all existing portfolio content

- [ ] **Step 1: Install tsx** — `pnpm add -D tsx`
- [ ] **Step 2: Add prisma seed config** to `package.json`
- [ ] **Step 3: Create seed script** with all existing data
- [ ] **Step 4: Run seed** — `npx prisma db seed`
- [ ] **Step 5: Verify** via Prisma Studio
- [ ] **Step 6: Commit**

---

### Task 3: Create Server-Only Data Access Layer

**Files:**
- Create: `src/lib/data/profile.ts`
- Create: `src/lib/data/experiences.ts`
- Create: `src/lib/data/projects.ts`
- Create: `src/lib/data/skills.ts`
- Create: `src/lib/data/achievements.ts`
- Create: `src/lib/data/social-links.ts`

**Interfaces:**
- Consumes: Prisma Client
- Produces: `getProfile()`, `getExperiences()`, `getProjects()`, `getSkillGroups()`, `getAchievements()`, `getSocialLinks()`

- [ ] **Step 1-6: Create each data function** with `import "server-only"` and error handling
- [ ] **Step 7: Commit**

---

### Task 4: Migrate Hero, About, Footer to Database

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/components/sections/about.tsx`
- Modify: `src/components/sections/footer.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1-3: Add profile prop** to Hero, About, Footer
- [ ] **Step 4: Update page.tsx** — fetch profile, pass as props, make Home async
- [ ] **Step 5: Verify** — `pnpm dev`
- [ ] **Step 6: Commit**

---

### Task 5: Migrate Experience Section

- [ ] **Step 1: Update experience.tsx** — accept `experiences` prop
- [ ] **Step 2: Update page.tsx** — fetch & pass experiences
- [ ] **Step 3: Verify & Commit**

---

### Task 6: Migrate Projects Section

- [ ] **Step 1: Update projects.tsx** — accept `projects` prop, remove hardcoded array
- [ ] **Step 2: Update page.tsx** — fetch & pass projects
- [ ] **Step 3: Verify & Commit**

---

### Task 7: Migrate Skills Section

- [ ] **Step 1: Update skills.tsx** — accept `skillGroups` prop
- [ ] **Step 2: Update page.tsx** — fetch & pass skill groups
- [ ] **Step 3: Verify & Commit**

---

### Task 8: Migrate Achievements Section (Client Component)

- [ ] **Step 1: Update achievements.tsx** — accept `achievements` prop, remove hardcoded array, keep `"use client"`
- [ ] **Step 2: Update page.tsx** — fetch & pass achievements
- [ ] **Step 3: Verify interactive behavior & Commit**

---

### Task 9: Migrate Contact Section

- [ ] **Step 1: Update contact.tsx** — accept `socialLinks` and `profile` props, use icon map
- [ ] **Step 2: Update page.tsx** — fetch & pass social links
- [ ] **Step 3: Verify & Commit**

---

### Task 10: Final Verification and Production Build

- [ ] **Step 1: Run linter** — `pnpm lint`
- [ ] **Step 2: Run production build** — `pnpm build`
- [ ] **Step 3: Visual verification** of all sections
- [ ] **Step 4: Final commit**
