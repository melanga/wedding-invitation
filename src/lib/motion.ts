/**
 * Shared animation vocabulary for the whole invitation.
 *
 * Every component sources its easing curves, durations and reveal
 * variants from here so the site animates with one consistent voice
 * and tuning the feel of the whole page is a one-file change.
 */

import type { Transition, Variants } from "framer-motion";

/** Signature ease — a soft, expensive-feeling decelerate. */
export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Gentle spring used for pops (timeline dots, buttons, ampersand). */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 18,
};

/** Default viewport config for scroll-triggered reveals. */
export const VIEWPORT_ONCE = { once: true, amount: 0.3 } as const;

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

const REVEAL_DISTANCE = 28;

const DIRECTION_OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: REVEAL_DISTANCE },
  down: { x: 0, y: -REVEAL_DISTANCE },
  left: { x: REVEAL_DISTANCE, y: 0 },
  right: { x: -REVEAL_DISTANCE, y: 0 },
  none: { x: 0, y: 0 },
};

export function revealVariants(direction: RevealDirection): Variants {
  const { x, y } = DIRECTION_OFFSET[direction];

  return {
    hidden: { opacity: 0, x, y, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
  };
}

/** Parent variants that cascade `hidden` → `visible` through children. */
export function staggerContainer(
  staggerChildren = 0.12,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Child variants for use inside a `staggerContainer` parent. */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

/** Rising mask reveal — content slides up from behind a clipped edge. */
export const maskRise: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_OUT },
  },
};

/** Horizontal line that grows from its center. */
export const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};
