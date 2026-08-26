"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRsvpModal } from "@/components/RsvpModalContext";
import { SPRING_SOFT } from "@/lib/motion";

interface RsvpTriggerButtonProps {
  children: ReactNode;
  className?: string;
}

export function RsvpTriggerButton({
  children,
  className,
}: RsvpTriggerButtonProps) {
  const { open } = useRsvpModal();

  return (
    <motion.button
      type="button"
      onClick={open}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={SPRING_SOFT}
    >
      {children}
    </motion.button>
  );
}
