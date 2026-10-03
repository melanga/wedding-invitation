import type { InvitationContent } from "@/lib/content";
import { weddingConfig } from "@/lib/weddingConfig";

interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

function toUtcStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function getCalendarEvent({ calendar }: InvitationContent): CalendarEvent {
  const { event } = weddingConfig;
  return {
    title: calendar.eventTitle,
    description: calendar.eventDescription,
    location: calendar.eventLocation,
    start: new Date(event.startIso),
    end: new Date(event.endIso),
  };
}

export function buildGoogleCalendarUrl(content: InvitationContent): string {
  const { title, description, location, start, end } = getCalendarEvent(content);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: description,
    location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(content: InvitationContent): string {
  const { title, description, location, start, end } = getCalendarEvent(content);
  const now = toUtcStamp(new Date());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${now}-wedding@${weddingConfig.couple.partnerOne.toLowerCase()}-${weddingConfig.couple.partnerTwo.toLowerCase()}`,
    `DTSTAMP:${now}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
