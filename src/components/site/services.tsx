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
import { photoBlur } from "@/lib/photo-blur";

const iconMap: Record<string, LucideIcon> = {
  flame: Flame,
  waves: Waves,
  thermometer: Thermometer,
  route: Route,
  building2: Building2,
};

/**
 * Each card shows a photo of that actual service.
 * Slugs resolve to /public/work/<slug>-{640,1024,1920}.jpg
 */
const imageMap: Record<string, string> = {
  // technician on site with floor protection down
  "emergency-repairs": "tech-descaling-drain",
  // root mass pulled out of the line -- the result this service sells
  "drain-cleaning": "root-removal-drain-machine",
  // clean exterior Noritz with hot/cold service valves visible
  "water-heaters": "tankless-exterior-noritz",
  // 50 feet of commercial hospital main waste line piping + shielded no-hub couplings in an open trench
  "sewer-lines": "sewer-cast-iron-wye",
  // real commercial mechanical room, not a residential toilet
  "commercial": "commercial-mechanical-room",
};

export function Services() {
  return (
    <section id="services" className="bg-slate-50 py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            What We Do
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl text-balance break-words">
            Full-Service Plumbing Solutions
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
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
                <div className="relative h-56 w-full overflow-hidden rounded-t-2xl bg-slate-100 sm:h-52">
                  <Image
                    src={`/work/${imageMap[service.id]}-1024.jpg`}
                    alt={`${service.title} — JJJ Plumbing job photo`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={photoBlur[imageMap[service.id]]}
                    className="object-cover object-[center_35%] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
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
                    href="#service-areas"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:text-brand-accent transition-colors"
                  >
                    View coverage & service areas →
                  </a>
                </div>
              </div>
            );
          })}

          <a
            href="#estimate"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-accent/50 bg-brand-navy p-6 text-center text-white transition-all duration-200 hover:bg-brand-navy-light hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer group"
          >
            <p className="text-lg font-bold">Not sure what you need?</p>
            <p className="text-sm text-slate-300">
              Tell us what&apos;s going on and we&apos;ll recommend the right
              fix, upfront and in plain English.
            </p>
            <span className="mt-2 rounded-full bg-brand-accent px-5 py-2 text-sm font-bold text-brand-navy-dark shadow-sm transition-all duration-200 group-hover:bg-sky-300">
              Get a Free Estimate
            </span>
          </a>
        </div>

        {/* Major Brands Authority Strip */}
        <div className="mt-14 rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Authorized Service, Repair &amp; Installation For Major Brands
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
            {[
              "Noritz",
              "Navien",
              "Rinnai",
              "Bradford White",
              "Rheem",
              "Moen",
              "Kohler",
              "TOTO",
              "Delta",
              "American Standard",
            ].map((brand) => (
              <span
                key={brand}
                className="text-sm sm:text-base font-extrabold tracking-tight text-slate-500 transition-colors hover:text-brand-navy"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
