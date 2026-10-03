import type { InvitationContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";
import { RsvpTriggerButton } from "@/components/RsvpTriggerButton";

export function ClosingCta({ content }: { content: InvitationContent }) {
  const { closing, rsvp } = content;

  return (
    <section className="px-6 py-20 text-center lg:py-32">
      <Reveal>
        <h2 className="font-display text-2xl text-charcoal sm:text-3xl lg:text-4xl">
          {closing.title}
        </h2>
        <Ornament className="mt-4" />

        <p className="mx-auto mt-6 max-w-xs text-sm leading-relaxed text-taupe sm:max-w-md sm:text-base">
          {closing.message}
        </p>

        <RsvpTriggerButton className="mt-8 inline-flex items-center justify-center rounded-full bg-sage-dark px-8 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-charcoal sm:px-10 sm:text-base">
          {closing.rsvpButton}
        </RsvpTriggerButton>

        <p className="mt-4 text-xs text-taupe sm:text-sm">
          {rsvp.respondBy.replace("{date}", rsvp.deadlineDisplay)}
        </p>
      </Reveal>
    </section>
  );
}
