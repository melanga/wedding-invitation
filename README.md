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
- **English and Sinhala** — the invitation is in English unless the link
  you share asks for Sinhala (`?lang=si`).
- **Per-guest seat allowance** — the RSVP guest count is locked to 1 unless
  the link allows more (`?guests=2`).
- **Content is centralized** in [`src/lib/content/`](./src/lib/content/) —
  one file per language for every word guests read.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Editing the invitation content

Everything guests read — wedding date, venue, schedule, closing copy, RSVP
deadline, form labels and messages — lives in one file per language:
[`src/lib/content/en.ts`](./src/lib/content/en.ts) and
[`src/lib/content/si.ts`](./src/lib/content/si.ts). Both follow the same
shape, so TypeScript flags any string a translation is missing. Change a
detail in both files to keep the two versions in step.

Facts shared by both languages — the couple's names as shown in the cursive
headings, the hashtag, the exact event times and the map link — live in
[`src/lib/weddingConfig.ts`](./src/lib/weddingConfig.ts). The whole site
(hero, calendar links, event card, schedule, RSVP form, footer) reads from
these files.

## Sharing invitation links

Each guest's link can set two query parameters:

| Parameter  | Effect                                                           |
| ---------- | ---------------------------------------------------------------- |
| `lang=si`  | Shows the invitation (and its link preview) in Sinhala. Any other value, or none, shows English. |
| `guests=N` | Lets the guest RSVP for up to `N` people, themselves included (capped at 10). Without it, the guest count is locked to 1. |

For example:

- `https://<your-site>/` — English, one seat
- `https://<your-site>/?guests=2` — English, up to two guests
- `https://<your-site>/?lang=si&guests=3` — Sinhala, up to three guests

The allowance only shapes the form: anyone can edit the link, so check the
`Guests` column in Notion if a count looks off.

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

The "Add to Calendar" buttons take their times from `weddingConfig.event`
and their title and notes from the guest's language. The location is
always the English venue name and address, so calendar apps can find it on
a map. Make sure `startIso` / `endIso` include a UTC offset (e.g. `+05:30`)
so the generated calendar event resolves to the correct time for every
guest, regardless of server timezone.

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
