import type { Metadata } from "next";
import { neighborhoods } from "./neighborhood-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jjjplumbing.com"),
  title: "Plumber Neighborhoods Served — LA, OC & San Gabriel Valley | JJJ Plumbing",
  description:
    "JJJ Plumbing serves 50+ neighborhoods across Los Angeles, Orange County, and the San Gabriel Valley. Find your neighborhood and request a free estimate.",
};

const neighborhoodsByRegion = neighborhoods.reduce<Record<string, typeof neighborhoods>>((acc, n) => {
  if (!acc[n.region]) acc[n.region] = [];
  acc[n.region].push(n);
  return acc;
}, {});

export default function NeighborhoodsIndexPage() {
  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            Service Areas
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Neighborhoods We Serve
          </h1>
          <p className="mt-4 text-slate-600">
            From Beverly Hills to Anaheim, JJJ Plumbing covers 50+ neighborhoods
            across Los Angeles, Orange County, and the San Gabriel Valley with
            same-day emergency dispatch.
          </p>
        </div>

        {Object.entries(neighborhoodsByRegion).map(([region, hoods]) => (
          <div key={region} className="mt-12">
            <h2 className="text-2xl font-extrabold text-brand-navy">{region}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {hoods.map((hood) => (
                <a
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-accent/40 hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-brand-navy group-hover:text-brand-accent transition-colors">
                      {hood.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {hood.city} · {hood.focus}
                    </p>
                  </div>
                  <span className="text-brand-blue text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
                    View →
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
