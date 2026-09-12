import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Great_Vibes, Jost, Playfair_Display } from "next/font/google";
import { getSiteUrl } from "@/lib/siteUrl";
import { weddingConfig } from "@/lib/weddingConfig";
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

const { partnerOne, partnerTwo } = weddingConfig.couple;
const pageTitle = `${partnerOne} & ${partnerTwo} | We're Getting Married`;

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: pageTitle,
  description: weddingConfig.copy.metaDescription,
  openGraph: {
    title: pageTitle,
    description: weddingConfig.copy.metaDescription,
    type: "website",
    locale: "en_US",
    siteName: `${partnerOne} & ${partnerTwo}`,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: weddingConfig.copy.metaDescription,
  },
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
      className={`${cursive.variable} ${display.variable} ${sans.variable}`}
    >
      <body className="min-h-full bg-ivory font-sans text-charcoal antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
