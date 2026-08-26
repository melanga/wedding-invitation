import { Client } from "@notionhq/client";
import type { RsvpFormValues } from "@/lib/rsvpSchema";

/**
 * Expected Notion database schema (column name -> type):
 *   Name          -> Title
 *   Email         -> Email
 *   Attending     -> Select ("Yes" | "No")
 *   Guests        -> Number
 *   Message       -> Text
 *   Submitted At  -> Date
 *
 * Update NOTION_PROPERTY below if your database uses different column
 * names — this is the single place that maps our form to Notion.
 */
const NOTION_PROPERTY = {
  name: "Name",
  email: "Email",
  attending: "Attending",
  guests: "Guests",
  message: "Message",
  submittedAt: "Submitted At",
} as const;

export class NotionNotConfiguredError extends Error {
  constructor() {
    super("Notion integration is not configured.");
    this.name = "NotionNotConfiguredError";
  }
}

function getNotionClient(): { client: Client; databaseId: string } {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    throw new NotionNotConfiguredError();
  }

  return { client: new Client({ auth: apiKey }), databaseId };
}

export async function createRsvpEntry(values: RsvpFormValues): Promise<void> {
  const { client, databaseId } = getNotionClient();

  await client.pages.create({
    parent: { database_id: databaseId },
    properties: {
      [NOTION_PROPERTY.name]: {
        title: [{ text: { content: values.name } }],
      },
      [NOTION_PROPERTY.email]: {
        email: values.email,
      },
      [NOTION_PROPERTY.attending]: {
        select: { name: values.attending === "yes" ? "Yes" : "No" },
      },
      [NOTION_PROPERTY.guests]: {
        number: values.guestCount,
      },
      [NOTION_PROPERTY.message]: {
        rich_text: values.message
          ? [{ text: { content: values.message } }]
          : [],
      },
      [NOTION_PROPERTY.submittedAt]: {
        date: { start: new Date().toISOString() },
      },
    },
  });
}
