import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Geist for everything you read, Newsreader for the headlines.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  title: `${site.name} · ${site.tagline}`,
  description: site.description,
};

export const viewport: Viewport = { themeColor: "#0d1110" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SmoothScroll>{children}
        </SmoothScroll>
      </body>
    </html>
  );
}
