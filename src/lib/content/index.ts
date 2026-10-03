import { en } from "./en";
import { si } from "./si";
import type { InvitationContent } from "./types";

export type { InvitationContent, ScheduleItem } from "./types";

export const locales = ["en", "si"] as const;

export type Locale = (typeof locales)[number];

const content: Record<Locale, InvitationContent> = { en, si };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getContent(locale: Locale): InvitationContent {
  return content[locale];
}
