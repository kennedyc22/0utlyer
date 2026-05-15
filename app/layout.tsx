import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

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
  title: "Outlyer",
  description: "Outlyer Entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
