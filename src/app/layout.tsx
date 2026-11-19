import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GrowthAxis Ventures | Admissions, Alliances & Creative Economy",
  description:
    "GrowthAxis Ventures works with education institutions, skilling organisations and the creative ecosystem to build partnerships, strengthen admissions and unlock new opportunities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior lets Next.js switch off our smooth scrolling while it changes pages,
    // so every navigation starts at the top instead of animating up from wherever you were
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
