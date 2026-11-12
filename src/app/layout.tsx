import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import { church, isDemo, pastor, siteUrl } from "@/lib/site";
import "./globals.css";

// Dated things (the next service, events that expire) switch over on their own; re-render hourly.
export const revalidate = 3600;

// Fonts are self-hosted (scripts/get-font.sh). Never switch to next/font/google.
const playfair = localFont({
  src: [
    { path: "../fonts/playfair-display-400-900.woff2", weight: "400 900", style: "normal" },
    { path: "../fonts/playfair-display-400-900-italic.woff2", weight: "400 900", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});
const cinzel = localFont({ src: "../fonts/cinzel-400-900.woff2", weight: "400 900", variable: "--font-cinzel", display: "swap" });
const figtree = localFont({ src: "../fonts/figtree-300-900.woff2", weight: "300 900", variable: "--font-figtree", display: "swap" });

const description = `${church.name} in Daytona Beach, Florida. ${church.motto} Led by ${pastor.styled} and Prophetess Lady Qutila Simmons.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: church.name,
    template: `%s · ${church.short}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: church.name,
    title: church.name,
    description,
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
  robots: isDemo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#07140e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: church.name,
  url: siteUrl,
  description,
  address: {
    "@type": "PostalAddress",
    ...(church.street ? { streetAddress: `${church.streetNumber} ${church.street}`.trim(), postalCode: church.zip } : {}),
    addressLocality: church.city,
    addressRegion: church.stateCode,
    addressCountry: "US",
  },
  sameAs: [church.facebook, church.youtube].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${cinzel.variable} ${figtree.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Reveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Demo tracking (CRM → Demo Tracking). Remove at go-live. */}
        <script async src="https://www.elijahdesent.com/demo.js" />
      </body>
    </html>
  );
}
