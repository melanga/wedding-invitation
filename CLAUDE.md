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
types such as `LayoutProps<"/">` and `PageProps<"/">` (used in `src/app/`) are generated
and `next-env.d.ts` is gitignored.

Node 24.x is pinned in `package.json` `engines`. The stack is Next.js 16 (App Router),
React 19, Tailwind CSS v4, Framer Motion, React Hook Form with Zod 4, and the Notion SDK.
Per `AGENTS.md`, check `node_modules/next/dist/docs/` before relying on remembered
Next.js APIs.

## Architecture

The site is a single-page, mobile-first wedding invitation. `src/app/page.tsx` stacks the
sections (`Hero` → `EventDetails` → `ScheduleTimeline` → `ClosingCta` → `Footer`) inside
`RsvpModalProvider`, with two fixed overlays drawn outside `<main>`: `PixelCoupleScroll`
and `RsvpModal`.

### Invite links

`src/lib/inviteLink.ts` turns the query string into `{ locale, maxGuests }`: `?lang=si`
selects Sinhala (anything else is English) and `?guests=N` lets the guest RSVP for up to
`N` people (capped at `MAX_GUESTS`, otherwise 1). `page.tsx` and its `generateMetadata`
both read it, so `/` renders per request rather than statically. The root layout can't
read search params, so `<html lang>` stays `en` and a wrapper `<div lang={locale}>` in
`page.tsx` carries the page language.

### Content and languages

Every string guests read lives in `src/lib/content/en.ts` and `src/lib/content/si.ts`,
both typed by `InvitationContent` (`src/lib/content/types.ts`). A new string goes into the
type and both files; TypeScript catches a missing translation. Facts shared by both
languages (the Latin-script names used by the cursive headings, hashtag, ISO times, map
URL) stay in `src/lib/weddingConfig.ts`. Don't hard-code text in components.

- `page.tsx` calls `getContent(locale)` and passes the result as a `content` prop to
  each section, client components included. Keep content plain serializable data, not
  functions. The only runtime placeholder is `{count}` in `guestCountLimit`, which
  `RsvpForm` fills in. Client code (including `src/lib/calendar.ts`) only imports
  content types, so the browser gets one language through props instead of bundling
  both files.
- Sinhala yansaya, rakaransaya and repaya forms (e.g. the `්‍ය` in `මංගල්‍යය`) depend
  on an invisible zero-width joiner (U+200D). Keep it when editing `si.ts`.
- The OG image always uses English content. `calendar.eventLocation` is English in every
  language so map apps can geocode it. Calendar titles and notes follow the guest's
  language.
- `event.startIso` and `event.endIso` must include a UTC offset (for example `+05:30`) so
  the Google Calendar and `.ics` output resolve to the correct instant.

### RSVP flow

- `RsvpModalContext` holds the modal's open state. Any `RsvpTriggerButton` (hero,
  floating button, closing CTA) opens the single `RsvpModal`, which renders `RsvpForm`.
- `createRsvpSchema(messages, maxGuests)` in `src/lib/rsvpSchema.ts` builds the one Zod
  schema. `RsvpForm` (react-hook-form via `@hookform/resolvers`) builds it with the
  guest's language and link allowance. `src/app/api/rsvp/route.ts` builds it with English
  messages and `MAX_GUESTS`. The API's error text is never shown: `RsvpForm` maps a 503
  to `unavailableError` and any other failure to `genericError`.
- Without a guest allowance the guest-count input is rendered disabled and left
  unregistered, so react-hook-form still submits its default of `1`. RHF's own `disabled`
  option would drop the field from the submitted values.
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
(`font-sans`), loaded with `next/font` in `layout.tsx`. Noto Serif Sinhala and Noto Sans
Sinhala are appended to the display and sans stacks, so Latin glyphs keep the original
fonts and only Sinhala characters fall through. They aren't preloaded, so English pages
never download them. The `sinhala:` variant (`:lang(si)`) adjusts Sinhala text, e.g.
`sinhala:tracking-normal` on wide-tracked eyebrows. The `@/*` import alias maps to
`src/*`.
