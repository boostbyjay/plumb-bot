import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  Flame,
  Route,
  Thermometer,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/site-config";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  waves: Waves,
  thermometer: Thermometer,
  route: Route,
  building2: Building2,
};

const imageMap: Record<string, string> = {
  "emergency-repairs": "/jobs/job-08-ridgid-setup.jpg",
  "drain-cleaning": "/jobs/job-07-drain-cable.jpg",
  "water-heaters": "/jobs/job-03-noritz-outdoor.jpg",
  "sewer-lines": "/jobs/job-05-trench.jpg",
  "commercial": "/jobs/job-01-toilet-drain.jpg",
};

export function Services() {
  return (
    <section id="services" className="bg-slate-50 py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            What We Do
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Full-Service Plumbing Solutions
          </h2>
          <p className="mt-4 text-slate-600">
            Whatever the plumbing problem, our licensed technicians have the
            tools and experience to fix it right the first time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                id={service.id === "commercial" ? undefined : service.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-xl"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <Image
                    src={imageMap[service.id] || "/services/emergency-repairs.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-brand-navy text-white transition-colors group-hover:bg-brand-accent group-hover:text-brand-navy-dark">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {service.description}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-blue" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/service-city/${service.id}/beverly-hills`}
                    className="mt-4 text-sm font-medium text-brand-blue hover:text-brand-accent transition-colors"
                  >
                    See service areas →
                  </a>
                </div>
              </div>
            );
          })}

          <a
            href="#estimate"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-accent/50 bg-brand-navy p-6 text-center text-white transition-colors hover:bg-brand-navy-light"
          >
            <p className="text-lg font-bold">Not sure what you need?</p>
            <p className="text-sm text-slate-300">
              Tell us what&apos;s going on and we&apos;ll recommend the right
              fix, upfront and in plain English.
            </p>
            <span className="mt-2 rounded-full bg-brand-accent px-5 py-2 text-sm font-bold text-brand-navy-dark">
              Get a Free Estimate
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
