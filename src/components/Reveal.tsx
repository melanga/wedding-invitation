"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  EASE_OUT,
  revealVariants,
  VIEWPORT_ONCE,
  type RevealDirection,
} from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Direction the content travels in from as it reveals. */
  direction?: RevealDirection;
}

/**
 * Wraps content so it fades and slides into place the first time it
 * scrolls into view. Centralising the animation here keeps every
 * section's reveal behaviour consistent and easy to tune in one place.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={revealVariants(reducedMotion ? "none" : direction)}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
