import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Great_Vibes, Jost, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: `${partnerOne} & ${partnerTwo} | We're Getting Married`,
  description: weddingConfig.copy.metaDescription,
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
