import Image from "next/image";
import { Award, HardHat, MapPin, Wrench } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { photoBlur } from "@/lib/photo-blur";

const stats = [
  { icon: Award, value: "25 Years", label: "In Business" },
  { icon: MapPin, value: "75+ Cities", label: "Across LA, OC & the SGV" },
  { icon: Wrench, value: "100%", label: "Satisfaction Guaranteed" },
  { icon: HardHat, value: "Licensed", label: `${siteConfig.license} • Verify ↗`, href: siteConfig.cslbUrl },
];

export function About() {
  return (
    <section id="about" className="bg-white py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              About JJJ Plumbing
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
              25 Years of Honest, Reliable Plumbing
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              {siteConfig.legalName} has been the trusted name in residential
              and commercial plumbing across Los Angeles, Orange County, and the
              San Gabriel Valley for a quarter-century. What started as a small,
              family-run operation has grown into a full-service plumbing
              company — but our commitment to honest pricing, quality
              workmanship, and treating every customer&apos;s home or business
              like our own hasn&apos;t changed.
            </p>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Today, our team of licensed, background-checked technicians
              handles everything from same-day emergency repairs to full
              commercial plumbing contracts, all backed by a 100%
              satisfaction guarantee.
            </p>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Every job is run by a master technician and owner-operator — so
              you get guaranteed quality work, up-to-code installations, and
              someone who actually cares about the result.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
              {stats.map(({ icon: Icon, value, label, href }) => {
                const content = (
                  <>
                    <Icon className="mx-auto size-7 text-brand-blue" />
                    <p className="mt-3 text-2xl font-extrabold text-brand-navy">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {label}
                    </p>
                  </>
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:border-brand-accent hover:bg-white hover:shadow-md"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-900 shadow-md">
              <Image
                src="/work/master-plumber-truck.jpg"
                alt="JJJ Plumbing master technician and owner-operator with company truck"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                placeholder="blur"
                blurDataURL={photoBlur["master-plumber-truck"]}
                className="object-cover object-[center_28%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 sm:p-5 flex items-end justify-between">
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    Master Plumber &amp; Owner-Operator
                  </p>
                  <p className="text-xs text-slate-300 font-medium">
                    Owner on-site for major repairs across LA, OC &amp; SGV
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-brand-navy/90 border border-brand-accent/40 px-3 py-1 text-xs font-bold text-brand-accent shadow-xs">
                  CSLB #842875
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-48 shadow-2xs">
                <Image
                  src="/work/hydrojetting-truck-rig-1024.jpg"
                  alt="JJJ Plumbing truck-mounted hydro jetter rated 4000 PSI at 18 GPM"
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  placeholder="blur"
                  blurDataURL={photoBlur["hydrojetting-truck-rig"]}
                  className="object-cover object-[center_42%]"
                />
              </div>
              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:h-48 shadow-2xs">
                <Image
                  src="/work/sewer-camera-inspection-640.jpg"
                  alt="Sewer camera inspection equipment staged at a main line cleanout"
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  placeholder="blur"
                  blurDataURL={photoBlur["sewer-camera-inspection"]}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
