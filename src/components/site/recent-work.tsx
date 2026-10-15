"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  Tag,
  Camera,
  AlertCircle,
  Wrench,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { photoBlur, photoDims } from "@/lib/photo-blur";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

type Job = {
  slug: string;
  title: string;
  city: string;
  category: string;
  turnaround: string;
  problem: string;
  solution: string;
  savings: string;
  alt: string;
};

const jobs: Job[] = [
  {
    slug: "hydrojetting-truck-rig",
    title: "Truck-Mounted Hydro Jetter (4,000 PSI)",
    city: "Los Angeles",
    category: "Drain & Sewer",
    turnaround: "Same-Day Dispatch (2 Hours)",
    problem:
      "Commercial restaurant main grease waste line was 90% obstructed, causing wastewater to back up into the kitchen floor sinks during peak lunch prep.",
    solution:
      "Dispatched our commercial 4,000 PSI @ 18 GPM hydro-jetting rig with rotating grease-penetrator nozzles to scour the line back to original pipe diameter.",
    savings:
      "Prevented health code closure and saved $3,500+ in potential inventory loss and water damage.",
    alt: "JJJ Plumbing truck-mounted hydro jetting rig, 4000 PSI at 18 GPM, on a job site",
  },
  {
    slug: "tech-descaling-drain",
    title: "Cast Iron Drain Descaling & Restoration",
    city: "Pasadena",
    category: "Trenchless Drain Cleaning",
    turnaround: "Completed in 3 Hours",
    problem:
      "Historic 1930s home suffered from chronic bathroom drain stoppages caused by 90 years of tuberculation and rust scale buildup in the original cast iron line.",
    solution:
      "Ran a high-speed RIDGID FlexShaft chain knocker with floor drop cloths down to safely strip rust scale without cracking the delicate aging pipe.",
    savings:
      "Restored 100% full flow and saved the homeowner over $8,000 by avoiding jackhammering the concrete foundation.",
    alt: "JJJ Plumbing technician running a RIDGID FlexShaft descaler with floor protection laid down",
  },
  {
    slug: "root-removal-drain-machine",
    title: "Heavy Tree Root Mass Extraction",
    city: "Glendale",
    category: "Sewer Repair",
    turnaround: "Same-Day Response",
    problem:
      "Mature ficus tree roots completely choked the main 4-inch sewer line, causing sewage to back up into bathtubs and ground-floor toilets.",
    solution:
      "Deployed heavy-duty sectional drain machines with hardened root-cutting blades to sever and pull the root mass, followed by an HD sewer camera inspection.",
    savings:
      "Restored drainage immediately with zero yard excavation, saving the homeowner $4,200 compared to full open-trench replacement.",
    alt: "Tree root mass removed from a sewer line with a sectional drain machine",
  },
  {
    slug: "sewer-cast-iron-wye",
    title: "50-Foot Commercial Hospital Main Waste Line Replacement",
    city: "Los Angeles",
    category: "Commercial Hospital Sewer",
    turnaround: "Rapid Commercial Turnaround",
    problem:
      "Over 50 linear feet of aging underground cast iron waste line failed beneath an active commercial hospital facility, risking severe bio-hazard backups, sanitary code violations, and emergency medical wing shutdowns.",
    solution:
      "Excavated open trench, extracted 50 feet of deteriorated main waste pipe, and precision-installed new heavy-duty cast iron wye junctions and heavy-gauge pipe assembled with seismic-rated shielded no-hub couplings to strict healthcare facility plumbing standards.",
    savings:
      "Maintained uninterrupted hospital operations with zero contamination or patient disruptions; passed stringent municipal healthcare plumbing code inspections on first walkthrough.",
    alt: "JJJ Plumbing replacement of 50 feet of commercial hospital main waste line piping with cast iron wyes and shielded no-hub couplings in open trench",
  },
  {
    slug: "commercial-mechanical-room",
    title: "Commercial Water Heating & Recirculation",
    city: "Anaheim",
    category: "Commercial Plumbing",
    turnaround: "Completed in 1 Day",
    problem:
      "Multi-tenant building had inconsistent hot water delivery on upper floors, causing tenant complaints and high gas bills from stagnant line heat loss.",
    solution:
      "Re-engineered copper distribution manifold, installed high-efficiency recirculation pump and thermostatic mixing valve on heavy unistrut framing.",
    savings:
      "Reduced hot water wait times from 4 minutes to 8 seconds; decreased commercial natural gas consumption by 22%.",
    alt: "Commercial water heater with thermostatic mixing valve, recirculation pump and strut-mounted copper",
  },
  {
    slug: "tankless-exterior-noritz",
    title: "High-Efficiency Tankless Water Heater Install",
    city: "Irvine",
    category: "Water Heaters",
    turnaround: "Same-Day Installation",
    problem:
      "Old 50-gallon tank ruptured and flooded garage; a busy family of 5 was left completely without hot water.",
    solution:
      "Hauled away the damaged tank and installed an exterior Noritz condensing tankless unit with dedicated service isolation valves for easy descaling.",
    savings:
      "Provided endless hot water, freed up 15 sq ft of garage space, and qualified the homeowner for a $1,000 SoCalGas energy rebate.",
    alt: "Noritz tankless water heater installed on an exterior wall with hot and cold service valves",
  },
  {
    slug: "water-heater-old-new",
    title: "Emergency Same-Day Water Heater Swap",
    city: "West Covina",
    category: "Emergency Repair",
    turnaround: "4 Hours from Call to Hot Water",
    problem:
      "12-year-old water heater tank failed on a Saturday morning, dumping water across laundry room subfloors.",
    solution:
      "JJJ emergency dispatch arrived with a new professional-grade Bradford White tank, new seismic earthquake strapping, and brass full-port ball valves.",
    savings:
      "Same-day emergency response with zero weekend price gouging; saved baseboards from permanent mold damage.",
    alt: "Failed water heater removed next to the new Bradford White unit staged for installation",
  },
  {
    slug: "moen-smart-shutoff",
    title: "Moen Flo Smart Water Shutoff Valve",
    city: "Beverly Hills",
    category: "Leak Prevention",
    turnaround: "2.5 Hours Installation",
    problem:
      "Homeowner wanted 24/7 catastrophe leak defense after a neighbor experienced a $120,000 second-floor pipe rupture while away on vacation.",
    solution:
      "Cut into the 1-inch main copper service riser, sweat-soldered brass unions, and installed the Moen Flo smart monitor with automated phone shutoff.",
    savings:
      "Detects micro-leaks down to one drop per minute; homeowner received an ongoing 15% discount on their annual property insurance premium.",
    alt: "Moen Flo smart water shutoff valve installed on the main line with new copper",
  },
  {
    slug: "pressure-regulator-install",
    title: "Main Pressure Reducing Valve (PRV) Install",
    city: "Santa Monica",
    category: "Pressure Protection",
    turnaround: "Completed in 2 Hours",
    problem:
      "Municipal water pressure spiked to an extreme 110 PSI, causing loud water hammer pipes, leaking fixture cartridges, and stress on water heater tank.",
    solution:
      "Installed a new lead-free brass Wilkins pressure reducing valve and high-flow hose bib, calibrating pressure to code-safe 65 PSI.",
    savings:
      "Prevented catastrophic pipe joint ruptures and fixture blowouts, extending household appliance lifespans by years.",
    alt: "New brass pressure reducing valve and hose bib on a copper main water service riser",
  },
  {
    slug: "shower-valve-rough-in",
    title: "Anti-Scald Shower Valve Replacement",
    city: "Long Beach",
    category: "Bathroom Plumbing",
    turnaround: "Completed in 3 Hours",
    problem:
      "Outdated two-handle shower valve was scalding family members whenever a toilet flushed or the washing machine filled.",
    solution:
      "Opened rear drywall access and sweat-soldered a modern pressure-balancing brass valve with copper supply risers, tested under full hydraulic pressure.",
    savings:
      "Eliminated scalding risks for young children; saved $2,000+ by using rear access instead of demolishing front decorative tile.",
    alt: "Brass pressure-balancing shower valve with new sweated copper supply and riser connections",
  },
  {
    slug: "custom-faucet",
    title: "Specialty Architectural Fixture Installation",
    city: "Newport Beach",
    category: "Custom Fixtures",
    turnaround: "Precision Installation",
    problem:
      "Imported unlacquered brass faucet was improperly seated by a handyman, leaking under custom marble and threatening water damage to vanity cabinetry.",
    solution:
      "Disassembled hardware, recut and aligned supply tubes, hand-fitted custom rubber seals, and torqued to manufacturer specification with zero finish marring.",
    savings:
      "Protected a $14,000 custom marble vanity and validated the manufacturer's lifetime mechanical warranty.",
    alt: "Polished brass bath and shower mixer with cross handles and handset riser installed",
  },
  {
    slug: "sewer-camera-inspection",
    title: "High-Definition Sewer Camera Diagnostic",
    city: "Torrance",
    category: "Diagnostic & Inspections",
    turnaround: "1 Hour On-Site",
    problem:
      "Prospective homebuyer needed to verify sewer condition before closing on a 1950s ranch home exhibiting slow drainage.",
    solution:
      "Pushed our self-leveling color camera with 512Hz locator sonde 85 feet to the municipal street connection, providing real-time HD video footage.",
    savings:
      "Uncovered cracked clay pipe section before escrow closed; buyer successfully negotiated a $7,500 repair credit from the seller.",
    alt: "Sewer camera inspection monitor and drain machines staged at an opened main line cleanout",
  },
];

