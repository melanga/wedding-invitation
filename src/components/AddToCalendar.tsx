"use client";

import { buildGoogleCalendarUrl, buildIcsContent } from "@/lib/calendar";
import type { InvitationContent } from "@/lib/content";

function downloadIcsFile(content: InvitationContent) {
  const blob = new Blob([buildIcsContent(content)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  link.click();
  URL.revokeObjectURL(url);
}

export function AddToCalendar({ content }: { content: InvitationContent }) {
  const { calendar } = content;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={buildGoogleCalendarUrl(content)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold hover:text-ivory"
      >
        {calendar.googleButton}
      </a>
      <button
        type="button"
        onClick={() => downloadIcsFile(content)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold hover:text-ivory"
      >
        {calendar.icsButton}
      </button>
    </div>
  );
}
