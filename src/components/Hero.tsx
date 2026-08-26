"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { weddingConfig } from "@/lib/weddingConfig";
import { Ornament } from "@/components/Ornament";
import { FloatingPetals } from "@/components/FloatingPetals";
import { RsvpTriggerButton } from "@/components/RsvpTriggerButton";
import { EASE_OUT, SPRING_SOFT, staggerChild, staggerContainer } from "@/lib/motion";

/** Cursive names sharpen into focus — no clipping issues with script glyphs. */
const nameFocus: Variants = {
  hidden: { opacity: 0, y: 30, letterSpacing: "0.12em", filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: "0em",
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: EASE_OUT },
  },
};

const ampersandPop: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -120 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { ...SPRING_SOFT, delay: 0.1 },
  },
};

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--color-gold-light)_0%,transparent_70%)] opacity-30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--color-sage)_0%,transparent_70%)] opacity-15"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function Hero() {
  const { couple, event, copy } = weddingConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <HeroBackdrop />
      <FloatingPetals />

      <motion.div
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.18, 0.2)}
      >
        <motion.p
          variants={staggerChild}
          className="text-xs font-medium tracking-[0.25em] text-sage-dark uppercase sm:text-sm"
        >
          {copy.greetingEyebrow}
        </motion.p>

        <div className="mt-6 flex flex-col items-center lg:mt-10 lg:flex-row lg:items-baseline lg:gap-8">
          <motion.h1
            variants={nameFocus}
            className="font-cursive text-6xl leading-none text-charcoal sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            {couple.partnerOne}
          </motion.h1>
          <motion.span
            variants={ampersandPop}
            className="my-2 font-display text-xl text-gold italic lg:my-0 lg:text-3xl"
          >
            &amp;
          </motion.span>
          <motion.h1
            variants={nameFocus}
            className="font-cursive text-6xl leading-none text-charcoal sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            {couple.partnerTwo}
          </motion.h1>
        </div>

        <motion.div variants={staggerChild}>
          <Ornament className="mt-8 lg:mt-12" />
        </motion.div>

        <motion.p
          variants={staggerChild}
          className="mt-8 max-w-xs text-sm leading-relaxed text-taupe sm:max-w-sm sm:text-base"
        >
          {copy.invitationLine}
        </motion.p>

        <motion.div variants={staggerChild} className="mt-6">
          <p className="font-display text-lg text-charcoal sm:text-xl lg:text-2xl">
            {event.displayDate}
          </p>
          <p className="mt-1 text-sm tracking-wide text-taupe sm:text-base">
            {event.displayTime}
          </p>
        </motion.div>

        <motion.div variants={staggerChild}>
          <RsvpTriggerButton className="mt-10 inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-sage-dark sm:px-10 sm:text-base">
            RSVP
          </RsvpTriggerButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="animate-bounce-soft absolute bottom-10 flex flex-col items-center gap-2 text-taupe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-[0.65rem] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
          <rect
            x="1"
            y="1"
            width="12"
            height="18"
            rx="6"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="7" cy="6" r="1.4" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
