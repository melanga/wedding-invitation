import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvpSchema";
import { createRsvpEntry, NotionNotConfiguredError } from "@/lib/notion";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  // Honeypot: bots tend to fill in every field, including hidden ones.
  if (parsed.data.company) {
    return NextResponse.json({ success: true });
  }

  try {
    await createRsvpEntry(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NotionNotConfiguredError) {
      console.error("RSVP submission failed: Notion is not configured.");
      return NextResponse.json(
        {
          error:
            "RSVP is temporarily unavailable. Please reach out to us directly instead.",
        },
        { status: 503 }
      );
    }

    console.error("RSVP submission failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
