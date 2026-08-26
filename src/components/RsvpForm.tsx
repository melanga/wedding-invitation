"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema, type RsvpFormValues } from "@/lib/rsvpSchema";

type SubmitState = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-taupe/60 focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage";

export function RsvpForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setState("success");
      reset();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="py-6 text-center">
        <p className="font-display text-xl text-charcoal">Thank you!</p>
        <p className="mt-2 text-sm text-taupe">
          Your RSVP has been received. We can&apos;t wait to celebrate with
          you.
        </p>
      </div>
    );
  }

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
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={inputClasses}
          placeholder="Your name"
          {...register("name")}
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-taupe">
          Email
        </label>
        <input
          id="email"
          type="email"
          className={inputClasses}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <span className="mb-1 block text-sm text-taupe">
          Will you be attending?
        </span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="radio" value="yes" {...register("attending")} />
            Joyfully accept
          </label>
          <label className="flex items-center gap-2 text-sm text-charcoal">
            <input type="radio" value="no" {...register("attending")} />
            Regretfully decline
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
          Number of Guests (incl. yourself)
        </label>
        <input
          id="guestCount"
          type="number"
          min={1}
          max={10}
          className={inputClasses}
          {...register("guestCount", { valueAsNumber: true })}
        />
        {errors.guestCount ? (
          <p className="mt-1 text-xs text-red-600">
            {errors.guestCount.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-taupe">
          Message to the couple (optional)
        </label>
        <textarea
          id="message"
          rows={3}
          className={inputClasses}
          placeholder="Leave a note for the couple"
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
        {state === "submitting" ? "Sending..." : "Send RSVP"}
      </button>
    </form>
  );
}
