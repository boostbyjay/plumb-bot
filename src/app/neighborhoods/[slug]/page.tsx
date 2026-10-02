import { Metadata } from "next";
import { notFound } from "next/navigation";
import { neighborhoods } from "../neighborhood-data";
import { Phone } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hood = neighborhoods.find((n) => n.slug === slug);
  if (!hood) return {};
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: `Plumber in ${hood.name} — ${hood.focus} | JJJ Plumbing`,
    description: `${hood.description} Call (626) 506-6951 for a free estimate from JJJ Plumbing, serving ${hood.name} and ${hood.city} for 25+ years.`,
    alternates: { canonical: `${siteConfig.siteUrl}/neighborhoods/${slug}` },
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hood = neighborhoods.find((n) => n.slug === slug);
  if (!hood) notFound();

  // Find 3 related neighborhoods in the same region
  const related = neighborhoods
    .filter((n) => n.region === hood.region && n.slug !== hood.slug)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500">
          <a href="/" className="hover:text-brand-accent">Home</a>
          <span className="mx-2">/</span>
          <a href="/neighborhoods" className="hover:text-brand-accent">Neighborhoods</a>
          <span className="mx-2">/</span>
          <span className="text-brand-navy">{hood.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: Content */}
          <div className="lg:col-span-2">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
              {hood.region}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              Plumber in {hood.name}
            </h1>
            <p className="mt-4 text-slate-600">{hood.description}</p>

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
              <h2 className="text-xl font-bold text-brand-navy">Why {hood.name} Homeowners Choose JJJ Plumbing</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                  Licensed & insured — CA LIC #{siteConfig.license.split("#")[1]}
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 size-5 shrink-0 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue text-xs font-bold">✓</span>
                  25+ years serving {hood.name} and the {siteConfig.region}
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

            {related.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-brand-navy">Nearby Neighborhoods</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {related.map((r) => (
                    <a
                      key={r.slug}
                      href={`/neighborhoods/${r.slug}`}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-brand-navy hover:bg-brand-accent hover:text-brand-navy-dark transition-colors"
                    >
                      {r.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
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
                  Fill out the form and our {hood.name} dispatch team will call you back within 5 minutes
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
    </div>
  );
}
