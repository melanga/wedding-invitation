"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useRsvpModal } from "@/components/RsvpModalContext";
import { MEET_PROGRESS } from "@/components/pixel-couple/PixelCoupleScroll";

export function StickyRsvpButton() {
  const { scrollYProgress } = useScroll();
  const { isOpen, open } = useRsvpModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide once the pixel couple meets so the button never covers them.
    return scrollYProgress.on("change", (value) => {
      setVisible(value > 0.08 && value < MEET_PROGRESS);
    });
  }, [scrollYProgress]);

  const showButton = visible && !isOpen;

  return (
    <motion.button
      type="button"
      onClick={open}
      initial={{ opacity: 0, y: 20 }}
      animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-lg sm:bottom-8"
      style={{ pointerEvents: showButton ? "auto" : "none" }}
    >
      RSVP Now
    </motion.button>
  );
}
