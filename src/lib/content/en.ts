import { weddingConfig } from "@/lib/weddingConfig";
import type { InvitationContent } from "./types";

const { partnerOne, partnerTwo } = weddingConfig.couple;
const names = `${partnerOne} & ${partnerTwo}`;
const description = `${names} are getting married — join us as we celebrate the beginning of our forever.`;
const venueName = "The Grand Walawwa";
const venueAddress = "No. 190/8 Kandy Road, Kegalle, Sri Lanka";

export const en: InvitationContent = {
  meta: {
    title: `${names} | We're Getting Married`,
    description,
    ogLocale: "en_US",
  },
  hero: {
    greetingEyebrow: "Together with their families",
    invitationLine: "request the pleasure of your company",
    rsvpButton: "RSVP",
    scrollHint: "Scroll",
  },
  event: {
    eyebrow: "Save the Date",
    title: "Wedding Day",
    displayDate: "Friday, October 23rd, 2026",
    displayTime: "8:15 AM onwards",
  },
  venue: {
    name: venueName,
    address: venueAddress,
    mapLink: "View on Google Maps",
  },
  calendar: {
    googleButton: "Google Calendar",
    icsButton: "Apple / Outlook (.ics)",
    eventTitle: `${names}'s Wedding`,
    eventDescription: `Join us as we celebrate the wedding of ${names}. ${description}`,
    eventLocation: `${venueName}, ${venueAddress}`,
  },
  schedule: {
    eyebrow: "The Itinerary",
    title: "Schedule",
    items: [
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
  },
  closing: {
    title: "Join Us",
    message:
      "Your presence means the world to us. Let us know if you'll be celebrating with us.",
    rsvpButton: "RSVP Now",
  },
  rsvp: {
    title: "RSVP",
    closeLabel: "Close RSVP form",
    respondBy: "Kindly respond by",
    deadlineDisplay: "October 10th, 2026",
    form: {
      nameLabel: "Full Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      attendingLegend: "Will you be attending?",
      accept: "Joyfully accept",
      decline: "Regretfully decline",
      guestCountLabel: "Number of Guests (incl. yourself)",
      guestCountReserved: "We've saved a seat just for you.",
      guestCountLimit: "Your invitation is for up to {count} guests.",
      messageLabel: "Message to the couple (optional)",
      messagePlaceholder: "Leave a note for the couple",
      submit: "Send RSVP",
      submitting: "Sending...",
      successTitle: "Thank you!",
      successMessage:
        "Your RSVP has been received. We can't wait to celebrate with you.",
      unavailableError:
        "RSVP is temporarily unavailable. Please reach out to us directly instead.",
      genericError: "Something went wrong. Please try again in a moment.",
    },
    validation: {
      nameTooShort: "Please enter your full name",
      nameTooLong: "That name looks a little long",
      emailInvalid: "Please enter a valid email address",
      attendingRequired: "Please let us know if you'll be attending",
      guestCountInvalid: "Please enter the number of guests",
      guestCountMin: "At least one guest is required",
      guestCountMax: "That's more guests than your invitation includes",
      messageTooLong: "Message is too long",
    },
  },
  footer: {
    signOff: `With love, ${names}`,
  },
};
