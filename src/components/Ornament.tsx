"use client";

import { motion, useReducedMotion } from "framer-motion";
import { lineGrow, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Decorative divider — a gold line growing outward from a small
 * diamond the first time it scrolls into view.
 */
export function Ornament({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-hidden="true"
      initial={reducedMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      <motion.span
        variants={lineGrow}
        className="h-px w-10 origin-right bg-gold-light sm:w-14"
      />
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: 45, opacity: 0 },
          visible: {
            scale: 1,
            rotate: 45,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
          },
        }}
        className="h-1.5 w-1.5 shrink-0 bg-gold"
      />
      <motion.span
        variants={lineGrow}
        className="h-px w-10 origin-left bg-gold-light sm:w-14"
      />
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="mb-2 text-xs font-medium tracking-[0.2em] text-sage-dark uppercase sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl text-charcoal sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <Ornament className="mt-4" />
    </div>
  );
}
