import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageSquareText,
  Clock,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { photoBlur } from "@/lib/photo-blur";
import { LeadForm } from "@/components/site/lead-form";
import { CoverageMap } from "@/components/site/coverage-map";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Contact JJJ Plumbing — Master Plumber Dispatch | (626) 506-6951",
  description:
    "Contact JJJ Plumbing for 24/7 same-day emergency dispatch across Los Angeles, Orange County, and the San Gabriel Valley. CA CSLB #842875. Call or request a quote.",
  alternates: { canonical: `${siteConfig.siteUrl}/contact` },
};

const dispatchRegions = [
  {
    name: "San Gabriel Valley",
    time: "25–40 Min",
    cities: "San Gabriel, Pasadena, Alhambra, Arcadia, El Monte, West Covina, Covina, Glendora, Whittier, San Marino",
  },
  {
    name: "Los Angeles & Westside",
    time: "35–50 Min",
    cities: "Silver Lake, Echo Park, Los Feliz, Beverly Hills, Santa Monica, Brentwood, DTLA, East LA, Culver City",
  },
  {
    name: "San Fernando Valley",
    time: "40–55 Min",
    cities: "Burbank, Glendale, Studio City, Sherman Oaks, Encino, Woodland Hills",
  },
  {
    name: "Orange County",
    time: "35–55 Min",
    cities: "Anaheim, Irvine, Fullerton, Orange, Huntington Beach, Costa Mesa, Garden Grove, Santa Ana, Newport Beach",
  },
  {
    name: "South Bay & Gateway Cities",
    time: "35–50 Min",
    cities: "Torrance, Long Beach, Downey, Norwalk, Lakewood, Cerritos, Manhattan Beach, Redondo Beach",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Plumber", "ContactPage"],
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: `${siteConfig.siteUrl}/contact`,
    telephone: "+1-626-506-6951",
    priceRange: "$$",
    description:
      "Licensed master plumbers providing same-day emergency plumbing, drain cleaning, water heaters, and sewer repairs across Southern California.",
    address: {
      "@type": "PostalAddress",
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
        closes: "20:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-626-506-6951",
      contactType: "customer service",
      areaServed: "Southern California",
      availableLanguage: ["English", "Spanish"],
    },
  };

  return (
    <div className="bg-slate-50 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-navy font-medium">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-navy font-bold">Contact JJJ Plumbing</span>
        </nav>

        {/* Page Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <MapPin className="size-3.5 text-brand-accent" />
            Southern California Central Dispatch Hub
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Contact JJJ Plumbing
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a plumbing emergency, burst pipe, backed-up drain, or water heater breakdown? Our licensed master plumbers are dispatched daily across 75+ Southern California communities with guaranteed upfront pricing.
          </p>
        </div>

        {/* 3 Primary Action Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {/* Action 1: Call Dispatch */}
          <div className="flex flex-col justify-between rounded-2xl border-2 border-brand-accent/40 bg-white p-6 shadow-md transition-all hover:border-brand-accent hover:shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-accent/20 text-brand-navy">
                  <Phone className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Dispatch
                </span>
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-brand-navy">
                Call 24/7 Dispatch Direct
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Connect directly with our master technician on duty. Immediate dispatch for active leaks and urgent clogs.
              </p>
            </div>
            <div className="mt-5">
              <a
                href={siteConfig.phoneHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-accent py-3 text-sm font-black text-brand-navy-dark shadow-xs hover:bg-sky-300 transition-all cursor-pointer"
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Action 2: Text Photo for $75 Voucher */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:border-brand-accent hover:shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700">
                  <MessageSquareText className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                  $75 Off Voucher
                </span>
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-brand-navy">
                Text a Photo of Your Issue
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Snap a picture of your leak, water heater tag, or drain. We review it instantly and apply $75 off your repair.
              </p>
            </div>
            <div className="mt-5">
              <a
                href={siteConfig.smsHref}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-navy bg-brand-navy py-3 text-sm font-bold text-white shadow-xs hover:bg-brand-navy-light transition-all cursor-pointer"
              >
                <MessageSquareText className="size-4 text-brand-accent" />
                Text Photo to Dispatch
              </a>
            </div>
          </div>

          {/* Action 3: Fast Online Quote */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-all hover:border-brand-accent hover:shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-blue/15 text-brand-blue">
                  <Clock className="size-5" />
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-900">
                  5-Min Response
                </span>
              </div>
              <h2 className="mt-4 text-lg font-extrabold text-brand-navy">
                Request Estimate Online
              </h2>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Fill out our simple form below. We confirm within 5 minutes and credit 100% of your diagnostic fee to the repair.
              </p>
            </div>
            <div className="mt-5">
              <a
                href="#estimate-form"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-3 text-sm font-bold text-brand-navy hover:bg-slate-200 transition-all cursor-pointer"
              >
                Go to Estimate Form ↓
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Core Section: Business Credentials & Form */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Official Business Credentials & Emergency Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Real Master Plumber & Service Truck Photo Card */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-slate-900 shadow-md aspect-[4/3] max-h-[310px]">
              <Image
                src="/work/master-plumber-truck.jpg"
                alt="JJJ Plumbing licensed master technician on call with company service truck"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={photoBlur["master-plumber-truck"]}
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 flex items-end justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    Direct Master Plumber Dispatch
                  </p>
                  <p className="text-[11px] text-slate-300 font-medium">
                    Owner-operated • 25 Years Serving SoCal
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                  CSLB #842875
                </span>
              </div>
            </div>

            {/* Business Verification Card (Crucial for GMB, Google Ads & Client Trust) */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    JJJ Plumbing Inc.
                  </h3>
                  <p className="text-xs text-slate-500">
                    Master Plumbing Contractor • Established 2001
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                  Active &amp; Insured
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-500">State License:</span>
                  <a
                    href={siteConfig.cslbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-brand-blue hover:underline flex items-center gap-1"
                  >
                    <span>{siteConfig.license} (Class C-36)</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-500">Liability Insurance:</span>
                  <span className="font-bold text-brand-navy text-right">
                    $5,000,000 Commercial Policy + Bonded
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-500">Operating Hours:</span>
                  <div className="text-right">
                    <p className="font-bold text-brand-navy">Mon–Sat: 8:00 AM – 8:00 PM</p>
                    <p className="text-[11px] font-semibold text-emerald-700">24/7 Emergency Dispatch Available</p>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-500">Bilingual Service:</span>
                  <span className="font-bold text-brand-navy text-right">
                    {siteConfig.bilingual}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="font-semibold text-slate-500">Google Guarantee:</span>
                  <span className="font-bold text-emerald-700 text-right">
                    Verified &amp; Backed up to $1,500
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-brand-navy flex items-center gap-1">
                  <Award className="size-4 text-amber-500" /> BBB A+ Accredited
                </span>
                <a
                  href={siteConfig.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-brand-blue hover:underline"
                >
                  4.9★ on Google (500+ Reviews) →
                </a>
              </div>
            </div>

            {/* Emergency Checklist Card */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
                <AlertTriangle className="size-5 text-amber-600 shrink-0" />
                <span>Active Leak? What to Do While Tech Is En Route</span>
              </div>
              <ol className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-amber-950/80 leading-relaxed list-decimal list-inside font-medium">
                <li>
                  <strong>Shut Off Water Supply:</strong> Turn your main shut-off valve clockwise until completely closed (typically by front hose bib or water meter).
                </li>
                <li>
                  <strong>Cut Power if Flooding:</strong> If water is near electrical outlets, baseboard heaters, or appliances, switch off breakers to that room immediately.
                </li>
                <li>
                  <strong>Turn Off Water Heater:</strong> For water heater leaks, shut the cold inlet valve on top and switch off power/gas control to avoid element burnout.
                </li>
                <li>
                  <strong>Avoid Running Faucets:</strong> Don&apos;t use other sinks, showers, or toilets to prevent backpressure until our master plumber arrives.
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: Lead / Estimate Form */}
          <div id="estimate-form" className="lg:col-span-7 scroll-mt-24">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="bg-brand-navy p-6 sm:p-8 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                    <Sparkles className="size-3 text-brand-accent" />
                    $75 Off Voucher Auto-Applied
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    5-Minute Callback Promise
                  </span>
                </div>
                <h3 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl">
                  Request a Free Estimate
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Fill out the details below. Our mobile dispatch will text you within 5 minutes with estimated arrival and upfront flat-rate options.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <LeadForm defaultCouponCode="JJJ-75OFF" />
              </div>
            </div>
          </div>
        </div>

        {/* Actual Live Interactive Coverage Map & Regional Dispatch */}
        <div className="mt-16 space-y-8">
          <CoverageMap />

          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b-2 border-brand-navy/10 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  Dispatch Overview
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight">
                  Regional Response Time Estimates
                </h3>
              </div>
              <Link
                href="/neighborhoods"
                className="text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1 shrink-0"
              >
                <span>Explore All 75+ Service Cities</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {dispatchRegions.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-slate-200 bg-white p-4.5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="font-black text-sm text-brand-navy">
                      {region.name}
                    </p>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shrink-0">
                      {region.time}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {region.cities}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700">
                  <span>✓ Same-Day Dispatch</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
