import { isLocale, type Locale } from "@/lib/content";
import { MAX_GUESTS } from "@/lib/rsvpSchema";

/**
 * Per-guest options read from the shared link's query string:
 *
 *   ?lang=si    show the invitation in Sinhala (English otherwise)
 *   ?guests=3   let the guest RSVP for up to 3 people (locked to 1 otherwise)
 *
 * e.g. /?lang=si&guests=2. Anyone holding the link can edit it, so this
 * shapes the form rather than enforcing a limit.
 */
export interface InviteOptions {
  locale: Locale;
  /** Guests, including the invitee, this link can RSVP for. */
  maxGuests: number;
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseInviteOptions(searchParams: SearchParams): InviteOptions {
  const lang = first(searchParams.lang)?.toLowerCase();
  const guests = Number(first(searchParams.guests));

  return {
    locale: lang && isLocale(lang) ? lang : "en",
    maxGuests:
      Number.isInteger(guests) && guests > 1 ? Math.min(guests, MAX_GUESTS) : 1,
  };
}
