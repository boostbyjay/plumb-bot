"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  CheckCircle2,
  Phone,
  MessageSquareText,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Layers,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { neighborhoods } from "@/app/neighborhoods/neighborhood-data";

type RegionDef = {
  id: string;
  name: string;
  dispatchTime: string;
  description: string;
  bbox: string; // [minLng, minLat, maxLng, maxLat]
  marker: string; // lat,lng
  color: string;
  badgeBg: string;
};

const REGIONS: RegionDef[] = [
  {
    id: "all",
    name: "All SoCal Coverage",
    dispatchTime: "25–55 Min Average",
    description: "Complete Southern California master plumbing coverage across 75+ cities.",
    bbox: "-118.68%2C33.58%2C-117.70%2C34.38",
    marker: "34.0961%2C-118.1058",
    color: "bg-brand-navy text-white",
    badgeBg: "bg-brand-navy/10 text-brand-navy border-brand-navy/20",
  },
  {
    id: "sgv",
    name: "San Gabriel Valley",
    dispatchTime: "25–40 Min Priority",
    description: "Fastest dispatch response with dedicated emergency units stationed daily.",
    bbox: "-118.25%2C33.98%2C-117.75%2C34.22",
    marker: "34.0961%2C-118.1058",
    color: "bg-emerald-700 text-white",
    badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "la",
    name: "Los Angeles & Westside",
    dispatchTime: "35–50 Min Dispatch",
    description: "Serving DTLA, Silver Lake, Echo Park, Beverly Hills, Santa Monica and Westside homes.",
    bbox: "-118.55%2C33.95%2C-118.20%2C34.15",
    marker: "34.0522%2C-118.2437",
    color: "bg-blue-700 text-white",
    badgeBg: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "oc",
    name: "Orange County",
    dispatchTime: "35–55 Min Dispatch",
    description: "Anaheim, Irvine, Fullerton, Orange, Huntington Beach, Newport Beach & coastal OC.",
    bbox: "-118.15%2C33.58%2C-117.70%2C33.92",
    marker: "33.8366%2C-117.9143",
    color: "bg-amber-700 text-white",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
  },
  {
    id: "sfv",
    name: "San Fernando Valley",
    dispatchTime: "40–55 Min Dispatch",
    description: "Glendale, Burbank, Studio City, Sherman Oaks, Encino and Woodland Hills.",
    bbox: "-118.68%2C34.12%2C-118.25%2C34.32",
    marker: "34.1808%2C-118.3090",
    color: "bg-purple-700 text-white",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "southbay",
    name: "South Bay & Gateway Cities",
    dispatchTime: "35–50 Min Dispatch",
    description: "Torrance, Long Beach, Downey, Norwalk, Lakewood, Cerritos and beach cities.",
    bbox: "-118.45%2C33.72%2C-118.05%2C33.95",
    marker: "33.8358%2C-118.3406",
    color: "bg-cyan-800 text-white",
    badgeBg: "bg-cyan-100 text-cyan-900 border-cyan-300",
  },
];

