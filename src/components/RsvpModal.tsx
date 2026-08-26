"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRsvpModal } from "@/components/RsvpModalContext";
import { RsvpForm } from "@/components/RsvpForm";
import { weddingConfig } from "@/lib/weddingConfig";

export function RsvpModal() {
  const { isOpen, close } = useRsvpModal();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-modal-title"
            className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-ivory p-6 shadow-xl sm:p-8"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="rsvp-modal-title"
                  className="font-display text-2xl text-charcoal"
                >
                  RSVP
                </h2>
                <p className="mt-1 text-sm text-taupe">
                  Kindly respond by{" "}
                  <span className="font-medium text-charcoal">
                    {weddingConfig.rsvp.deadlineDisplay}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close RSVP form"
                className="shrink-0 rounded-full p-1 text-taupe transition-colors hover:text-charcoal"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <RsvpForm />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
