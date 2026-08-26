import { Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const commercialOfferings = [
  {
    title: "Grease Trap Service",
    description:
      "Scheduled pumping, cleaning, and maintenance to keep restaurants and food service properties compliant.",
  },
  {
    title: "Backflow Testing & Certification",
    description:
      "Annual backflow prevention testing and certification for offices, retail, and multi-tenant buildings.",
  },
  {
    title: "Multi-Unit Property Maintenance",
    description:
      "Ongoing plumbing maintenance contracts for apartment complexes, HOAs, and commercial property managers.",
  },
  {
    title: "Tenant Improvement & Repiping",
    description:
      "Plumbing for build-outs, tenant improvements, and full commercial repiping projects.",
  },
];

export function Commercial() {
  return (
    <section id="commercial" className="bg-brand-navy py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-accent">
            <Building2 className="size-3.5" />
            Commercial Plumbing
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Reliable Plumbing Partners for Local Businesses
          </h2>
          <p className="mt-4 max-w-xl text-slate-300">
            Restaurants, retail centers, offices, and multi-unit properties
            across the San Gabriel Valley and LA County trust JJJ Plumbing to
            keep operations running with minimal downtime and clear,
            predictable pricing.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href="#estimate" />}
              nativeButton={false}
              size="lg"
              className="bg-brand-accent px-7 font-bold text-brand-navy-dark hover:bg-sky-300"
            >
              Request Commercial Service
            </Button>
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              Call {siteConfig.phone}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {commercialOfferings.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <CheckCircle2 className="size-5 text-brand-accent" />
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
