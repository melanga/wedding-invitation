import { z } from "zod";

export const attendanceOptions = ["yes", "no"] as const;

export const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "That name looks a little long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  attending: z.enum(attendanceOptions, {
    error: "Please let us know if you'll be attending",
  }),
  guestCount: z
    .number()
    .int()
    .min(1, "At least one guest is required")
    .max(10, "Please contact us directly for larger groups"),
  message: z.string().trim().max(500, "Message is too long").optional(),
  // Honeypot field: real users never fill this in; bots typically do.
  company: z.string().max(0).optional(),
});

export type RsvpFormValues = z.infer<typeof rsvpSchema>;
