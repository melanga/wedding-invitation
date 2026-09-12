/**
 * Single source of truth for all wedding content.
 *
 * Editing the wedding details, venue, schedule or copy should only ever
 * require changes in this file — components read from here so the rest
 * of the codebase never hard-codes content.
 */

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

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
    displayDate: string;
    displayTime: string;
  };
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  copy: {
    metaDescription: string;
    greetingEyebrow: string;
    invitationLine: string;
    closingTitle: string;
    closingMessage: string;
  };
  schedule: ScheduleItem[];
  rsvp: {
    deadlineDisplay: string;
    note: string;
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
    displayDate: "Friday, October 23rd, 2026",
    displayTime: "8:15 AM onwards",
  },
  venue: {
    name: "The Grand Walawwa",
    address: "No. 190/8 Kandy Road, Kegalle, Sri Lanka",
    mapUrl: "https://maps.app.goo.gl/Nw35emYtQdSbnANfA",
  },
  copy: {
    metaDescription:
      "Janani & Melanga are getting married — join us as we celebrate the beginning of our forever.",
    greetingEyebrow: "Together with their families",
    invitationLine: "request the pleasure of your company",
    closingTitle: "Join Us",
    closingMessage:
      "Your presence means the world to us. Let us know if you'll be celebrating with us.",
  },
  schedule: [
    {
      time: "8:15 AM",
      title: "Guest Arrival",
      description: "Please arrive a little early so we can welcome you with a smile.",
    },
    {
      time: "8:45 AM",
      title: "Marriage Registration",
      description: "The official yes — a few signatures, then a lifetime of us.",
    },
    {
      time: "10:00 AM",
      title: "Poruwa Ceremony",
      description: "Blessings from both families as we take our first steps together.",
    },
    {
      time: "12:00 PM",
      title: "Lunch",
      description: "Come hungry, stay for seconds, and please leave room for cake.",
    },
    {
      time: "4:00 PM",
      title: "Departure",
      description: "Send us off with your love.",
    },
  ],
  rsvp: {
    deadlineDisplay: "October 10th, 2026",
    note: "Kindly RSVP so we can prepare a seat (and a slice of cake) just for you.",
  },
};