// Map zip code prefixes / common zips to city/region for instant lookup
const POPULAR_ZIPS: Record<string, { city: string; region: string; time: string }> = {
  "91776": { city: "San Gabriel", region: "San Gabriel Valley", time: "25–35 Min" },
  "91775": { city: "San Gabriel", region: "San Gabriel Valley", time: "25–35 Min" },
  "91801": { city: "Alhambra", region: "San Gabriel Valley", time: "25–35 Min" },
  "91803": { city: "Alhambra", region: "San Gabriel Valley", time: "25–35 Min" },
  "91101": { city: "Pasadena", region: "San Gabriel Valley", time: "25–40 Min" },
  "91103": { city: "Pasadena", region: "San Gabriel Valley", time: "25–40 Min" },
  "91105": { city: "Pasadena", region: "San Gabriel Valley", time: "25–40 Min" },
  "91106": { city: "Pasadena", region: "San Gabriel Valley", time: "25–40 Min" },
  "91107": { city: "Pasadena", region: "San Gabriel Valley", time: "25–40 Min" },
  "91030": { city: "South Pasadena", region: "San Gabriel Valley", time: "25–35 Min" },
  "91108": { city: "San Marino", region: "San Gabriel Valley", time: "25–35 Min" },
  "91006": { city: "Arcadia", region: "San Gabriel Valley", time: "25–40 Min" },
  "91007": { city: "Arcadia", region: "San Gabriel Valley", time: "25–40 Min" },
  "91754": { city: "Monterey Park", region: "San Gabriel Valley", time: "25–40 Min" },
  "91780": { city: "Temple City", region: "San Gabriel Valley", time: "25–35 Min" },
  "91770": { city: "Rosemead", region: "San Gabriel Valley", time: "25–35 Min" },
  "91731": { city: "El Monte", region: "San Gabriel Valley", time: "25–40 Min" },
  "91732": { city: "El Monte", region: "San Gabriel Valley", time: "25–40 Min" },
  "91790": { city: "West Covina", region: "San Gabriel Valley", time: "30–45 Min" },
  "91722": { city: "Covina", region: "San Gabriel Valley", time: "30–45 Min" },
  "91740": { city: "Glendora", region: "San Gabriel Valley", time: "35–45 Min" },
  "90601": { city: "Whittier", region: "San Gabriel Valley", time: "30–45 Min" },
  "90210": { city: "Beverly Hills", region: "Los Angeles & Westside", time: "35–50 Min" },
  "90401": { city: "Santa Monica", region: "Los Angeles & Westside", time: "40–55 Min" },
  "90026": { city: "Echo Park / Silver Lake", region: "Los Angeles", time: "30–45 Min" },
  "90012": { city: "Downtown Los Angeles", region: "Los Angeles", time: "30–45 Min" },
  "90232": { city: "Culver City", region: "Los Angeles & Westside", time: "35–50 Min" },
  "91201": { city: "Glendale", region: "San Fernando Valley", time: "30–45 Min" },
  "91501": { city: "Burbank", region: "San Fernando Valley", time: "35–50 Min" },
  "91604": { city: "Studio City", region: "San Fernando Valley", time: "40–55 Min" },
  "91403": { city: "Sherman Oaks", region: "San Fernando Valley", time: "40–55 Min" },
  "92801": { city: "Anaheim", region: "Orange County", time: "35–50 Min" },
  "92602": { city: "Irvine", region: "Orange County", time: "40–55 Min" },
  "92831": { city: "Fullerton", region: "Orange County", time: "30–45 Min" },
  "92866": { city: "Orange", region: "Orange County", time: "35–50 Min" },
  "92646": { city: "Huntington Beach", region: "Orange County", time: "40–55 Min" },
  "92660": { city: "Newport Beach", region: "Orange County", time: "45–55 Min" },
  "90501": { city: "Torrance", region: "South Bay", time: "35–50 Min" },
  "90802": { city: "Long Beach", region: "South Bay", time: "35–50 Min" },
  "90241": { city: "Downey", region: "Gateway Cities", time: "30–45 Min" },
  "90650": { city: "Norwalk", region: "Gateway Cities", time: "30–45 Min" },
  "90712": { city: "Lakewood", region: "South Bay", time: "35–50 Min" },
  "90703": { city: "Cerritos", region: "Gateway Cities", time: "30–45 Min" },
  "90266": { city: "Manhattan Beach", region: "South Bay", time: "40–55 Min" },
  "90277": { city: "Redondo Beach", region: "South Bay", time: "40–55 Min" },
};

