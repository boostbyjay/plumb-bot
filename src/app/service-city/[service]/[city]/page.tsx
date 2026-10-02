import { Metadata } from "next";
import { services, serviceAreas, siteConfig } from "@/lib/site-config";
import { LeadForm } from "@/components/site/lead-form";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";

// Map service slugs to display names and long-tail keywords
const serviceConfig: Record<string, { label: string; keywords: string[] }> = {
  "emergency-repairs": {
    label: "Emergency Plumber",
    keywords: ["burst pipe", "flooding", "sewer backup", "24/7", "same-day"],
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

// Top 30 high-income cities
const highIncomeCities = [
  "Beverly Hills", "Bel Air", "Pacific Palisades", "Santa Monica",
  "Brentwood", "West Hollywood", "Palos Verdes", "Rancho Palos Verdes",
  "Rolling Hills", "Newport Beach", "Laguna Beach", "Manhattan Beach",
  "Redondo Beach", "El Segundo", "Irvine", "Pasadena", "San Marino",
  "South Pasadena", "Arcadia", "La Cañada Flintridge", "Sherman Oaks",
  "Studio City", "Encino", "Woodland Hills", "Torrance", "Long Beach",
  "Culver City", "Cerritos", "Lakewood", "West Covina",
];

export function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of services) {
    for (const city of highIncomeCities) {
      params.push({ service: service.id, city: city.toLowerCase().replace(/ /g, "-") });
    }
  }
  return params;
}

function getCityName(slug: string): string {
  return highIncomeCities.find(
    (c) => c.toLowerCase().replace(/ /g, "-") === slug
  ) || slug;
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
  const cityName = getCityName(city);
  
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
  const cityName = getCityName(city);
  const keywords = serviceConfig[service]?.keywords || [service];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand-accent">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-navy">{serviceName} in {cityName}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Left: Content */}
        <div className="lg:col-span-2">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            {cityName}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            {serviceName} in {cityName}
          </h1>
          <p className="mt-4 text-slate-600">
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
                Licensed & insured — CA LIC #{siteConfig.license.split("#")[1]}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                25+ years serving {cityName} and the {siteConfig.region}
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                Upfront pricing — you approve the cost before we start
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                Same-day emergency dispatch available
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
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-brand-navy p-8 text-white sm:p-10">
              <span className="text-sm font-bold uppercase tracking-wide text-brand-accent">
                Free Estimate
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Get a Fast, No-Obligation Quote
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                Fill out the form and our {cityName} dispatch team will call you back within 5 minutes
                during business hours to confirm details and schedule your visit.
              </p>
            </div>
            <div className="p-8 sm:p-10">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
