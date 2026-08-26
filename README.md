# Janani & Melanga — Wedding Invitation

A clean, professional, single-page vertical wedding invitation built with
Next.js. Guests scroll through the invitation — names, event details and a
schedule — with subtle scroll reveal animations throughout, and RSVP via a
popup form.

## Features

- **Vertical, mobile-first invitation card** with names in a cursive script
  font and clean, minimal typography for everything else.
- **Scroll reveal animations** powered by Framer Motion.
- **Add to Calendar** — Google Calendar link and a downloadable `.ics` file
  (works with Apple Calendar / Outlook).
- **RSVP as a popup modal**, reachable from the hero, a floating button, and
  a closing call-to-action — with client + server-side validation (Zod), a
  honeypot field for basic spam protection, and submissions saved straight
  into a Notion database.
- **Content is centralized** in [`src/lib/weddingConfig.ts`](./src/lib/weddingConfig.ts)
  — update names, dates, venue, schedule and copy in one place.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Editing the invitation content

Everything guest-facing — names, wedding date, venue, schedule, closing copy,
RSVP deadline and contact numbers — lives in one file:
[`src/lib/weddingConfig.ts`](./src/lib/weddingConfig.ts). Update the values
there and the whole site (hero, calendar links, event card, schedule, RSVP
copy, footer) stays in sync automatically.

## Connecting the RSVP form to Notion

RSVP submissions are written to a Notion database via the [Notion API](https://developers.notion.com/).

1. **Create an integration** at <https://www.notion.so/my-integrations> and
   copy its "Internal Integration Secret" — this is your `NOTION_API_KEY`.
2. **Create a database** in Notion with these exact columns:

   | Column name    | Type       |
   | -------------- | ---------- |
   | `Name`         | Title      |
   | `Email`        | Email      |
   | `Attending`    | Select (`Yes`, `No`) |
   | `Guests`       | Number     |
   | `Message`      | Text       |
   | `Submitted At` | Date       |

   If you'd rather use different column names, update the mapping in
   [`src/lib/notion.ts`](./src/lib/notion.ts) (`NOTION_PROPERTY`) to match.

3. **Share the database** with your integration: open the database, click
   `···` → `Connections` → add the integration you created.
4. **Copy the database ID** from its URL:
   `https://www.notion.so/<workspace>/<DATABASE_ID>?v=...`
5. Add both values to a `.env.local` file (copy `.env.example` as a
   starting point):

   ```bash
   NOTION_API_KEY=secret_xxx
   NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   When deploying (e.g. on Vercel), add the same two variables in your
   hosting provider's environment variable settings.

If these variables are not set, the RSVP form still renders normally but
shows a friendly "temporarily unavailable" message on submit instead of
failing silently or crashing the app.

## Calendar & venue details

The "Add to Calendar" buttons and event card are generated from
`weddingConfig.event` and `weddingConfig.venue`. Make sure `startIso` /
`endIso` include a UTC offset (e.g. `+05:30`) so the generated calendar
event resolves to the correct time for every guest, regardless of server
timezone.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for scroll animations
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for RSVP validation
- [`@notionhq/client`](https://github.com/makenotion/notion-sdk-js) for the Notion integration

## Deployment

The app deploys as-is to [Vercel](https://vercel.com/) (or any Node
hosting that supports Next.js API routes). Remember to set
`NOTION_API_KEY` and `NOTION_DATABASE_ID` in the hosting provider's
environment variables for RSVP submissions to work in production.
