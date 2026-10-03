# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # eslint, fails on any warning (--max-warnings 0)
npm run build    # production build; also type-checks
```

There is no test suite. Validate changes with `npm run lint` and `npm run build`.
Running `tsc --noEmit` on its own needs `npx next typegen` first, because global route
types such as `LayoutProps<"/">` (used in `src/app/layout.tsx`) are generated and
`next-env.d.ts` is gitignored.

Node 24.x is pinned in `package.json` `engines`. The stack is Next.js 16 (App Router),
React 19, Tailwind CSS v4, Framer Motion, React Hook Form with Zod 4, and the Notion SDK.
Per `AGENTS.md`, check `node_modules/next/dist/docs/` before relying on remembered
Next.js APIs.

## Architecture

The site is a single-page, mobile-first wedding invitation. `src/app/page.tsx` stacks the
sections (`Hero` → `EventDetails` → `ScheduleTimeline` → `ClosingCta` → `Footer`) inside
`RsvpModalProvider`, with two fixed overlays drawn outside `<main>`: `PixelCoupleScroll`
and `RsvpModal`.

### Content lives in one file

All guest-facing content is in `src/lib/weddingConfig.ts`: names, date and time, venue,
schedule, copy, RSVP deadline and contacts. Components, page metadata
(`src/app/layout.tsx`), the OG image (`src/app/opengraph-image.tsx`) and calendar links
(`src/lib/calendar.ts`) all read from it, so don't hard-code content in components.
`event.startIso` and `event.endIso` must include a UTC offset (for example `+05:30`) so
the Google Calendar and `.ics` output resolve to the correct instant.

### RSVP flow

- `RsvpModalContext` holds the modal's open state. Any `RsvpTriggerButton` (hero,
  floating button, closing CTA) opens the single `RsvpModal`, which renders `RsvpForm`.
- `src/lib/rsvpSchema.ts` is the one Zod schema. The client (react-hook-form via
  `@hookform/resolvers`) and the server (`src/app/api/rsvp/route.ts`) both validate
  with it.
- `company` is a honeypot field. When it is filled in, the route returns success without
  writing anything.
- `src/lib/notion.ts` writes each RSVP as a page in a Notion database. `NOTION_PROPERTY`
  is the single mapping from form fields to Notion column names. When `NOTION_API_KEY` or
  `NOTION_DATABASE_ID` is unset it throws `NotionNotConfiguredError`, which the route
  turns into a 503 "temporarily unavailable" message instead of a crash.

### Environment

See `.env.example`. `NEXT_PUBLIC_SITE_URL` is optional. `src/lib/siteUrl.ts` falls back
to `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then localhost, and the result
becomes `metadataBase`. WhatsApp previews need absolute https OG image URLs. The site is
deployed on Vercel and includes `@vercel/analytics`.

### Animation

- `src/lib/motion.ts` is the shared animation vocabulary: easing, springs, viewport
  config, and reveal, stagger, mask and line variants. Reuse it rather than defining
  one-off curves or durations. `Reveal` wraps scroll-triggered reveals.
- Components respect `useReducedMotion`. Keep that behaviour in new animations.

### Pixel couple (`src/components/pixel-couple/`)

A bride and groom in Kandyan dress walk in from the screen edges as the page scrolls.
They meet, hold hands and show floating hearts at the bottom of the page.

- `sprites.ts` stores sprites as string grids, `SPRITE_WIDTH` × `SPRITE_HEIGHT`
  (60×80). Each character is a key into `palette.ts`, and `.` is transparent. `grid()`
  throws at module load if any row or column count is wrong.
- `walkB` and `hold` frames are built from `walkA` by swapping row bands with
  `withRows` at `FEET_ROW`, `SMILE_ROW` and `ARM_ROW`. Editing `walkA` therefore changes
  every frame.
- `PixelSprite.tsx` run-length-encodes each row into SVG `<rect>`s.
- `PixelCoupleScroll.tsx` maps `scrollYProgress` to a `--walk` CSS variable that drives
  `translateX`. The walk frame alternates per step (`STEPS_PER_JOURNEY`). The hold pose
  and hearts appear past `HOLD_THRESHOLD`. `HOLD_OVERLAP` sets how far the two sprites
  overlap when they meet.

### Styling

Tailwind v4 is configured in CSS with no `tailwind.config`. Design tokens (`ivory`,
`cream`, `charcoal`, `taupe`, `sage`, `gold`, and so on) are CSS variables in
`src/app/globals.css`, exposed through `@theme inline`. The fonts are Great Vibes
(`font-cursive`, used for names), Playfair Display (`font-display`) and Jost
(`font-sans`), loaded with `next/font` in `layout.tsx`. The `@/*` import alias maps to
`src/*`.
