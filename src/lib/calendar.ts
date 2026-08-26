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

function getCalendarEvent(): CalendarEvent {
  const { event, venue, couple } = weddingConfig;
  return {
    title: `${couple.partnerOne} & ${couple.partnerTwo}'s Wedding`,
    description: `Join us as we celebrate the wedding of ${couple.partnerOne} & ${couple.partnerTwo}. ${weddingConfig.copy.metaDescription}`,
    location: `${venue.name}, ${venue.address}`,
    start: new Date(event.startIso),
    end: new Date(event.endIso),
  };
}

export function buildGoogleCalendarUrl(): string {
  const { title, description, location, start, end } = getCalendarEvent();
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: description,
    location,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsContent(): string {
  const { title, description, location, start, end } = getCalendarEvent();
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
