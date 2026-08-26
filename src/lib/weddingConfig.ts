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
  contact: {
    name: string;
    phone?: string;
    email?: string;
  }[];
}

export const weddingConfig: WeddingConfig = {
  couple: {
    partnerOne: "Janani",
    partnerTwo: "Melanga",
    hashtag: "#JananiAndMelanga",
  },
  event: {
    startIso: "2027-02-14T16:00:00+05:30",
    endIso: "2027-02-14T22:00:00+05:30",
    displayDate: "Sunday, February 14th, 2027",
    displayTime: "4:00 PM onwards",
  },
  venue: {
    name: "The Garden Pavilion",
    address: "123 Lakeside Avenue, Colombo, Sri Lanka",
    mapUrl: "https://maps.google.com/?q=The+Garden+Pavilion+Colombo",
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
      time: "3:30 PM",
      title: "Guest Arrival",
      description: "Please arrive a little early to find your seat.",
    },
    {
      time: "4:00 PM",
      title: "Ceremony",
      description: "Exchange of vows at the garden pavilion.",
    },
    {
      time: "5:30 PM",
      title: "Photographs",
      description: "Join us for photos with the newlyweds.",
    },
    {
      time: "6:30 PM",
      title: "Reception & Dinner",
      description: "Dinner, drinks and dancing under the stars.",
    },
  ],
  rsvp: {
    deadlineDisplay: "January 15th, 2027",
    note: "Kindly RSVP so we can prepare a seat (and a slice of cake) just for you.",
  },
  contact: [
    { name: "Janani", phone: "+94 71 234 5678" },
    { name: "Melanga", phone: "+94 77 876 5432" },
  ],
};
