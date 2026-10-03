import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Great_Vibes,
  Jost,
  Noto_Sans_Sinhala,
  Noto_Serif_Sinhala,
  Playfair_Display,
} from "next/font/google";
import { getSiteUrl } from "@/lib/siteUrl";
import "./globals.css";

const cursive = Great_Vibes({
  variable: "--font-cursive",
  weight: "400",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Sinhala fallbacks for the display and sans stacks (see globals.css). Not
// preloaded: browsers only fetch them once Sinhala text is on the page.
const sinhalaSerif = Noto_Serif_Sinhala({
  variable: "--font-sinhala-serif",
  subsets: ["sinhala"],
  preload: false,
});

const sinhalaSans = Noto_Sans_Sinhala({
  variable: "--font-sinhala-sans",
  subsets: ["sinhala"],
  preload: false,
});

// Title, description and previews are set per language in app/page.tsx.
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f2ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cursive.variable} ${display.variable} ${sans.variable} ${sinhalaSerif.variable} ${sinhalaSans.variable}`}
    >
      <body className="min-h-full bg-ivory font-sans text-charcoal antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
