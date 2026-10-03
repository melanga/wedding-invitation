import { weddingConfig } from "@/lib/weddingConfig";
import type { InvitationContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/Ornament";
import { AddToCalendar } from "@/components/AddToCalendar";

export function EventDetails({ content }: { content: InvitationContent }) {
  const { event, venue } = content;

  return (
    <section id="event" className="px-6 py-20 lg:py-28">
      <Reveal>
        <SectionHeading eyebrow={event.eyebrow} title={event.title} />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mx-auto mt-10 max-w-sm rounded-2xl border border-gold-light/60 bg-white/60 p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(178,142,92,0.25)] md:max-w-2xl md:p-10 lg:mt-14">
          <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
            <div>
              <p className="font-display text-xl text-charcoal lg:text-2xl">
                {event.displayDate}
              </p>
              <p className="mt-1 text-sm text-taupe lg:text-base">
                {event.displayTime}
              </p>
            </div>

            <div
              className="my-6 h-px bg-gold-light/60 md:my-0 md:h-20 md:w-px"
              aria-hidden="true"
            />

            <div>
              <p className="font-display text-lg text-charcoal lg:text-xl">
                {venue.name}
              </p>
              <p className="mt-1 text-sm text-taupe lg:text-base">
                {venue.address}
              </p>

              <a
                href={weddingConfig.venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-sage-dark underline underline-offset-4 transition-colors hover:text-charcoal"
              >
                {venue.mapLink}
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex justify-center lg:mt-10">
          <AddToCalendar content={content} />
        </div>
      </Reveal>
    </section>
  );
}
