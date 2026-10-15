"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceAreas, siteConfig } from "@/lib/site-config";

const PREVIEW_COUNT = 10;

export function ServiceAreas() {
  const [expanded, setExpanded] = useState(false);
  const hiddenCities = serviceAreas.slice(PREVIEW_COUNT);
  const hasMore = hiddenCities.length > 0;

  return (
    <section id="service-areas" className="bg-white py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Where We Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Proudly Serving Los Angeles, Orange County &amp; the San Gabriel
            Valley
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Don&apos;t see your city listed? Give us a call &mdash; there&apos;s
            a good chance we cover your area too.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {serviceAreas.slice(0, PREVIEW_COUNT).map((city) => (
              <div
                key={city}
                className="flex items-center gap-2 text-sm text-slate-700"
              >
                <MapPin className="size-4 shrink-0 text-brand-blue" />
                {city}
              </div>
            ))}
          </div>

          {hasMore && (
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: expanded ? hiddenCities.length * 28 + "px" : "0px",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {hiddenCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <MapPin className="size-4 shrink-0 text-brand-blue" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setExpanded(!expanded)}
                className="border-slate-300 bg-white font-semibold text-brand-navy hover:bg-slate-100 hover:text-brand-navy"
                aria-expanded={expanded}
              >
                {expanded
                  ? "Show Less"
                  : `View More Service Areas (${hiddenCities.length} more)`}
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            size="lg"
            className="w-full sm:w-auto max-w-full bg-brand-navy px-5 sm:px-7 font-semibold text-white hover:bg-brand-navy-light text-center h-auto py-3 whitespace-normal"
          >
            <Phone className="size-4 shrink-0" />
            <span>Ask if We Cover Your Area: {siteConfig.phone}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
