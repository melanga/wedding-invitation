import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StickyRsvpButton } from "@/components/StickyRsvpButton";
import { RsvpModalProvider } from "@/components/RsvpModalContext";
import { RsvpModal } from "@/components/RsvpModal";
import { PixelCoupleScroll } from "@/components/pixel-couple/PixelCoupleScroll";

export default function Home() {
  return (
    <RsvpModalProvider>
      <ScrollProgress />
      <main className="min-h-screen overflow-x-clip bg-ivory">
        <Hero />
        <EventDetails />
        <ScheduleTimeline />
        <ClosingCta />
        <Footer />
      </main>
      <PixelCoupleScroll />
      <StickyRsvpButton />
      <RsvpModal />
    </RsvpModalProvider>
  );
}
