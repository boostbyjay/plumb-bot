import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  MapPin,
  Wrench,
  ArrowRight,
  Star,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Camera,
  HelpCircle,
} from "lucide-react";
import { services, serviceAreas, testimonials, siteConfig, cityToSlug, slugToCity } from "@/lib/site-config";
import { getCityProfile, serviceDeepContent } from "@/lib/city-seo-data";
import { photoBlur } from "@/lib/photo-blur";
import { LeadForm } from "@/components/site/lead-form";

// Map service slugs to display names and long-tail keywords
const serviceConfig: Record<string, { label: string; keywords: string[] }> = {
  "emergency-repairs": {
    label: "Emergency Plumber",
    keywords: ["burst pipe", "flooding", "sewer backup", "slab leak", "same-day"],
  },
  "drain-cleaning": {
    label: "Drain Cleaning",
    keywords: ["clogged drain", "hydro jetting", "root intrusion", "slow drain"],
  },
  "water-heaters": {
    label: "Water Heater",
    keywords: ["no hot water", "tankless", "water heater repair", "installation"],
  },
  "sewer-lines": {
    label: "Sewer Line",
    keywords: ["sewer line repair", "trenchless", "CIPP lining", "main line"],
  },
  "commercial": {
    label: "Commercial Plumber",
    keywords: ["grease trap", "backflow testing", "multi-unit", "HOA"],
  },
};

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of services) {
    for (const city of serviceAreas) {
      params.push({ service: service.id, city: cityToSlug(city) });
    }
  }
  return params;
}

function getHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getLongTailTitle(serviceId: string, cityName: string): string {
  const config = serviceConfig[serviceId];
  if (!config) return `${serviceId} in ${cityName} | JJJ Plumbing`;
  const keyword = config.keywords[0];
  return `${config.label} ${cityName} — ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} & Same-Day Service | JJJ Plumbing`;
}

