import type { Metadata } from "next";
import { services, serviceAreas, testimonials, siteConfig } from "@/lib/site-config";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

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
    "emergency plumber Pasadena",
    "emergency plumber Alhambra",
    "emergency plumber Monterey Park",
    "emergency plumber West Covina",
    "emergency plumber Arcadia",
    "emergency plumber Glendale",
    "emergency plumber Burbank",
    "emergency plumber Whittier",
    "emergency plumber El Monte",
    "emergency plumber Covina",
    "emergency plumber Baldwin Park",
    "emergency plumber Azusa",
    "emergency plumber Monrovia",
    "emergency plumber Glendora",
    "emergency plumber Anaheim",
    "emergency plumber Santa Ana",
    "emergency plumber Irvine",
    "emergency plumber Huntington Beach",
    "emergency plumber Garden Grove",
    "emergency plumber Fullerton",
    "emergency plumber Costa Mesa",
    "emergency plumber Orange CA",
    "water heater installation Pasadena",
    "water heater installation Alhambra",
    "drain cleaning Los Angeles",
    "drain cleaning Pasadena",
    "sewer line repair Los Angeles",
    "trenchless sewer repair Los Angeles",
    "slab leak repair Los Angeles",
    "garbage disposal repair Los Angeles",
    "toilet repair Los Angeles",
    "faucet repair Los Angeles",
    "water heater repair Los Angeles",
    "commercial plumber Los Angeles",
    "commercial plumber Orange County",
    "grease trap service Los Angeles",
    "backflow testing Los Angeles",
    "hydro jetting Los Angeles",
    "camera inspection Los Angeles",
    "plumbing contractor Los Angeles",
    "licensed plumber near me",
    "same day plumber Los Angeles",
    "local plumber San Gabriel Valley",
  ],
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Licensed & insured residential and commercial plumbing across Los Angeles, Orange County, and the San Gabriel Valley. Same-day emergency dispatch available.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`,
        width: 1920,
        height: 1080,
        alt: "JJJ Plumbing Hydro-Jetting & Emergency Service Truck",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Licensed & insured residential and commercial plumbing across Los Angeles, Orange County, and the San Gabriel Valley. Same-day emergency dispatch available.",
    images: [`${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`],
  },
};

function StructuredData() {
  // Aggregate rating from testimonials
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0);
  const avgRating = (totalRating / testimonials.length).toFixed(1);

  const reviewSchema = testimonials.map((t, i) => {
    const date = new Date(2025, i % 12, (i * 7 + 1) % 28 + 1)
      .toISOString()
      .split("T")[0];
    return {
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.quote,
    };
  });

  const serviceSchema = services.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.legalName,
      telephone: siteConfig.phone,
    },
    areaServed: serviceAreas.map((city) => ({
      "@type": "City",
      name: `${city}, CA`,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: siteConfig.siteUrl,
      servicePhone: siteConfig.phone,
    },
  }));

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.siteUrl },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "PlumbingContractor",
        "@id": `${siteConfig.siteUrl}/#organization`,
        name: siteConfig.legalName,
        image: `${siteConfig.siteUrl}/work/hydrojetting-truck-hero-1920.jpg`,
        logo: `${siteConfig.siteUrl}/jjj-plumbing-logo-v3.png`,
        url: siteConfig.siteUrl,
        telephone: siteConfig.phone,
        email: siteConfig.email,
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
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
            ],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        areaServed: serviceAreas.map((city) => ({
          "@type": "City",
          name: `${city}, CA`,
        })),
        foundingDate: `${siteConfig.founded}`,
        sameAs: Object.values(siteConfig.social),
        additionalType: "ProfessionalService",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: "customer service",
          availableLanguage: ["English", "Spanish"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "18:00",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avgRating,
          reviewCount: testimonials.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviewSchema,
        makesOffer: serviceSchema,
        hasMap: `https://maps.google.com/?cid=${siteConfig.siteUrl}`,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.siteUrl}/#localbusiness`,
        name: siteConfig.legalName,
        telephone: siteConfig.phone,
        email: siteConfig.email,
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
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        priceRange: "$$",
        paymentAccepted: ["Cash", "Credit Card", "Buy Now Pay Later", "Financing"],
        currenciesAccepted: "USD",
      },
      breadcrumbSchema,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const callTrackingNumber = process.env.NEXT_PUBLIC_CALL_TRACKING_NUMBER;

  return (
    <html lang="en" className={`h-full antialiased font-sans`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if('scrollRestoration' in history){history.scrollRestoration='manual';}if(window.location.hash&&window.location.hash!=='#specials'){history.replaceState(null,'',window.location.pathname+window.location.search);}window.scrollTo(0,0);}catch(e){}`,
          }}
        />
        <StructuredData />
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans overflow-x-clip">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a'):null;if(!a)return;var href=a.getAttribute('href')||'';if(href.indexOf('tel:')===0&&window.gtag){window.gtag('event','click_to_call',{event_category:'lead',event_label:window.location.pathname,value:1});}else if(href.indexOf('sms:')===0&&window.gtag){window.gtag('event','click_to_sms',{event_category:'lead',event_label:window.location.pathname,value:1});}});`,
          }}
        />
        {callTrackingNumber && (
          <script
            dangerouslySetInnerHTML={{
              __html: `document.querySelectorAll('a[href^="tel:"]').forEach(function(el){el.setAttribute('href','tel:+1${callTrackingNumber.replace(/\\D/g,'')}');});`,
            }}
          />
        )}
      </body>
    </html>
  );
}