export function RecentWork() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Track which card is centered
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
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? i : Math.min(jobs.length - 1, i + 1)));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const currentJob = lightbox !== null ? jobs[lightbox] : null;

  return (
    <section id="recent-work" className="bg-white border-t border-slate-200/80 py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Verified Case Studies
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Recent Jobs &amp; Proven Results
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Real photos, real emergencies, and real money saved across Los Angeles, Orange County, and the San Gabriel Valley. <strong>Tap any case study for details.</strong>
          </p>
        </div>
      </div>

      {/* Scroll rail: native momentum + snap, edge-to-edge on mobile */}
      <div
        ref={railRef}
        className="work-rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:mx-auto lg:max-w-7xl"
      >
        {jobs.map((job, i) => {
          return (
            <button
              key={job.slug}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`View case study: ${job.title} in ${job.city}`}
              className="work-card group relative aspect-[3/4] w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:w-[46vw] lg:w-[23rem]"
            >
              <Image
                src={`/work/${job.slug}-1024.jpg`}
                alt={job.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 23rem"
                placeholder="blur"
                blurDataURL={photoBlur[job.slug]}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* Top tag */}
              <div className="absolute left-3 top-3 z-10">
                <span className="rounded-full bg-brand-navy/85 backdrop-blur-sm px-2.5 py-1 text-[11px] font-bold text-brand-accent border border-brand-accent/30 shadow">
                  {job.category}
                </span>
              </div>

              {/* caption scrim */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-dark/95 via-brand-navy-dark/70 to-transparent p-4 pt-16">
                <p className="text-sm font-bold leading-snug text-white sm:text-base">
                  {job.title}
                </p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 font-medium text-brand-accent">
                    <MapPin className="size-3 shrink-0" />
                    {job.city}
                  </span>
                  <span className="rounded bg-white/20 px-1.5 py-0.5 font-semibold text-white">
                    Tap for Case Study →
                  </span>
                </div>
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
            className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-7 py-3 text-sm font-bold text-brand-navy-dark shadow-md transition-all duration-200 hover:bg-sky-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            <Tag className="size-4" />
            Claim $75 Voucher &amp; Get Estimate
          </a>
        </div>
      </div>

      {/* Interactive Case Study Pop-Out Modal */}
      {lightbox !== null && currentJob && (
        <div
          className="work-lightbox fixed inset-0 z-50 flex items-center justify-center bg-brand-navy-dark/90 p-3 sm:p-5 backdrop-blur-md"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={currentJob.title}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-3 top-3 sm:right-6 sm:top-6 z-20 inline-flex size-10 sm:size-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
          >
            <X className="size-5 sm:size-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative flex flex-col lg:grid lg:grid-cols-12 max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Job Photo */}
            <div className="relative h-56 sm:h-72 lg:h-full lg:col-span-5 shrink-0 bg-brand-navy">
              <Image
                src={`/work/${currentJob.slug}-1024.jpg`}
                alt={currentJob.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                placeholder="blur"
                blurDataURL={photoBlur[currentJob.slug]}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-transparent to-transparent lg:hidden" />
              
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                <span className="rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-bold text-brand-accent border border-brand-accent/30">
                  {currentJob.category}
                </span>
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-navy">
                  <MapPin className="inline size-3 mr-1 text-brand-blue" />
                  {currentJob.city}, CA
                </span>
              </div>
            </div>

            {/* Right: Rich Case Study Details */}
            <div className="flex flex-col justify-between overflow-y-auto p-5 sm:p-7 lg:col-span-7">
              <div>
                {/* Header */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Clock className="size-3.5 text-brand-blue" />
                  <span>Turnaround: {currentJob.turnaround}</span>
                </div>
                <h3 className="mt-1 text-xl sm:text-2xl font-black text-brand-navy leading-tight">
                  {currentJob.title}
                </h3>

                {/* 3 Steps: Problem -> Solution -> Savings */}
                <div className="mt-4 space-y-3">
                  {/* 1. Problem */}
                  <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                      <AlertCircle className="size-4 shrink-0" />
                      <span>The Emergency / Situation</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentJob.problem}
                    </p>
                  </div>

                  {/* 2. Solution */}
                  <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-800">
                      <Wrench className="size-4 shrink-0 text-brand-blue" />
                      <span>The Master Plumber Fix</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentJob.solution}
                    </p>
                  </div>

                  {/* 3. Savings */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <span>Customer Outcome &amp; Savings</span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                      {currentJob.savings}
                    </p>
                  </div>
                </div>
              </div>

              {/* Call-to-action footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
                <Button
                  render={<a href="#estimate" onClick={() => setLightbox(null)} />}
                  nativeButton={false}
                  size="default"
                  className="flex-1 bg-brand-accent py-2.5 text-xs sm:text-sm font-bold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  <Tag className="size-4 mr-1.5" />
                  Claim $75 Voucher For Similar Fix
                </Button>

                <Button
                  render={<a href={siteConfig.smsHref} />}
                  nativeButton={false}
                  size="default"
                  variant="outline"
                  className="border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Camera className="size-4 mr-1.5 text-brand-blue" />
                  Text Photo
                </Button>
              </div>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                *Valid on repairs $300+. Limit one voucher per customer.
              </p>
            </div>
          </div>

          {/* Prev/Next arrows on desktop */}
          {lightbox > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(lightbox - 1);
              }}
              aria-label="Previous case study"
              className="absolute left-2 inline-flex size-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 sm:left-5"
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
              aria-label="Next case study"
              className="absolute right-2 inline-flex size-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 sm:right-5"
            >
              <ChevronRight className="size-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
