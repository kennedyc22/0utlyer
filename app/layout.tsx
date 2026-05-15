import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { SkipLink } from "../components/layout/SkipLink";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";

const bricolage = localFont({
  src: "../public/fonts/BricolageGrotesque-latin.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: true,
});

const inter = localFont({
  src: "../public/fonts/Inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Outlyer — Inclusive Film & TV Production",
    template: "%s — Outlyer",
  },
  description:
    "Outlyer Entertainment — a film and television production company with a powerful inclusion mission.",
  openGraph: {
    title: "Outlyer — Inclusive Film & TV Production",
    description:
      "A film and television production company with a powerful inclusion mission.",
    type: "website",
    siteName: "Outlyer",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
