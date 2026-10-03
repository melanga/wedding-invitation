"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InvitationContent } from "@/lib/content";
import { createRsvpSchema, type RsvpFormValues } from "@/lib/rsvpSchema";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-taupe/60 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage disabled:cursor-not-allowed disabled:bg-cream/60 disabled:text-taupe";

interface RsvpFormProps {
  content: InvitationContent;
  /** Guests, including the invitee, the invite link allows. */
  maxGuests: number;
  onSuccessChange?: (success: boolean) => void;
}

export function RsvpForm({
  content,
  maxGuests,
  onSuccessChange,
}: RsvpFormProps) {
  const { form, validation } = content.rsvp;
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const schema = useMemo(
    () => createRsvpSchema(validation, maxGuests),
    [validation, maxGuests]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      guestCount: 1,
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: RsvpFormValues) {
    setState("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setState("error");
        setErrorMessage(
          response.status === 503 ? form.unavailableError : form.genericError
        );
        return;
      }

      setState("success");
      onSuccessChange?.(true);
      reset();
    } catch {
      setState("error");
      setErrorMessage(form.genericError);
    }
  }

  if (state === "success") {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-xl text-charcoal">
          {form.successTitle}
        </p>
        <p className="mt-2 text-sm text-taupe">{form.successMessage}</p>
      </div>
    );
  }

  // A link without a guest allowance locks the count at its default of 1.
  // That input stays unregistered instead of using RHF's `disabled` option,
  // which would drop guestCount from the submitted values.
  const canChooseGuestCount = maxGuests > 1;
  const guestCountField = canChooseGuestCount
    ? register("guestCount", { valueAsNumber: true })
    : { value: 1, disabled: true };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Honeypot field — hidden from real visitors, catches simple bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-taupe">
          {form.nameLabel}
        </label>
        <input
          id="name"
          type="text"
          className={inputClasses}
          placeholder={form.namePlaceholder}
          {...register("name")}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-taupe">
          {form.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          className={inputClasses}
          placeholder={form.emailPlaceholder}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <span className="mb-1 block text-sm text-taupe">
          {form.attendingLegend}
        </span>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="radio" value="yes" {...register("attending")} />
            {form.accept}
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="radio" value="no" {...register("attending")} />
            {form.decline}
          </label>
        </div>
        {errors.attending ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.attending.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="guestCount" className="mb-1 block text-sm text-taupe">
          {form.guestCountLabel}
        </label>
        <input
          id="guestCount"
          type="number"
          min={1}
          max={maxGuests}
          aria-describedby="guestCount-hint"
          className={inputClasses}
          {...guestCountField}
        />
        <p id="guestCount-hint" className="mt-1 text-xs text-taupe">
          {canChooseGuestCount
            ? form.guestCountLimit.replace("{count}", String(maxGuests))
            : form.guestCountReserved}
        </p>
        {errors.guestCount ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.guestCount.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-taupe">
          {form.messageLabel}
        </label>
        <textarea
          id="message"
          rows={3}
          className={inputClasses}
          placeholder={form.messagePlaceholder}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {state === "error" && errorMessage ? (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-sage-dark px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? form.submitting : form.submit}
      </button>
    </form>
  );
}
