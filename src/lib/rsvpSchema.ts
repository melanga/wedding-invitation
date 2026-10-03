import { z } from "zod";

export const attendanceOptions = ["yes", "no"] as const;

/** Most guests one RSVP can cover, whatever an invite link allows. */
export const MAX_GUESTS = 10;

/** Validation copy, supplied per language from src/lib/content/. */
export interface RsvpValidationMessages {
  nameTooShort: string;
  nameTooLong: string;
  emailInvalid: string;
  attendingRequired: string;
  guestCountInvalid: string;
  guestCountMin: string;
  guestCountMax: string;
  messageTooLong: string;
}

export function createRsvpSchema(
  messages: RsvpValidationMessages,
  maxGuests = MAX_GUESTS
) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, messages.nameTooShort)
      .max(80, messages.nameTooLong),
    email: z.string().trim().pipe(z.email(messages.emailInvalid)),
    attending: z.enum(attendanceOptions, {
      error: messages.attendingRequired,
    }),
    guestCount: z
      .int(messages.guestCountInvalid)
      .min(1, messages.guestCountMin)
      .max(maxGuests, messages.guestCountMax),
    message: z.string().trim().max(500, messages.messageTooLong).optional(),
    // Honeypot field: real users never fill this in; bots typically do.
    company: z.string().max(0).optional(),
  });
}

export type RsvpFormValues = z.infer<ReturnType<typeof createRsvpSchema>>;
