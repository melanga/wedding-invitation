"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { weddingConfig } from "@/lib/weddingConfig";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/Ornament";
import { SPRING_SOFT, VIEWPORT_ONCE } from "@/lib/motion";
import clsx from "clsx";

function TimelineDot({ className }: { className?: string }) {
  return (
    <motion.span
      className={clsx(
        "absolute top-1 flex h-4 w-4 items-center justify-center",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { ...SPRING_SOFT, delay: 0.15 } },
      }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full border border-sage/40" />
      <span className="h-2.5 w-2.5 rounded-full bg-sage" />
    </motion.span>
  );
}

export function ScheduleTimeline() {
  const { schedule } = weddingConfig;
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const drawnLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  return (
    <section className="bg-cream/60 px-6 py-20 lg:py-28">
      <Reveal>
        <SectionHeading eyebrow="The Itinerary" title="Schedule" />
      </Reveal>

      <ol
        ref={listRef}
        className="relative mx-auto mt-12 flex max-w-sm flex-col gap-10 md:max-w-3xl md:gap-14 lg:mt-16"
      >
        {/* Base rail + the sage line that draws itself in as you scroll. */}
        <div
          className="absolute top-1 bottom-1 left-[7px] w-px bg-gold-light/70 md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />
        <motion.div
          style={{ scaleY: reducedMotion ? 1 : drawnLength }}
          className="absolute top-1 bottom-1 left-[7px] w-px origin-top bg-sage md:left-1/2 md:-translate-x-1/2"
          aria-hidden="true"
        />

        {schedule.map((item, index) => {
          const isLeftSide = index % 2 === 0;

          return (
            <li
              key={item.title}
              className={clsx(
                "relative pl-10 md:w-1/2 md:pl-0",
                isLeftSide
                  ? "md:self-start md:pr-12 md:text-right"
                  : "md:self-end md:pl-12"
              )}
            >
              <TimelineDot
                className={clsx(
                  "left-0",
                  isLeftSide
                    ? "md:right-0 md:left-auto md:translate-x-1/2"
                    : "md:left-0 md:-translate-x-1/2"
                )}
              />

              <Reveal
                delay={0.1}
                direction={isLeftSide ? "right" : "left"}
              >
                <p className="text-xs font-medium tracking-widest text-sage-dark uppercase sm:text-sm">
                  {item.time}
                </p>
                <p className="mt-1 font-display text-lg text-charcoal lg:text-xl">
                  {item.title}
                </p>
                {item.description ? (
                  <p className="mt-1 text-sm text-taupe lg:text-base">
                    {item.description}
                  </p>
                ) : null}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
