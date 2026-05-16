import type { Metadata } from "next";
import "../styles/globals.css";
import { SkipLink } from "../components/layout/SkipLink";
import { Nav } from "../components/layout/Nav";
import { Footer } from "../components/layout/Footer";
import { CookieConsent } from "../components/cookies/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "OUTLYER | outlyer entertainment",
    template: "%s | OUTLYER",
  },
  description:
    "A film and television production company with a powerful inclusion mission. Founded by Coldplay's Chris Martin and Emmanuel Kelly.",
  openGraph: {
    title: "OUTLYER | outlyer entertainment",
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
    <html lang="en-GB" suppressHydrationWarning>
      <body>
        <SkipLink />
        <Nav />
        <main id="content">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