function getLongTailDescription(serviceId: string, cityName: string): string {
  const config = serviceConfig[serviceId];
  const serviceLabel = config?.label || serviceId;
  const keyword = config?.keywords[0] || "plumbing";
  const profile = getCityProfile(cityName);

  const templates = [
    `Need a licensed ${serviceLabel.toLowerCase()} in ${cityName}? JJJ Plumbing handles ${keyword}, upfront flat-rate pricing, and same-day dispatch across ${profile.regionName}. CA LIC #842875. Call (626) 506-6951.`,
    `${cityName} homeowners trust JJJ Plumbing for ${serviceLabel.toLowerCase()} — from ${keyword} to full installations. 100% diagnostic fee credited toward repair. Serving ${cityName} for 25+ years. Call (626) 506-6951.`,
    `Looking for ${keyword} or ${serviceLabel.toLowerCase()} service in ${cityName}? Master-plumber diagnostics, upfront pricing, and 5-minute text confirmation. Call (626) 506-6951.`,
  ];

  const hash = getHash(cityName + serviceId);
  return templates[hash % templates.length];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const cityName = slugToCity(city);
  const deep = serviceDeepContent[service] || serviceDeepContent["emergency-repairs"];
  const title = getLongTailTitle(service, cityName);
  const description = getLongTailDescription(service, cityName);
  const url = `${siteConfig.siteUrl}/service-city/${service}/${city}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `${siteConfig.siteUrl}/work/${deep.heroPhoto}-1024.jpg`,
          width: 1024,
          height: 768,
          alt: `${deep.label} in ${cityName} — JJJ Plumbing`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const serviceName = serviceConfig[service]?.label || service;
  const cityName = slugToCity(city);
  const profile = getCityProfile(cityName);
  const deep = serviceDeepContent[service] || serviceDeepContent["emergency-repairs"];
  const variant = getHash(cityName + service);

  const uniqueIntro = deep.buildUniqueIntro(cityName, profile, variant);
  const techSection = deep.buildTechnicalSection(cityName, profile, variant);
  const cityFaqs = deep.buildFaqs(cityName, profile);

  // Pick 2 verified testimonials deterministically for this city page
  const pageReviews = [
    testimonials[variant % testimonials.length],
    testimonials[(variant + 2) % testimonials.length],
  ];

  // Pick 12 nearby/related cities for strong internal linking
  const currentIdx = Math.max(0, serviceAreas.findIndex((c) => cityToSlug(c) === city));
  const nearbyCities: string[] = [];
  for (let offset = 1; offset <= 12; offset++) {
    const candidate = serviceAreas[(currentIdx + offset) % serviceAreas.length];
    if (candidate && cityToSlug(candidate) !== city) {
      nearbyCities.push(candidate);
    }
  }

  const pageUrl = `${siteConfig.siteUrl}/service-city/${service}/${city}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Plumber",
      "@id": `${pageUrl}#plumber`,
      name: `${siteConfig.name} — ${serviceName} in ${cityName}`,
      image: `${siteConfig.siteUrl}/work/${deep.heroPhoto}-1024.jpg`,
      url: pageUrl,
      telephone: "+1-626-506-6951",
      priceRange: "$$",
      availableLanguage: ["English", "Spanish"],
      areaServed: {
        "@type": "City",
        name: cityName,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: String(testimonials.length),
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: cityFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Service Areas",
          item: `${siteConfig.siteUrl}/#service-areas`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${serviceName} in ${cityName}`,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-5 text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-1.5">
        <Link href="/" className="hover:text-brand-blue">Home</Link>
        <span>/</span>
        <Link href="/#service-areas" className="hover:text-brand-blue">Service Areas</Link>
        <span>/</span>
        <span className="text-brand-navy font-semibold">{serviceName} in {cityName}</span>
      </nav>

      {/* Top Trust Strip */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <a
          href={siteConfig.social.google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
        >
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span>4.9 / 5.0 Rated on Google</span>
        </a>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Same-Day Dispatch in {cityName}</span>
        </span>

        <a
          href={siteConfig.cslbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-brand-navy hover:border-brand-blue transition-colors"
        >
          <ShieldCheck className="size-3.5 text-brand-blue" />
          <span>Verified {siteConfig.license} ↗</span>
        </a>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 items-start">
        {/* Left 7 Cols: Unique City + Service Authority Content */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              {cityName}, CA • {profile.regionName}
            </span>
            <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-[2.6rem] leading-tight">
              {serviceName} in {cityName}, CA
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              {uniqueIntro}
            </p>
          </div>

          {/* Service-Matched Special Offer Callout Banner */}
          <div className="rounded-2xl border-2 border-dashed border-brand-accent bg-gradient-to-r from-brand-navy to-brand-navy-dark p-5 text-white shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-brand-accent px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-navy-dark">
                  {deep.couponBadge} • {cityName} Special
                </span>
                <p className="mt-1.5 text-xl sm:text-2xl font-black text-white">
                  {deep.couponOffer}
                </p>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-lg">
                  {deep.couponDesc}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href="#specials"
                  data-specials-trigger="true"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-accent px-4 py-2.5 text-xs font-extrabold text-brand-navy-dark shadow-sm transition-all duration-200 hover:bg-sky-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Tag className="size-3.5" />
                  View All Web Specials
                </a>
                <span className="text-[10px] text-center font-mono text-slate-300">
                  Promo Code: <strong>{deep.couponCode}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Real Job Photo + Local Infrastructure Profile */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-60 sm:h-72 w-full bg-slate-100">
              <Image
                src={`/work/${deep.heroPhoto}-1024.jpg`}
                alt={`${deep.heroPhotoAlt} in ${cityName}`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                placeholder="blur"
                blurDataURL={photoBlur[deep.heroPhoto]}
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-brand-navy/90 backdrop-blur-sm px-3.5 py-2 text-xs text-white">
                <span className="font-bold text-brand-accent">
                  ✓ Actual JJJ Plumbing Field Work
                </span>
                <span className="text-slate-200">
                  100% Diagnostic Fee Credited to Repair
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-extrabold text-brand-navy">
                {techSection.heading}
              </h2>
              {techSection.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="mt-5 pt-5 border-t border-slate-100">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-blue">
                  Professional Equipment &amp; Materials We Bring to {cityName}:
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-slate-700">
                  {deep.equipmentUsed.map((eq) => (
                    <li key={eq} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 3-Step Local Process */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy">
              How Our {cityName} {serviceName} Service Works
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {deep.processSteps.map((step, idx) => (
                <div key={step.title} className="rounded-xl border border-slate-200/80 bg-white p-4">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-navy text-xs font-black text-brand-accent">
                    {idx + 1}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-brand-navy leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Customer Reviews */}
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-brand-navy">
              What Southern California Homeowners Say About JJJ Plumbing
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {pageReviews.map((rev) => (
                <div
                  key={rev.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                  <p className="mt-3 text-xs font-bold text-brand-navy">
                    — {rev.name}, <span className="font-normal text-slate-500">{rev.location}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* City-Specific FAQs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-brand-navy">
              <HelpCircle className="size-5 text-brand-blue shrink-0" />
              Frequently Asked Questions — {serviceName} in {cityName}
            </h2>
            <div className="mt-4 divide-y divide-slate-100">
              {cityFaqs.map((faq) => (
                <div key={faq.question} className="py-3.5 first:pt-0 last:pb-0">
                  <h3 className="text-sm sm:text-base font-bold text-brand-navy">
                    {faq.question}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Sticky Estimate Form */}
        <div id="estimate" className="lg:col-span-5 lg:sticky lg:top-24 scroll-mt-24">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-brand-navy p-5 sm:p-7 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Dispatch Active • 5-Min Text Reply
                </span>
                <a
                  href="#specials"
                  data-specials-trigger="true"
                  className="inline-flex items-center gap-1 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-brand-accent transition-all hover:bg-brand-accent hover:text-brand-navy-dark cursor-pointer"
                >
                  View Specials →
                </a>
              </div>
              <h2 className="mt-2.5 text-xl font-extrabold sm:text-2xl">
                Request {cityName} Dispatch
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-snug">
                Fill out the form below — our {cityName} dispatch team texts you within 5 minutes with upfront pricing.
              </p>

              <div className="mt-3.5 grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-extrabold text-brand-accent hover:bg-white/10 transition-colors"
                >
                  <Phone className="size-3.5 shrink-0" />
                  {siteConfig.phone}
                </a>
                <a
                  href={siteConfig.smsHref}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-3 py-2 text-xs font-extrabold text-white hover:bg-brand-accent/20 transition-colors"
                >
                  <Camera className="size-3.5 shrink-0 text-brand-accent" />
                  Text Us a Photo
                </a>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>

      {/* Internal SEO Link Hub: Other Services in Same City + Nearby Cities */}
      <div className="mt-16 border-t border-slate-200 pt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-brand-navy">
            <Wrench className="size-5 text-brand-blue" />
            All Plumbing Services in {cityName}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Explore our dedicated {cityName} plumbing solutions:
          </p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {services.map((s) => {
              const isCurrent = s.id === service;
              const label = serviceConfig[s.id]?.label || s.title;
              return (
                <Link
                  key={s.id}
                  href={`/service-city/${s.id}/${city}`}
                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isCurrent
                      ? "border-brand-blue bg-brand-blue/10 text-brand-navy"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-accent hover:text-brand-navy hover:shadow-sm"
                  }`}
                >
                  <span>{label} in {cityName}</span>
                  <ArrowRight className="size-3.5 text-brand-blue shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-brand-navy">
            <MapPin className="size-5 text-brand-blue" />
            Nearby Cities for {serviceName}
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Same-day {serviceName.toLowerCase()} dispatch across surrounding communities:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {nearbyCities.map((nearCity) => (
              <Link
                key={nearCity}
                href={`/service-city/${service}/${cityToSlug(nearCity)}`}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-brand-accent hover:bg-brand-accent/15 hover:text-brand-navy"
              >
                <MapPin className="size-3 text-brand-blue" />
                {serviceName} in {nearCity}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
