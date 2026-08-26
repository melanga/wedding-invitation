"use client";

import { motion, useReducedMotion } from "framer-motion";

interface PetalConfig {
  /** Horizontal position as a percentage of the container width. */
  left: number;
  size: number;
  duration: number;
  delay: number;
  /** How far the petal sways sideways while falling, in px. */
  sway: number;
  opacity: number;
  color: "gold" | "sage";
}

/**
 * Deterministic petal layout (rather than Math.random) so the server
 * and client render identical markup and hydration stays clean.
 */
const PETALS: PetalConfig[] = [
  { left: 8, size: 14, duration: 17, delay: 0, sway: 42, opacity: 0.5, color: "gold" },
  { left: 22, size: 10, duration: 21, delay: 4, sway: -34, opacity: 0.35, color: "sage" },
  { left: 35, size: 16, duration: 15, delay: 9, sway: 50, opacity: 0.45, color: "gold" },
  { left: 48, size: 9, duration: 23, delay: 2, sway: -28, opacity: 0.3, color: "sage" },
  { left: 60, size: 13, duration: 18, delay: 12, sway: 38, opacity: 0.5, color: "gold" },
  { left: 72, size: 11, duration: 20, delay: 6, sway: -46, opacity: 0.4, color: "sage" },
  { left: 84, size: 15, duration: 16, delay: 14, sway: 32, opacity: 0.45, color: "gold" },
  { left: 93, size: 10, duration: 22, delay: 8, sway: -40, opacity: 0.35, color: "gold" },
];

const PETAL_COLORS: Record<PetalConfig["color"], string> = {
  gold: "var(--color-gold-light)",
  sage: "var(--color-sage)",
};

function PetalShape({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1C11.5 3.5 13.5 7 13 11C12.6 14 10.5 15 8 15C5.5 15 3.4 14 3 11C2.5 7 4.5 3.5 8 1Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * A gentle shower of petals drifting down the hero. Purely decorative:
 * hidden from assistive tech, ignores pointer events and disabled
 * entirely for users who prefer reduced motion.
 */
export function FloatingPetals() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {PETALS.map((petal, index) => (
        <motion.span
          key={index}
          className="absolute -top-8"
          style={{ left: `${petal.left}%`, opacity: petal.opacity }}
          initial={{ y: "-10vh" }}
          animate={{
            y: "115vh",
            x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.4, 0],
            rotate: [0, 120, 260, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
            x: { duration: petal.duration, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <PetalShape size={petal.size} color={PETAL_COLORS[petal.color]} />
        </motion.span>
      ))}
    </div>
  );
}
