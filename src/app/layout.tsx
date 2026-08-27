import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: `${siteConfig.legalName} has provided licensed, insured residential & commercial plumbing services across ${siteConfig.region} for ${siteConfig.yearsInBusiness} years. Same-day emergency dispatch available. Call ${siteConfig.phone}.`,
  keywords: [
    "plumber Los Angeles",
    "plumber Orange County",
    "plumber San Gabriel Valley",
    "emergency plumber Los Angeles County",
    "drain cleaning",
    "hydro jetting",
    "water heater repair",
    "sewer line repair",
    "commercial plumbing",
    "JJJ Plumbing",
  ],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Licensed & insured residential and commercial plumbing across Los Angeles, Orange County, and the San Gabriel Valley. Same-day emergency dispatch available.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PlumbingContractor",
    name: siteConfig.legalName,
    image: `${siteConfig.siteUrl}/jjj-plumbing-logo-v2.png`,
    "@id": siteConfig.siteUrl,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress || undefined,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "Place",
      name: "Los Angeles, Orange County, and the San Gabriel Valley, CA",
    },
    foundingDate: `${siteConfig.founded}`,
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
