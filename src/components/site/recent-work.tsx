"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { photoBlur, photoDims } from "@/lib/photo-blur";

type Job = {
  slug: string;
  title: string;
  city: string;
  alt: string;
};

/**
 * Honest single-photo gallery: every entry is one real job photo.
 * No fabricated before/after pairings.
 */
const jobs: Job[] = [
  {
    slug: "hydrojetting-truck-rig",
    title: "Truck-Mounted Hydro Jetter",
    city: "Los Angeles",
    alt: "JJJ Plumbing truck-mounted hydro jetting rig, 4000 PSI at 18 GPM, on a residential job",
  },
  {
    slug: "tech-descaling-drain",
    title: "Drain Descaling & Clog Removal",
    city: "Pasadena",
    alt: "JJJ Plumbing technician running a RIDGID FlexShaft descaler with floor protection laid down",
  },
  {
    slug: "root-removal-drain-machine",
    title: "Root Intrusion Cleared",
    city: "Glendale",
    alt: "Tree root mass removed from a sewer line with a sectional drain machine",
  },
  {
    slug: "sewer-cast-iron-wye",
    title: "Main Waste Line Replacement",
    city: "Los Angeles",
    alt: "Cast iron main waste line wye assembled with shielded no-hub couplings in an open trench",
  },
  {
    slug: "commercial-mechanical-room",
    title: "Commercial Water Heater & Recirculation",
    city: "Anaheim",
    alt: "Commercial water heater with thermostatic mixing valve, recirculation pump and strut-mounted copper",
  },
  {
    slug: "tankless-exterior-noritz",
    title: "Tankless Water Heater Install",
    city: "Irvine",
    alt: "Noritz tankless water heater installed on an exterior wall with hot and cold service valves",
  },
  {
    slug: "water-heater-old-new",
    title: "Same-Day Water Heater Swap",
    city: "West Covina",
    alt: "Failed water heater removed next to the new Bradford White unit staged for installation",
  },
  {
    slug: "moen-smart-shutoff",
    title: "Smart Shutoff Valve",
    city: "Beverly Hills",
    alt: "Moen Flo smart water shutoff valve installed on the main line with new copper",
  },
  {
    slug: "pressure-regulator-install",
    title: "Pressure Regulator Replacement",
    city: "Santa Monica",
    alt: "New brass pressure reducing valve and hose bib on a copper main water service riser",
  },
  {
    slug: "shower-valve-rough-in",
    title: "Shower Valve Replacement",
    city: "Long Beach",
    alt: "Brass pressure-balancing shower valve with new sweated copper supply and riser connections",
  },
  {
    slug: "custom-faucet",
    title: "Custom Fixture Installation",
    city: "Newport Beach",
    alt: "Polished brass bath and shower mixer with cross handles and handset riser installed",
  },
  {
    slug: "sewer-camera-inspection",
    title: "Sewer Camera Inspection",
    city: "Torrance",
    alt: "Sewer camera inspection monitor and drain machines staged at an opened main line cleanout",
  },
];

function srcSet(slug: string) {
  return [640, 1024, 1920].map((w) => `/work/${slug}-${w}.jpg ${w}w`).join(", ");
}

export function RecentWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Track which card is centered so the dots + arrows stay in sync.
  // Uses scroll position only -- no layout thrash, no per-frame JS animation.
  const syncPosition = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);

    const center = scrollLeft + clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(rail.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    syncPosition();
    // passive listener keeps the scroll on the compositor thread
    rail.addEventListener("scroll", syncPosition, { passive: true });
    window.addEventListener("resize", syncPosition);
    return () => {
      rail.removeEventListener("scroll", syncPosition);
      window.removeEventListener("resize", syncPosition);
    };
  }, [syncPosition]);

  const scrollToCard = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children[index] as HTMLElement | undefined;
    if (!el) return;
    rail.scrollTo({
      left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const nudge = useCallback(
    (dir: 1 | -1) => scrollToCard(Math.min(jobs.length - 1, Math.max(0, active + dir))),
    [active, scrollToCard]
  );

  // Lightbox keyboard controls + scroll lock
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : Math.min(jobs.length - 1, i + 1)));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <section id="recent-work" className="bg-white py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            Our Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Recent Jobs
          </h2>
          <p className="mt-4 text-slate-600">
            Real photos from real jobs across Los Angeles, Orange County, and the
            San Gabriel Valley. Swipe to see more.
          </p>
        </div>
      </div>

      {/* Scroll rail: native momentum + snap, edge-to-edge on mobile */}
      <div
        ref={railRef}
        className="work-rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:mx-auto lg:max-w-7xl"
      >
        {jobs.map((job, i) => {
          const dims = photoDims[job.slug];
          return (
            <button
              key={job.slug}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View ${job.title} in ${job.city}`}
              className="work-card group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition-shadow hover:shadow-xl sm:w-[46vw] lg:w-[23rem]"
            >
              <Image
                src={`/work/${job.slug}-1024.jpg`}
                alt={job.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 23rem"
                placeholder="blur"
                blurDataURL={photoBlur[job.slug]}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                {...(dims ? {} : {})}
              />
              {/* caption scrim */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark/95 via-brand-navy-dark/55 to-transparent p-4 pt-14">
                <p className="text-sm font-bold leading-snug text-white sm:text-base">
                  {job.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-brand-accent">
                  <MapPin className="size-3 shrink-0" />
                  {job.city}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Controls: dots on mobile, arrows from sm up */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Previous job"
            className="hidden size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-sm transition-all hover:border-brand-accent hover:text-brand-blue disabled:opacity-30 sm:inline-flex"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Job photos">
            {jobs.map((job, i) => (
              <button
                key={job.slug}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${job.title}`}
                aria-selected={i === active}
                role="tab"
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  i === active
                    ? "w-6 bg-brand-accent"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Next job"
            className="hidden size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy shadow-sm transition-all hover:border-brand-accent hover:text-brand-blue disabled:opacity-30 sm:inline-flex"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-7 py-3 text-sm font-bold text-brand-navy-dark transition-colors hover:bg-sky-300"
          >
            Get a Free Estimate
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="work-lightbox fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-dark/95 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={jobs[lightbox].title}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="size-6" />
          </button>

          <figure
            className="work-lightbox-panel relative max-h-full w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-brand-navy">
              <Image
                src={`/work/${jobs[lightbox].slug}-1920.jpg`}
                alt={jobs[lightbox].alt}
                fill
                sizes="(max-width: 768px) 92vw, 28rem"
                placeholder="blur"
                blurDataURL={photoBlur[jobs[lightbox].slug]}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <p className="text-lg font-bold text-white">{jobs[lightbox].title}</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-brand-accent">
                <MapPin className="size-3.5" />
                {jobs[lightbox].city}
              </p>
            </figcaption>
          </figure>

          {lightbox > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              aria-label="Previous photo"
              className="absolute left-2 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}
          {lightbox < jobs.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox + 1);
              }}
              aria-label="Next photo"
              className="absolute right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
