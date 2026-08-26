"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface RsvpModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const RsvpModalContext = createContext<RsvpModalContextValue | null>(null);

export function RsvpModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<RsvpModalContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <RsvpModalContext.Provider value={value}>
      {children}
    </RsvpModalContext.Provider>
  );
}

export function useRsvpModal(): RsvpModalContextValue {
  const context = useContext(RsvpModalContext);

  if (!context) {
    throw new Error("useRsvpModal must be used within a RsvpModalProvider");
  }

  return context;
}