export function CoverageMap() {
  const [activeRegionId, setActiveRegionId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFeedback, setSearchFeedback] = useState<{
    found: boolean;
    city: string;
    region: string;
    time: string;
  } | null>(null);

  const activeRegion = useMemo(() => {
    return REGIONS.find((r) => r.id === activeRegionId) || REGIONS[0];
  }, [activeRegionId]);

  // Filter neighborhoods based on the active region
  const filteredNeighborhoods = useMemo(() => {
    if (activeRegionId === "all") return neighborhoods;
    if (activeRegionId === "sgv")
      return neighborhoods.filter((n) => n.region === "San Gabriel Valley");
    if (activeRegionId === "la")
      return neighborhoods.filter((n) => n.region === "Los Angeles");
    if (activeRegionId === "oc")
      return neighborhoods.filter((n) => n.region === "Orange County");
    if (activeRegionId === "sfv")
      return neighborhoods.filter((n) => n.region === "San Fernando Valley");
    if (activeRegionId === "southbay")
      return neighborhoods.filter(
        (n) => n.region === "South Bay & Gateway Cities"
      );
    return neighborhoods;
  }, [activeRegionId]);

  // Handle ZIP / City search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchFeedback(null);
      return;
    }

    // 1. Direct zip code match
    if (POPULAR_ZIPS[query]) {
      const match = POPULAR_ZIPS[query];
      setSearchFeedback({
        found: true,
        city: match.city,
        region: match.region,
        time: match.time,
      });
      return;
    }

    // 2. City name match in neighborhoods database
    const matchedHood = neighborhoods.find(
      (n) =>
        n.name.toLowerCase().includes(query) ||
        n.city.toLowerCase().includes(query)
    );

    if (matchedHood) {
      let time = "35–50 Min";
      if (matchedHood.region === "San Gabriel Valley") time = "25–40 Min";
      if (matchedHood.region === "Orange County") time = "35–55 Min";
      if (matchedHood.region === "San Fernando Valley") time = "40–55 Min";

      setSearchFeedback({
        found: true,
        city: matchedHood.name,
        region: matchedHood.region,
        time,
      });
      return;
    }

    // 3. Fallback: Southern California general coverage
    if (
      query.startsWith("9") ||
      query.includes("ca") ||
      query.includes("california")
    ) {
      setSearchFeedback({
        found: true,
        city: searchQuery.trim(),
        region: "Southern California Service Area",
        time: "Same-Day Emergency Dispatch",
      });
      return;
    }

    setSearchFeedback({
      found: false,
      city: searchQuery.trim(),
      region: "Contact our dispatch directly to confirm coverage",
      time: "Call (626) 506-6951",
    });
  };

  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${activeRegion.bbox}&layer=mapnik&marker=${activeRegion.marker}`;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
      {/* Header & Subtitle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
            <Layers className="size-3.5 text-brand-accent" />
            Interactive Southern California Coverage Map
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            JJJ Plumbing Dispatch Map &amp; Service Zones
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Select a region below to zoom in on arrival times, or enter your ZIP code to verify same-day master plumber dispatch.
          </p>
        </div>

        {/* External Google Maps Button */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=JJJ+Plumbing+Inc+San+Gabriel+CA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-brand-navy hover:bg-slate-100 transition-all shadow-2xs self-start lg:self-auto cursor-pointer"
        >
          <MapPin className="size-4 text-rose-500" />
          <span>Open in Google Maps</span>
          <ExternalLink className="size-3.5 text-slate-400" />
        </a>
      </div>

      {/* ZIP Code / City Checker Form */}
      <div className="mt-6 rounded-2xl border border-brand-accent/40 bg-gradient-to-r from-sky-50/70 via-white to-blue-50/50 p-4 sm:p-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Check your ZIP code or City (e.g. 91776, Pasadena, Anaheim, Glendale...)"
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-navy px-5 py-2.5 text-xs sm:text-sm font-black text-white hover:bg-brand-navy-light transition-all shadow-xs shrink-0 cursor-pointer"
          >
            Check Coverage
          </button>
        </form>

        {/* Search Result Feedback */}
        {searchFeedback && (
          <div
            className={`mt-3.5 rounded-xl border p-3.5 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              searchFeedback.found
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-amber-200 bg-amber-50 text-amber-950"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {searchFeedback.found ? (
                <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <MapPin className="size-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-extrabold">
                  {searchFeedback.found
                    ? `✓ In Coverage Zone: ${searchFeedback.city} (${searchFeedback.region})`
                    : `Checking coverage for "${searchFeedback.city}"`}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {searchFeedback.found
                    ? `Average emergency dispatch arrival: ${searchFeedback.time}. Master plumbers available today.`
                    : searchFeedback.region}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-800 transition-all cursor-pointer shadow-2xs"
              >
                <Phone className="size-3.5" />
                Call {siteConfig.phone}
              </a>
              <a
                href={siteConfig.smsHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-navy-light transition-all cursor-pointer shadow-2xs"
              >
                <MessageSquareText className="size-3.5 text-brand-accent" />
                Claim $75 Voucher
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Regional Selector Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {REGIONS.map((region) => {
          const isActive = region.id === activeRegionId;
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => {
                setActiveRegionId(region.id);
                setSearchFeedback(null);
              }}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-navy text-brand-accent shadow-xs scale-102"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-brand-accent hover:text-brand-navy"
              }`}
            >
              {region.name}
            </button>
          );
        })}
      </div>

      {/* Active Region Highlights Bar */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-4 py-2 text-xs border border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-brand-navy">{activeRegion.name}:</span>
          <span className="text-slate-600">{activeRegion.description}</span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
          <Clock className="size-3" />
          {activeRegion.dispatchTime}
        </span>
      </div>

      {/* Actual Live Interactive Map Embed */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-inner bg-slate-100">
        <iframe
          title={`Coverage Map - ${activeRegion.name}`}
          src={mapSrc}
          className="w-full h-[360px] sm:h-[460px] border-0"
          loading="lazy"
        />

        {/* Floating Map Legend Overlay */}
        <div className="absolute top-3 left-3 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs p-3 shadow-md text-xs max-w-[240px] hidden sm:block">
          <div className="flex items-center gap-1.5 font-black text-brand-navy">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span>JJJ Plumbing Dispatch Zone</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 leading-tight">
            Active service perimeter with 75+ covered communities.
          </p>
          <div className="mt-2.5 space-y-1 text-[10px] text-slate-600 font-semibold border-t border-slate-100 pt-2">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>San Gabriel Valley (25–40 min)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-500" />
              <span>Los Angeles &amp; Westside (35–50 min)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" />
              <span>Orange County (35–55 min)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-purple-500" />
              <span>San Fernando Valley (40–55 min)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-cyan-600" />
              <span>South Bay &amp; Gateway (35–50 min)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Covered Cities in Selected Region */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Cities in this Zone ({filteredNeighborhoods.length})
          </p>
          <Link
            href="/neighborhoods"
            className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
          >
            <span>View All 75+ City Hubs</span>
            <ChevronRight className="size-3" />
          </Link>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {filteredNeighborhoods.map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-accent hover:bg-white hover:text-brand-navy transition-all"
            >
              <MapPin className="size-2.5 text-brand-blue" />
              <span>{n.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
