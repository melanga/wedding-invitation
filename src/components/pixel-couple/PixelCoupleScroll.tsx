"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { PixelSprite } from "./PixelSprite";
import {
  BRIDE_SPRITES,
  GROOM_SPRITES,
  HEART_HEIGHT,
  HEART_SPRITE,
  HEART_WIDTH,
  HOLD_OVERLAP,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
  type CharacterSprites,
} from "./sprites";

export const MEET_PROGRESS = 0.86;
const HOLD_THRESHOLD = 0.995;
const STEPS_PER_JOURNEY = 24;
const BOB_PX = 2;
const EDGE_INSET = "3vw";
const INNER_REACH = `${(100 - (HOLD_OVERLAP / 2 / SPRITE_WIDTH) * 100).toFixed(3)}%`;
const BRIDE_TRANSFORM = `translateX(calc(${EDGE_INSET} + var(--walk) * (50vw - ${INNER_REACH} - ${EDGE_INSET})))`;
const GROOM_TRANSFORM = `translateX(calc(-${EDGE_INSET} + var(--walk) * (${INNER_REACH} - 50vw + ${EDGE_INSET})))`;

type OverlayStyle = MotionStyle &
  Record<"--walk" | "--sprite-w", MotionValue<number> | string>;

function overlayStyle(walk: MotionValue<number>): OverlayStyle {
  return {
    "--walk": walk,
    "--sprite-w": "clamp(94px, 19vw, 156px)",
  };
}

function frameFor(
  character: CharacterSprites,
  step: number,
  holding: boolean
) {
  if (holding) return character.hold;
  return step % 2 === 0 ? character.walkA : character.walkB;
}

interface Pose {
  step: number;
  holding: boolean;
}

function poseForProgress(progress: number): Pose {
  return {
    step: Math.floor(progress * STEPS_PER_JOURNEY),
    holding: progress >= HOLD_THRESHOLD,
  };
}

interface HeartConfig {
  x: number;
  width: number;
  delay: number;
}

const HEARTS: HeartConfig[] = [
  { x: -30, width: 13, delay: 0.25 },
  { x: -8, width: 19, delay: 0 },
  { x: 18, width: 14, delay: 0.45 },
];

function FloatingHearts({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="absolute left-1/2 flex -translate-x-1/2"
      style={{ bottom: "calc(var(--sprite-w) * 1.45)" }}
    >
      {HEARTS.map((heart) => (
        <motion.div
          key={heart.x}
          className="absolute"
          style={{ left: heart.x, width: heart.width }}
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: reducedMotion ? 0 : [0, -7, 0],
          }}
          exit={{ opacity: 0, scale: 0, y: 10 }}
          transition={{
            opacity: { duration: 0.3, delay: heart.delay },
            scale: {
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: heart.delay,
            },
            y: reducedMotion
              ? { duration: 0 }
              : {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: heart.delay,
                },
          }}
        >
          <PixelSprite
            grid={HEART_SPRITE}
            gridWidth={HEART_WIDTH}
            gridHeight={HEART_HEIGHT}
            className="w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

export function PixelCoupleScroll() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const walk = useTransform(scrollYProgress, [0, MEET_PROGRESS], [0, 1]);

  const [{ step, holding }, setPose] = useState<Pose>(() =>
    poseForProgress(0)
  );

  const syncPose = useCallback((progress: number) => {
    const next = poseForProgress(progress);
    setPose((prev) =>
      prev.step === next.step && prev.holding === next.holding ? prev : next
    );
  }, []);

  useMotionValueEvent(walk, "change", syncPose);

  useEffect(() => {
    const frame = requestAnimationFrame(() => syncPose(walk.get()));
    return () => cancelAnimationFrame(frame);
  }, [walk, syncPose]);

  const bob = !holding && !prefersReducedMotion && step % 2 === 1;
  const bobAnimation = { y: bob ? -BOB_PX : 0 };
  const bobTransition = { duration: 0.15, ease: "easeOut" as const };

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 select-none"
      style={overlayStyle(walk)}
    >
      <div
        className="absolute bottom-0 left-0 will-change-transform"
        style={{ width: "var(--sprite-w)", transform: BRIDE_TRANSFORM }}
      >
        <motion.div animate={bobAnimation} transition={bobTransition}>
          <PixelSprite
            grid={frameFor(BRIDE_SPRITES, step, holding)}
            gridWidth={SPRITE_WIDTH}
            gridHeight={SPRITE_HEIGHT}
            className="block w-full"
          />
        </motion.div>
      </div>

      <div
        className="absolute right-0 bottom-0 will-change-transform"
        style={{ width: "var(--sprite-w)", transform: GROOM_TRANSFORM }}
      >
        <motion.div animate={bobAnimation} transition={bobTransition}>
          <PixelSprite
            grid={frameFor(GROOM_SPRITES, step, holding)}
            gridWidth={SPRITE_WIDTH}
            gridHeight={SPRITE_HEIGHT}
            className="block w-full"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {holding ? (
          <FloatingHearts reducedMotion={prefersReducedMotion} />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
