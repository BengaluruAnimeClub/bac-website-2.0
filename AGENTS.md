# AGENTS.md — BAC Website 2.0 — Agent Context Guide

> This file is maintained for AI agents (Antigravity, Copilot, etc.) working in this repo.
> Keep it up-to-date as the codebase evolves.

---

## Project Overview

**BAC Website** is the official site of the Bengaluru Anime Club.
- **Live URL:** https://bac.moe
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Package manager:** `pnpm` (v9.12.3) — always use `pnpm`, never `npm` or `yarn`
- **Hosting:** Vercel (auto-deploys on push to `main`)
- **Content:** Split between local MDX files (Velite) and remote Contentful CMS

---

## Quick Start (Local Dev)

```bash
# 1. Install dependencies (run once after cloning)
pnpm install

# 2. Start dev server  →  http://localhost:3000
pnpm dev

# 3. Production build check (optional — slow, talks to Contentful)
pnpm build
```

> **Note:** `pnpm dev` is what you'll use day-to-day. The Velite build (MDX processing)
> runs automatically inside `next dev` via a webpack plugin defined in `next.config.mjs`.

---

## Environment Variables

Located in **`.env.local`** (gitignored). The file is pre-created from the team's shared env.
Never commit this file. Key variables:

| Variable | Purpose |
|---|---|
| `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` | CMS read access (blog, events, contributors) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth for NextAuth |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth for NextAuth |
| `NEXTAUTH_SECRET` | NextAuth JWT signing key |
| `NEXTAUTH_URL` | Set to `http://localhost:3000` locally (production: `https://bac.moe`) |
| `NEXT_PUBLIC_APP_URL` | Public base URL (same as above) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Redis (used for comment rate-limiting / caching) |

For **local dev**, `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` are overridden to `http://localhost:3000`
in `.env.local`. The production values (`https://bac.moe`) are set in Vercel's environment.

---

## Repository Structure

```
bac-website-2.0/
├── app/                        # Next.js App Router pages (each folder = a route)
│   ├── page.tsx                # Homepage  →  /
│   ├── layout.tsx              # Root layout (providers, fonts, header/footer)
│   ├── blog/[...slug]/         # Blog post detail  →  /blog/<slug>
│   ├── blog/page.tsx           # Blog listing  →  /blog
│   ├── upcoming-events/        # Upcoming events  →  /upcoming-events
│   ├── past-events/            # Past events (Contentful)  →  /past-events
│   ├── contributors/           # Contributor profiles (Contentful)  →  /contributors
│   ├── gallery/                # Gallery  →  /gallery
│   ├── art/                    # Art page  →  /art
│   ├── search/                 # Search  →  /search
│   ├── tags/                   # Tag pages  →  /tags
│   ├── socials/                # Socials  →  /socials
│   ├── about/                  # About  →  /about
│   ├── contact-us/             # Contact  →  /contact-us
│   ├── game/                   # Interactive text game  →  /game
│   ├── [redirectSlug]/         # Catch-all redirect handler
│   ├── api/auth/[...nextauth]/ # NextAuth route handler
│   ├── api/comments/           # Comment API (Upstash Redis)
│   ├── api/revalidate/         # ISR cache revalidation webhook (Contentful)
│   └── api/og/                 # Open Graph image generation
│
├── components/                 # Shared React components
│   ├── ui/                     # Primitive UI components (shadcn/ui style)
│   │   ├── button.tsx, card.tsx, badge.tsx, avatar.tsx …
│   │   ├── affiliatedcard.tsx  # Card for affiliated orgs
│   │   ├── artcard.tsx         # Card for art entries
│   │   └── profilecard.tsx     # Contributor profile card
│   ├── site-header.tsx         # Top navigation bar
│   ├── site-footer.tsx         # Footer
│   ├── main-nav.tsx            # Desktop nav links
│   ├── mobile-nav.tsx          # Mobile hamburger nav
│   ├── comment-section.tsx     # Comment UI (uses Redis API)
│   ├── login-modal.tsx         # Auth modal (Google + GitHub OAuth)
│   ├── post-item.tsx           # Blog/event list item card
│   ├── tag.tsx                 # Tag badge chip
│   ├── blog-navigation.tsx     # Prev/Next post navigation
│   ├── share-buttons.tsx       # Social share buttons
│   ├── mode-toggle.tsx         # Dark/light theme switcher
│   └── providers.tsx           # Client-side providers wrapper
│
├── lib/
│   ├── contentful-api.ts       # ALL Contentful data fetching (see below)
│   ├── redirects.ts            # Short-link / redirect map
│   └── utils.ts                # Shared utilities (cn, etc.)
│
├── content/                    # Local MDX content (processed by Velite)
│   ├── blog/                   # Blog posts  →  .mdx files
│   ├── upcoming-events/        # Upcoming event announcements  →  .mdx files
│   └── past-events/            # Past event write-ups  →  .mdx files (legacy)
│
├── config/
│   └── site.ts                 # Global site metadata (name, URL, social links)
│
├── context/
│   └── ui-context.tsx          # React context for UI state
│
├── styles/
│   └── mdx.css                 # Styles for MDX-rendered content
│
├── public/
│   ├── images/                 # Static images (logos, pfps, blog covers, gallery…)
│   └── music/game/             # Audio assets for the text game
│
├── assets/fonts/               # Local font files (Inter-Bold.ttf for OG images)
│
├── docs/
│   └── CONTENTFUL_API_CONSOLIDATION.md  # Docs on the unified API layer
│
├── .github/workflows/
│   └── vercel-daily-deploy.yml # Scheduled daily redeploy (keeps ISR content fresh)
│
├── velite.config.ts            # Velite schema for MDX collections (blog, events)
├── next.config.mjs             # Next.js config + Velite webpack plugin
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── components.json             # shadcn/ui config
├── next-sitemap.config.js      # Sitemap generation config
└── .env.local                  # Local env vars (gitignored — DO NOT COMMIT)
```

