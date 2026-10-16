import { Metadata } from "next";
import { services, serviceAreas, siteConfig, cityToSlug, slugToCity } from "@/lib/site-config";
import { LeadForm } from "@/components/site/lead-form";
import { Phone, MapPin, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

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

function getLongTailTitle(serviceId: string, cityName: string): string {
  const config = serviceConfig[serviceId];
  if (!config) return `${serviceId} in ${cityName} | JJJ Plumbing`;
  const keyword = config.keywords[0];
  return `${config.label} ${cityName} — ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} | JJJ Plumbing`;
}

function getLongTailDescription(serviceId: string, cityName: string): string {
  const config = serviceConfig[serviceId];
  const serviceLabel = config?.label || serviceId;
  const keyword = config?.keywords[0] || "plumbing";
  
  const templates = [
    `Need a ${serviceLabel.toLowerCase()} in ${cityName}? JJJ Plumbing handles ${keyword}, same-day service, and upfront pricing. Licensed (CA LIC #842875), insured, and serving ${cityName} for 25+ years. Call (626) 506-6951.`,
    `${cityName} homeowners trust JJJ Plumbing for ${serviceLabel.toLowerCase()} — from ${keyword} to full installations. Same-day dispatch, upfront pricing, 100% guarantee. Call (626) 506-6951 for a free estimate.`,
    `Looking for ${keyword} in ${cityName}? JJJ Plumbing's licensed technicians deliver ${serviceLabel.toLowerCase()} with upfront pricing and same-day service. 25+ years serving ${cityName}. Call (626) 506-6951.`,
  ];
  
  // Use consistent hash to pick template based on city+service
  const hash = (cityName + serviceId).split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
  return templates[Math.abs(hash) % templates.length];
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; city: string }> }): Promise<Metadata> {
  const { service, city } = await params;
  const cityName = slugToCity(city);
  
  return {
    title: getLongTailTitle(service, cityName),
    description: getLongTailDescription(service, cityName),
    alternates: {
      canonical: `${siteConfig.siteUrl}/service-city/${service}/${city}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ service: string; city: string }> }) {
  const { service, city } = await params;
  const serviceName = serviceConfig[service]?.label || service;
  const cityName = slugToCity(city);
  const keywords = serviceConfig[service]?.keywords || [service];

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
      url: pageUrl,
      telephone: "+1-626-506-6951",
      priceRange: "$$",
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/#service-areas" className="hover:text-brand-accent">Service Areas</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-navy font-semibold">{serviceName} in {cityName}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Left: Content */}
        <div className="lg:col-span-2">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            {cityName}, CA
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {serviceName} in {cityName}
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            JJJ Plumbing provides professional {serviceName.toLowerCase()} services to {cityName} and
            surrounding areas. With 25+ years of experience and CA LIC #{siteConfig.license.split("#")[1]},
            our licensed technicians deliver quality workmanship, upfront pricing, and guaranteed
            results on every job.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Prefer to talk now?
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-2 flex items-center gap-2 text-lg font-bold text-brand-accent hover:text-sky-200"
            >
              <Phone className="size-5" />
              {siteConfig.phone}
            </a>
            <p className="mt-1 text-xs text-slate-400">
              {siteConfig.hours.emergency}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-brand-navy">Why {cityName} Homeowners Choose JJJ Plumbing</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                Licensed &amp; insured — CA LIC #{siteConfig.license.split("#")[1]}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                25+ years serving {cityName} and {siteConfig.region}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                Upfront pricing — you approve the cost before we start
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                Same-day emergency dispatch available in {cityName}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                100% satisfaction guarantee on every job
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-brand-navy">What to Expect</h2>
            <p className="mt-3 text-sm text-slate-600">
              When you call JJJ Plumbing for {serviceName.toLowerCase()} in {cityName}, you&apos;ll speak
              directly with our dispatch team. We&apos;ll gather the details of your situation, provide
              a clear upfront estimate, and schedule a visit at a time that works for you. Our
              technicians arrive in uniform, treat your property with respect, and complete the
              job cleanly and correctly.
            </p>
          </div>

          {/* City-specific tips */}
          <div className="mt-8 rounded-2xl border border-brand-accent/20 bg-sky-50/50 p-6">
            <h3 className="text-lg font-bold text-brand-navy">
              Common {serviceName} Issues in {cityName}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {keywords.slice(0, 3).map((kw) => (
                <li key={kw} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-accent" />
                  {kw.charAt(0).toUpperCase() + kw.slice(1)} — {cityName}&apos;s aging infrastructure and
                  {cityName === "Beverly Hills" || cityName === "Bel Air" || cityName === "Pacific Palisades"
                    ? " mature tree systems"
                    : cityName === "Irvine" || cityName === "Newport Beach" || cityName === "Laguna Beach"
                    ? " coastal climate"
                    : cityName === "Pasadena" || cityName === "Arcadia" || cityName === "San Marino"
                    ? " historic homes and hard water"
                    : " established neighborhoods"}
                  {" "}make professional service essential.
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Form */}
        <div id="estimate" className="lg:col-span-3 scroll-mt-28">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-brand-navy p-8 text-white sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold uppercase tracking-wide text-brand-accent">
                  Free Estimate
                </span>
                <a
                  href="#specials"
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3 py-1 text-xs font-bold text-brand-accent transition-all duration-200 hover:bg-brand-accent hover:text-brand-navy-dark hover:-translate-y-0.5 cursor-pointer"
                >
                  View Web Specials →
                </a>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Get a Fast, No-Obligation Quote
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                Fill out the form and our {cityName} dispatch team will text you within 5 minutes
                to confirm details and schedule your visit.
              </p>
            </div>
            <div className="p-8 sm:p-10">
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
