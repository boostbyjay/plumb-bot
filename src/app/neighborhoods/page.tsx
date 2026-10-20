import type { Metadata } from "next";
import { neighborhoods } from "./neighborhood-data";
import { siteConfig } from "@/lib/site-config";
import { MapPin, Phone, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Plumbing Neighborhoods Served — All 75+ SoCal Areas | JJJ Plumbing",
  description:
    "JJJ Plumbing serves 75+ neighborhoods and cities across Los Angeles, San Gabriel Valley, Orange County, San Fernando Valley, and the South Bay. Same-day emergency dispatch.",
  alternates: { canonical: `${siteConfig.siteUrl}/neighborhoods` },
};

const REGION_ORDER = [
  "San Gabriel Valley",
  "Los Angeles",
  "San Fernando Valley",
  "Orange County",
  "South Bay & Gateway Cities",
] as const;

function regionToAnchor(region: string): string {
  return region.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const neighborhoodsByRegion = neighborhoods.reduce<Record<string, typeof neighborhoods>>((acc, n) => {
  if (!acc[n.region]) acc[n.region] = [];
  acc[n.region].push(n);
  return acc;
}, {});

export default function NeighborhoodsIndexPage() {
  const totalCount = neighborhoods.length;

  return (
    <div className="bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-xs sm:text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-navy font-medium">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-navy font-bold">Neighborhoods Served</span>
        </nav>

        {/* Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            <MapPin className="size-3.5" />
            Complete Southern California Coverage ({totalCount} Areas)
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-5xl">
            Neighborhoods We Serve
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From our primary San Gabriel Valley dispatch hub to Beverly Hills, Anaheim, and the South Bay coast, JJJ Plumbing provides fast, reliable same-day emergency dispatch across {totalCount}+ Southern California communities.
          </p>

          {/* Quick Stats Strip */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-brand-blue" /> Same-Day 45-Min Dispatch
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-emerald-600" /> Licensed CSLB #842875
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-amber-600" /> 5 Key SoCal Regions
            </span>
          </div>

          {/* Regional Quick Jump Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {REGION_ORDER.map((region) => {
              const count = (neighborhoodsByRegion[region] || []).length;
              if (count === 0) return null;
              return (
                <a
                  key={region}
                  href={`#${regionToAnchor(region)}`}
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-brand-navy shadow-2xs hover:border-brand-accent hover:bg-brand-accent/15 transition-all"
                >
                  {region} <span className="ml-1 text-slate-500 font-semibold">({count})</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Regional Sections */}
        <div className="mt-14 space-y-16">
          {REGION_ORDER.map((region) => {
            const hoods = neighborhoodsByRegion[region] || [];
            if (hoods.length === 0) return null;
            const anchorId = regionToAnchor(region);

            return (
              <section key={region} id={anchorId} className="scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b-2 border-brand-navy/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="size-3 rounded-full bg-brand-accent"></span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                      {region}
                    </h2>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full">
                    {hoods.length} Neighborhoods &amp; Cities Served
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {hoods.map((hood) => (
                    <Link
                      key={hood.slug}
                      href={`/neighborhoods/${hood.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-accent hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-extrabold text-base text-brand-navy group-hover:text-brand-blue transition-colors">
                            {hood.name}
                          </p>
                          <span className="inline-flex items-center gap-0.5 text-brand-blue text-xs font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
                            View <ArrowRight className="size-3" />
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-semibold text-brand-blue line-clamp-1">
                          {hood.focus}
                        </p>
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {hood.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="truncate">{hood.city}, CA</span>
                        <span className="text-emerald-700 font-bold shrink-0">✓ Fast Dispatch</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Coverage Assurance Card */}
        <div className="mt-16 rounded-2xl border border-brand-navy/10 bg-brand-navy p-8 sm:p-10 text-white text-center shadow-lg">
          <span className="inline-block rounded-full bg-brand-accent px-3 py-1 text-xs font-black uppercase tracking-wider text-brand-navy-dark">
            Need Service Outside These Areas?
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
            We Dispatch Throughout Los Angeles, Orange County &amp; SGV
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-base text-slate-300">
            Even if your specific pocket isn’t named above, our mobile service trucks are dispatched across Southern California daily. Call our master dispatch team to confirm immediate availability.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-6 py-3 text-sm font-black text-brand-navy-dark shadow-md hover:bg-sky-300 transition-all cursor-pointer"
            >
              <Phone className="size-4" />
              Call Dispatch: {siteConfig.phone}
            </a>
            <a
              href="/#estimate"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              Get Free Online Estimate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
