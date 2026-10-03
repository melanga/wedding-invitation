import type { RsvpValidationMessages } from "@/lib/rsvpSchema";

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
}

/**
 * Everything a guest reads, in one language. Each language file provides a
 * complete copy, so TypeScript flags any string a translation is missing.
 */
export interface InvitationContent {
  meta: {
    /** Browser tab and link-preview title. */
    title: string;
    /** Link-preview description. */
    description: string;
    /** Open Graph locale, e.g. "en_US". */
    ogLocale: string;
  };
  hero: {
    greetingEyebrow: string;
    invitationLine: string;
    rsvpButton: string;
    scrollHint: string;
  };
  event: {
    eyebrow: string;
    title: string;
    displayDate: string;
    displayTime: string;
  };
  venue: {
    name: string;
    address: string;
    mapLink: string;
  };
  calendar: {
    googleButton: string;
    icsButton: string;
    /** Title and notes of the event saved to a guest's calendar. */
    eventTitle: string;
    eventDescription: string;
    /** Looked up on a map by calendar apps, so keep it in English. */
    eventLocation: string;
  };
  schedule: {
    eyebrow: string;
    title: string;
    items: ScheduleItem[];
  };
  closing: {
    title: string;
    message: string;
    rsvpButton: string;
  };
  rsvp: {
    title: string;
    closeLabel: string;
    /** `{date}` is replaced by `deadlineDisplay`. */
    respondBy: string;
    deadlineDisplay: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      attendingLegend: string;
      accept: string;
      decline: string;
      guestCountLabel: string;
      /** Hint under the guest count when the link allows only one guest. */
      guestCountReserved: string;
      /** Hint when the link allows more; `{count}` is that allowance. */
      guestCountLimit: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successMessage: string;
      unavailableError: string;
      genericError: string;
    };
    validation: RsvpValidationMessages;
  };
  footer: {
    signOff: string;
  };
}
