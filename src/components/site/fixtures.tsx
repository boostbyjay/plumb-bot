import Image from "next/image";
import { Droplets, Gauge, ShowerHead, Waves } from "lucide-react";
import { photoBlur } from "@/lib/photo-blur";

const fixtures = [
  {
    slug: "moen-smart-shutoff",
    icon: Droplets,
    title: "Smart Shutoff & Leak Detection",
    description:
      "Automatic water shutoff valves that detect a leak and close the main before it floods your home. Monitored from your phone.",
    alt: "Moen Flo smart water shutoff valve installed on a main water line with new copper",
  },
  {
    slug: "pressure-regulator-install",
    icon: Gauge,
    title: "Pressure Regulators",
    description:
      "High water pressure quietly destroys fixtures, water heaters, and pipe joints. We install and set regulators to protect the whole system.",
    alt: "New brass pressure reducing valve installed on a copper main water service riser",
  },
  {
    slug: "shower-valve-rough-in",
    icon: ShowerHead,
    title: "Shower & Tub Valves",
    description:
      "Pressure-balancing and thermostatic valve replacement, including in-wall access and trim. No more scalding when a tap turns on.",
    alt: "Brass pressure-balancing shower valve with new sweated copper supply connections",
  },
  {
    slug: "custom-faucet",
    icon: Waves,
    title: "Faucets & Custom Fixtures",
    description:
      "Supply and installation of kitchen, bath, and specialty fixtures, including period and high-end hardware fitted properly the first time.",
    alt: "Polished brass bath and shower mixer with cross handles installed on a marble deck",
  },
];

export function Fixtures() {
  return (
    <section id="fixtures" className="bg-white border-t border-slate-200/60 py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Fixtures &amp; Valves
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Protect Your Home and Upgrade What You Touch Daily
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            The valves behind your walls decide whether a small leak stays small.
            The fixtures in front of them are what you use every day. We handle
            both.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {fixtures.map(({ slug, icon: Icon, title, description, alt }) => (
            <div
              key={slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-accent/50 hover:shadow-xl sm:flex-row"
            >
              <div className="relative h-56 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-40">
                <Image
                  src={`/work/${slug}-640.jpg`}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 10rem"
                  placeholder="blur"
                  blurDataURL={photoBlur[slug]}
                  className="object-cover object-[center_40%] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div className="flex flex-col p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-white transition-colors group-hover:bg-brand-accent group-hover:text-brand-navy-dark">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-navy">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy-light"
          >
            Ask About a Fixture or Valve Upgrade
          </a>
        </div>
      </div>
    </section>
  );
}
