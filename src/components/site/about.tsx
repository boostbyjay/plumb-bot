import { Award, HardHat, MapPin, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { icon: Award, value: "25 Years", label: "In Business" },
  { icon: MapPin, value: "50+ Cities", label: "Across LA, OC & the SGV" },
  { icon: Wrench, value: "100%", label: "Satisfaction Guaranteed" },
  { icon: HardHat, value: "Licensed", label: siteConfig.license },
];

export function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
              About JJJ Plumbing
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              25 Years of Honest, Reliable Plumbing
            </h2>
            <p className="mt-5 text-slate-600">
              {siteConfig.legalName} has been the trusted name in residential
              and commercial plumbing across Los Angeles, Orange County, and the
              San Gabriel Valley for a quarter-century. What started as a small,
              family-run operation has grown into a full-service plumbing
              company &mdash; but our commitment to honest pricing, quality
              workmanship, and treating every customer&apos;s home or business
              like our own hasn&apos;t changed.
            </p>
            <p className="mt-4 text-slate-600">
              Today, our team of licensed, background-checked technicians
              handles everything from same-day emergency repairs to full
              commercial plumbing contracts, all backed by a 100%
              satisfaction guarantee.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
              >
                <Icon className="mx-auto size-7 text-brand-blue" />
                <p className="mt-3 text-2xl font-extrabold text-brand-navy">
                  {value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
