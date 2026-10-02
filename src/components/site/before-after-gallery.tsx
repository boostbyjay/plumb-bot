"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const jobs = [
  {
    id: "drain-cleaning",
    title: "Drain Cleaning & Hydro Jetting",
    city: "Los Angeles",
    before: "/jobs/job-09-drain-cable-debris.jpg",
    after: "/jobs/job-08-ridgid-setup.jpg",
    beforeAlt: "Drain cable removing tree roots and debris from sewer line",
    afterAlt: "Clean drain after professional hydro jetting and camera inspection",
  },
  {
    id: "water-heaters",
    title: "Water Heater Replacement",
    city: "Pasadena",
    before: "/jobs/job-04-noritz-garage.jpg",
    after: "/jobs/job-03-noritz-outdoor.jpg",
    beforeAlt: "Old water heater before replacement",
    afterAlt: "New Noritz tankless water heater installed outdoors",
  },
  {
    id: "sewer-lines",
    title: "Sewer Line Repair",
    city: "Glendale",
    before: "/jobs/job-05-trench.jpg",
    after: "/jobs/job-07-drain-cable.jpg",
    beforeAlt: "Excavated trench for sewer line replacement",
    afterAlt: "Completed sewer line repair with professional equipment",
  },
  {
    id: "emergency-repairs",
    title: "Slab Leak Repair",
    city: "West Covina",
    before: "/jobs/job-01-toilet-drain.jpg",
    after: "/jobs/job-02-noritz-indoor.jpg",
    beforeAlt: "Emergency plumbing setup with drain cleaning equipment",
    afterAlt: "Completed slab leak repair with new piping installation",
  },
  {
    id: "commercial",
    title: "Commercial Grease Trap Service",
    city: "Anaheim",
    before: "/jobs/job-01-toilet-drain.jpg",
    after: "/jobs/job-08-ridgid-setup.jpg",
    beforeAlt: "Restaurant plumbing setup before commercial service",
    afterAlt: "Commercial drain cleaning with professional RIDGID equipment",
  },
];

export function BeforeAfterGallery() {
  const [activeId, setActiveId] = useState(jobs[0].id);

  const active = jobs.find((j) => j.id === activeId) || jobs[0];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-blue">
            Our Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Before &amp; After
          </h2>
          <p className="mt-4 text-slate-600">
            Real results from real jobs across Los Angeles, Orange County, and
            the San Gabriel Valley.
          </p>
        </div>

        {/* Job type selector */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {jobs.map((job) => (
            <button
              key={job.id}
              type="button"
              onClick={() => setActiveId(job.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeId === job.id
                  ? "bg-brand-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {job.title}
              <span className="ml-1.5 text-xs opacity-70">— {job.city}</span>
            </button>
          ))}
        </div>

        {/* Before / After images */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <div className="relative aspect-video w-full">
              <Image
                src={active.before}
                alt={active.beforeAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                Before
              </span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-brand-accent/40 bg-slate-50">
            <div className="relative aspect-video w-full">
              <Image
                src={active.after}
                alt={active.afterAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-600">
                After
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#estimate"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-accent px-7 py-3 text-sm font-bold text-brand-navy-dark transition-colors hover:bg-sky-300"
          >
            Get a Free Estimate for This Job
          </a>
        </div>
      </div>
    </section>
  );
}
