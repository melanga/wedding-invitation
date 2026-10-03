/**
 * Wedding facts shared by every language: the couple's names, the exact
 * event times and the venue's map link.
 *
 * Everything guests read — the date as written, venue, schedule and all
 * copy — lives per language in src/lib/content/, so components never
 * hard-code content.
 */

export interface WeddingConfig {
  couple: {
    partnerOne: string;
    partnerTwo: string;
    hashtag: string;
  };
  event: {
    /**
     * ISO 8601 date-time WITH a UTC offset, e.g. "2027-02-14T16:00:00+05:30".
     * Including the offset ensures the calendar links resolve to the
     * correct instant regardless of the timezone the server runs in.
     */
    startIso: string;
    /** ISO 8601 date-time with UTC offset for the end of the event */
    endIso: string;
  };
  venue: {
    mapUrl: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    partnerOne: "Janani",
    partnerTwo: "Melanga",
    hashtag: "#JananiAndMelanga",
  },
  event: {
    startIso: "2026-10-23T08:15:00+05:30",
    endIso: "2026-10-23T16:00:00+05:30",
  },
  venue: {
    mapUrl: "https://maps.app.goo.gl/Nw35emYtQdSbnANfA",
  },
};
