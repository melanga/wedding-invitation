"use client";

import { buildGoogleCalendarUrl, buildIcsContent } from "@/lib/calendar";

function downloadIcsFile() {
  const blob = new Blob([buildIcsContent()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wedding-invitation.ics";
  link.click();
  URL.revokeObjectURL(url);
}

export function AddToCalendar() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={buildGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold hover:text-ivory"
      >
        Google Calendar
      </a>
      <button
        type="button"
        onClick={downloadIcsFile}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-gold hover:text-ivory"
      >
        Apple / Outlook (.ics)
      </button>
    </div>
  );
}