---

## Content Architecture

The site pulls content from **two sources** — make sure you're editing the right one:

### 1. Local MDX (Velite)
Used for: **blog posts**, **upcoming-events**, **past-events** (legacy)

- Files live in `content/blog/`, `content/upcoming-events/`, `content/past-events/`
- Schema defined in `velite.config.ts`
- Velite processes them into `.velite/` at build/dev time
- **To add a blog post:** create a `.mdx` file in `content/blog/` with this frontmatter:
  ```mdx
  ---
  title: "My Post Title"
  description: "Short description"
  date: 2026-11-17
  published: true
  tags: ["anime", "event"]
  image: "/images/blog/my-image.jpg"   # optional
  ---
  
  Content goes here...
  ```

### 2. Contentful CMS
Used for: **past-events** (primary), **contributors/authors**, **announcements**, **event reports**, **spotlight entries**

- All Contentful fetching is centralized in `lib/contentful-api.ts`
- Content types: `blogPost`, `announcementPost`, `eventReportPost`, `spotlightEntry`, `author`
- Uses Next.js `unstable_cache` for ISR — revalidation triggered via `/api/revalidate` webhook
- For local dev, the Contentful credentials in `.env.local` grant read-only access to production content

---

## Key Patterns

### Adding a New Page
1. Create `app/<route-name>/page.tsx`
2. Export a default async component (Server Component by default)
3. For client interactivity, add `"use client"` or extract a `*Client.tsx` component

### Adding a New Component
- Generic/reusable UI → `components/ui/`
- Page-specific or feature components → `components/`
- Always use the `cn()` utility from `lib/utils.ts` for conditional Tailwind classes

### Styling
- **Tailwind CSS** for all styling — config in `tailwind.config.ts`
- Dark mode via `next-themes` (class strategy) — use `dark:` variants freely
- Typography styles for MDX content in `styles/mdx.css`

### Authentication (NextAuth)
- Providers: Google OAuth + GitHub OAuth
- Session available via `useSession()` (client) or `getServerSession()` (server)
- Used mainly for the comment section

### Contentful API Usage
Always import from `lib/contentful-api.ts`, never create raw Contentful clients elsewhere:
```ts
import { fetchBlogPosts, getBlogPostWithNavigation } from "@/lib/contentful-api";
```
Prefer the `*Optimized` variants for listing pages (use shared cache, fewer API calls).

---

## Common Commands

```bash
pnpm dev          # Start local dev server  →  http://localhost:3000
pnpm build        # Production build (also runs next-sitemap via postbuild)
pnpm start        # Serve production build locally
pnpm lint         # Run ESLint
```

---

## Deployment

- **Hosting:** Vercel
- **Auto-deploy:** Every push to `main` triggers a Vercel deployment
- **Preview deployments:** Every PR gets a Vercel preview URL
- **Daily redeploy:** `.github/workflows/vercel-daily-deploy.yml` triggers a daily rebuild to pick up new Contentful content (ISR cache refresh)
- **ISR revalidation:** Contentful webhook → `/api/revalidate` → clears Next.js cache tags

---

## Requested Features (from README)

1. **Search** — search bar in nav, queries page/blog titles
2. **Events Calendar** — `/calendar` page with upcoming BAC events (calendar or timeline view)
3. **Editorial Section** — split `/blog` into subcategories (spotlights, long-form, event reports, etc.)

Contact _Aravind_ (`[BAC] Tech` WhatsApp group) for clarifications before starting a new feature.

---

## Notes for Agents

- **Always use `pnpm`** — the repo uses `pnpm-lock.yaml`, not `package-lock.json`
- **`.velite/` is auto-generated** — do not edit it manually; it's gitignored
- **Images** go in `public/images/<category>/` — served at `/images/<category>/filename`
- **`NEXTAUTH_URL` must be `http://localhost:3000`** in `.env.local` for local OAuth to work
- **Contentful content** is live/production data — changes in CMS reflect after cache revalidation or rebuild
- **`content/`** MDX changes are hot-reloaded by Velite in `pnpm dev` automatically
- The `[redirectSlug]` route in `app/` handles short-link redirects — the redirect map is in `lib/redirects.ts`
