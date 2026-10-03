import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { ScheduleTimeline } from "@/components/ScheduleTimeline";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { RsvpModalProvider } from "@/components/RsvpModalContext";
import { RsvpModal } from "@/components/RsvpModal";
import { PixelCoupleScroll } from "@/components/pixel-couple/PixelCoupleScroll";
import { getContent } from "@/lib/content";
import { parseInviteOptions } from "@/lib/inviteLink";
import { weddingConfig } from "@/lib/weddingConfig";

export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const { locale } = parseInviteOptions(await searchParams);
  const { meta } = getContent(locale);
  const { partnerOne, partnerTwo } = weddingConfig.couple;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: meta.ogLocale,
      siteName: `${partnerOne} & ${partnerTwo}`,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { locale, maxGuests } = parseInviteOptions(await searchParams);
  const content = getContent(locale);

  return (
    <RsvpModalProvider>
      <div lang={locale}>
        <ScrollProgress />
        <main className="min-h-screen overflow-x-clip bg-ivory">
          <Hero content={content} />
          <EventDetails content={content} />
          <ScheduleTimeline content={content} />
          <ClosingCta content={content} />
          <Footer content={content} />
        </main>
        <PixelCoupleScroll />
        <RsvpModal content={content} maxGuests={maxGuests} />
      </div>
    </RsvpModalProvider>
  );
}
