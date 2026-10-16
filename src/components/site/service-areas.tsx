"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceAreas, services, siteConfig, cityToSlug } from "@/lib/site-config";
import { neighborhoods } from "@/app/neighborhoods/neighborhood-data";

const PREVIEW_COUNT = 20;

export function ServiceAreas() {
  const [expanded, setExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState("emergency-repairs");
  const hiddenCities = serviceAreas.slice(PREVIEW_COUNT);
  const hasMore = hiddenCities.length > 0;

  return (
    <section id="service-areas" className="bg-white py-16 sm:py-24 scroll-mt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Where We Work • 65+ Local Cities
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Proudly Serving Los Angeles, Orange County &amp; the San Gabriel
            Valley
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Select your city below for local dispatch details, common neighborhood plumbing issues, and same-day scheduling.
          </p>
        </div>

        {/* Service Type Selector Tabs for SEO & User Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {services.map((s) => {
            const isActive = selectedService === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-brand-navy text-brand-accent shadow-sm"
                    : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-accent hover:text-brand-navy"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {serviceAreas.slice(0, PREVIEW_COUNT).map((city) => {
              const slug = cityToSlug(city);
              return (
                <Link
                  key={city}
                  href={`/service-city/${selectedService}/${slug}`}
                  className="group flex items-center justify-between gap-1.5 rounded-lg border border-transparent bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs transition-all hover:border-brand-accent/60 hover:bg-white hover:text-brand-navy hover:shadow-sm"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="size-3.5 shrink-0 text-brand-blue group-hover:text-brand-accent transition-colors" />
                    <span className="truncate">{city}</span>
                  </span>
                  <ArrowUpRight className="size-3 shrink-0 text-slate-300 group-hover:text-brand-blue transition-colors" />
                </Link>
              );
            })}
          </div>

          {hasMore && (
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: expanded ? hiddenCities.length * 44 + "px" : "0px",
                opacity: expanded ? 1 : 0,
              }}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {hiddenCities.map((city) => {
                  const slug = cityToSlug(city);
                  return (
                    <Link
                      key={city}
                      href={`/service-city/${selectedService}/${slug}`}
                      className="group flex items-center justify-between gap-1.5 rounded-lg border border-transparent bg-white/80 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 shadow-2xs transition-all hover:border-brand-accent/60 hover:bg-white hover:text-brand-navy hover:shadow-sm"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="size-3.5 shrink-0 text-brand-blue group-hover:text-brand-accent transition-colors" />
                        <span className="truncate">{city}</span>
                      </span>
                      <ArrowUpRight className="size-3 shrink-0 text-slate-300 group-hover:text-brand-blue transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setExpanded(!expanded)}
                className="border-slate-300 bg-white font-semibold text-brand-navy hover:bg-slate-100 hover:text-brand-navy cursor-pointer"
                aria-expanded={expanded}
              >
                {expanded
                  ? "Show Fewer Cities"
                  : `View All ${serviceAreas.length} Cities (${hiddenCities.length} more)`}
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                />
              </Button>
            </div>
          )}

          {/* Featured Neighborhoods Strip */}
          <div className="mt-8 border-t border-slate-200/80 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-brand-navy">
                Featured LA &amp; Valley Neighborhood Hubs
              </h3>
              <Link
                href="/neighborhoods"
                className="text-xs font-bold text-brand-blue hover:text-brand-navy transition-colors"
              >
                View All Neighborhoods →
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {neighborhoods.map((hood) => (
                <Link
                  key={hood.slug}
                  href={`/neighborhoods/${hood.slug}`}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition-all hover:border-brand-accent hover:bg-brand-accent/15 hover:text-brand-navy"
                >
                  {hood.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            size="lg"
            className="w-full sm:w-auto max-w-full bg-brand-navy px-5 sm:px-7 font-semibold text-white hover:bg-brand-navy-light text-center h-auto py-3 whitespace-normal transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            <Phone className="size-4 shrink-0" />
            <span>Ask if We Cover Your Area: {siteConfig.phone}</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
