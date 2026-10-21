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
  ChevronRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { neighborhoods } from "@/app/neighborhoods/neighborhood-data";

type RegionDef = {
  id: string;
  name: string;
  dispatchTime: string;
  description: string;
  color: string;
  accentBg: string;
  textColor: string;
  borderColor: string;
  bbox: string;
  marker: string;
  hubs: string[];
};

const REGIONS: RegionDef[] = [
  {
    id: "all",
    name: "All SoCal Coverage",
    dispatchTime: "25–55 Min Average",
    description: "Complete master plumbing dispatch across 75+ cities in 5 Southern California regions.",
    color: "fill-brand-navy/15 stroke-brand-navy/60",
    accentBg: "bg-brand-navy text-white",
    textColor: "text-brand-navy",
    borderColor: "border-brand-navy/20",
    bbox: "-118.68%2C33.58%2C-117.70%2C34.38",
    marker: "34.0961%2C-118.1058",
    hubs: ["San Gabriel Valley", "Los Angeles & Westside", "Orange County", "San Fernando Valley", "South Bay"],
  },
  {
    id: "sgv",
    name: "San Gabriel Valley",
    dispatchTime: "25–40 Min Priority",
    description: "Fastest dispatch response with master plumbing units stationed throughout the valley daily.",
    color: "fill-emerald-500/20 stroke-emerald-600",
    accentBg: "bg-emerald-600 text-white",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-300",
    bbox: "-118.25%2C33.98%2C-117.75%2C34.22",
    marker: "34.0961%2C-118.1058",
    hubs: ["Pasadena", "Alhambra", "San Gabriel", "Arcadia", "West Covina", "Glendora", "Whittier"],
  },
  {
    id: "la",
    name: "Los Angeles & Westside",
    dispatchTime: "35–50 Min Dispatch",
    description: "Emergency repairs, drain clearing, and tankless upgrades across LA and the Westside.",
    color: "fill-blue-500/20 stroke-blue-600",
    accentBg: "bg-blue-600 text-white",
    textColor: "text-blue-700",
    borderColor: "border-blue-300",
    bbox: "-118.55%2C33.95%2C-118.20%2C34.15",
    marker: "34.0522%2C-118.2437",
    hubs: ["DTLA", "Silver Lake", "Echo Park", "Beverly Hills", "Santa Monica", "Culver City"],
  },
  {
    id: "oc",
    name: "Orange County",
    dispatchTime: "35–55 Min Dispatch",
    description: "Same-day residential and commercial hydro-jetting, water heaters, and pipe repair in OC.",
    color: "fill-amber-500/20 stroke-amber-600",
    accentBg: "bg-amber-600 text-white",
    textColor: "text-amber-800",
    borderColor: "border-amber-300",
    bbox: "-118.15%2C33.58%2C-117.70%2C33.92",
    marker: "33.8366%2C-117.9143",
    hubs: ["Anaheim", "Irvine", "Fullerton", "Orange", "Huntington Beach", "Newport Beach"],
  },
  {
    id: "sfv",
    name: "San Fernando Valley",
    dispatchTime: "40–55 Min Dispatch",
    description: "Licensed master plumbers serving valley homeowners with guaranteed upfront flat rates.",
    color: "fill-purple-500/20 stroke-purple-600",
    accentBg: "bg-purple-600 text-white",
    textColor: "text-purple-700",
    borderColor: "border-purple-300",
    bbox: "-118.68%2C34.12%2C-118.25%2C34.32",
    marker: "34.1808%2C-118.3090",
    hubs: ["Glendale", "Burbank", "Studio City", "Sherman Oaks", "Encino", "Woodland Hills"],
  },
  {
    id: "southbay",
    name: "South Bay & Gateway Cities",
    dispatchTime: "35–50 Min Dispatch",
    description: "Prompt mobile response for sewer lines, water heaters, and slab leaks across the South Bay.",
    color: "fill-cyan-500/20 stroke-cyan-600",
    accentBg: "bg-cyan-700 text-white",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-300",
    bbox: "-118.45%2C33.72%2C-118.05%2C33.95",
    marker: "33.8358%2C-118.3406",
    hubs: ["Torrance", "Long Beach", "Downey", "Norwalk", "Lakewood", "Cerritos"],
  },
];

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
  const [loadInteractiveMap, setLoadInteractiveMap] = useState<boolean>(false);
  const [searchFeedback, setSearchFeedback] = useState<{
    found: boolean;
    city: string;
    region: string;
    time: string;
  } | null>(null);

  const activeRegion = useMemo(() => {
    return REGIONS.find((r) => r.id === activeRegionId) || REGIONS[0];
  }, [activeRegionId]);

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
      return neighborhoods.filter((n) => n.region === "South Bay & Gateway Cities");
    return neighborhoods;
  }, [activeRegionId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSearchFeedback(null);
      return;
    }

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

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
      {/* Header & Subtitle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
            <Layers className="size-3.5 text-brand-accent" />
            Live Dispatch Radar • Southern California
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            JJJ Plumbing Service Areas &amp; Dispatch Zones
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Select a region below or enter your ZIP code for instant arrival estimates and same-day master plumber dispatch.
          </p>
        </div>

        {/* Action Button: Google Maps */}
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
                    ? `Average emergency dispatch arrival: ${searchFeedback.time}. Master plumbers on duty today.`
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

      {/* Lightweight, High-Performance Interactive Vector Coverage Map */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-950 p-6 text-white shadow-inner">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 grid gap-6 md:grid-cols-12 items-center">
          {/* Left Column: Visual Vector Dispatch Diagram */}
          <div className="md:col-span-7 flex flex-col items-center justify-center">
            <svg
              viewBox="0 0 500 360"
              className="w-full max-w-[460px] h-auto drop-shadow-md select-none"
              aria-label="Southern California Plumbing Service Zones"
            >
              <defs>
                <radialGradient id="pulseGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B1E38" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#071224" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Pacific Coastline & Ocean Basin */}
              <path
                d="M 20 60 Q 60 160 140 220 Q 220 280 270 340 L 20 340 Z"
                fill="url(#oceanGrad)"
                stroke="#1E3A8A"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.7"
              />
              <text x="50" y="260" fill="#38BDF8" fontSize="11" opacity="0.4" fontStyle="italic" letterSpacing="2">
                PACIFIC OCEAN
              </text>

              {/* Region 1: San Fernando Valley (NW) */}
              <g
                onClick={() => setActiveRegionId("sfv")}
                className="cursor-pointer transition-all duration-200 group"
              >
                <rect
                  x="70"
                  y="45"
                  width="130"
                  height="75"
                  rx="14"
                  className={
                    activeRegionId === "sfv" || activeRegionId === "all"
                      ? "fill-purple-500/25 stroke-purple-400 stroke-2"
                      : "fill-white/5 stroke-white/20 stroke-1 hover:fill-purple-500/15"
                  }
                />
                <text x="135" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  San Fernando Valley
                </text>
                <text x="135" y="96" textAnchor="middle" fill="#E9D5FF" fontSize="9.5">
                  Glendale • Burbank • Encino
                </text>
                <circle cx="170" cy="62" r="3" fill="#A855F7" />
              </g>

              {/* Region 2: San Gabriel Valley (NE / Primary Dispatch Hub) */}
              <g
                onClick={() => setActiveRegionId("sgv")}
                className="cursor-pointer transition-all duration-200 group"
              >
                <rect
                  x="215"
                  y="55"
                  width="170"
                  height="95"
                  rx="14"
                  className={
                    activeRegionId === "sgv" || activeRegionId === "all"
                      ? "fill-emerald-500/30 stroke-emerald-400 stroke-2"
                      : "fill-white/5 stroke-white/20 stroke-1 hover:fill-emerald-500/15"
                  }
                />
                <text x="300" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">
                  San Gabriel Valley
                </text>
                <text x="300" y="108" textAnchor="middle" fill="#6EE7B7" fontSize="10">
                  San Gabriel • Pasadena • Alhambra
                </text>
                <text x="300" y="125" textAnchor="middle" fill="#A7F3D0" fontSize="9">
                  Arcadia • Covina • Whittier
                </text>
                {/* Central Dispatch Hub Ping */}
                <circle cx="280" cy="70" r="10" fill="url(#pulseGlow)" className="animate-pulse" />
                <circle cx="280" cy="70" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>

              {/* Region 3: Los Angeles & Westside (Central-West) */}
              <g
                onClick={() => setActiveRegionId("la")}
                className="cursor-pointer transition-all duration-200 group"
              >
                <rect
                  x="105"
                  y="135"
                  width="135"
                  height="80"
                  rx="14"
                  className={
                    activeRegionId === "la" || activeRegionId === "all"
                      ? "fill-blue-500/25 stroke-blue-400 stroke-2"
                      : "fill-white/5 stroke-white/20 stroke-1 hover:fill-blue-500/15"
                  }
                />
                <text x="172" y="168" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  Los Angeles &amp; Westside
                </text>
                <text x="172" y="186" textAnchor="middle" fill="#BAE6FD" fontSize="9.5">
                  DTLA • Beverly Hills
                </text>
                <text x="172" y="200" textAnchor="middle" fill="#93C5FD" fontSize="9">
                  Santa Monica • Culver City
                </text>
                <circle cx="150" cy="155" r="3" fill="#38BDF8" />
              </g>

              {/* Region 4: South Bay & Gateway Cities (SW Coast) */}
              <g
                onClick={() => setActiveRegionId("southbay")}
                className="cursor-pointer transition-all duration-200 group"
              >
                <rect
                  x="150"
                  y="230"
                  width="145"
                  height="75"
                  rx="14"
                  className={
                    activeRegionId === "southbay" || activeRegionId === "all"
                      ? "fill-cyan-500/25 stroke-cyan-400 stroke-2"
                      : "fill-white/5 stroke-white/20 stroke-1 hover:fill-cyan-500/15"
                  }
                />
                <text x="222" y="260" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                  South Bay &amp; Gateway
                </text>
                <text x="222" y="278" textAnchor="middle" fill="#A5F3FC" fontSize="9.5">
                  Torrance • Long Beach
                </text>
                <text x="222" y="292" textAnchor="middle" fill="#67E8F9" fontSize="9">
                  Downey • Lakewood • Beach Cities
                </text>
                <circle cx="195" cy="245" r="3" fill="#06B6D4" />
              </g>

              {/* Region 5: Orange County (SE Coast & Inland) */}
              <g
                onClick={() => setActiveRegionId("oc")}
                className="cursor-pointer transition-all duration-200 group"
              >
                <rect
                  x="305"
                  y="180"
                  width="155"
                  height="110"
                  rx="14"
                  className={
                    activeRegionId === "oc" || activeRegionId === "all"
                      ? "fill-amber-500/25 stroke-amber-400 stroke-2"
                      : "fill-white/5 stroke-white/20 stroke-1 hover:fill-amber-500/15"
                  }
                />
                <text x="382" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                  Orange County
                </text>
                <text x="382" y="235" textAnchor="middle" fill="#FDE68A" fontSize="10">
                  Anaheim • Irvine • Fullerton
                </text>
                <text x="382" y="252" textAnchor="middle" fill="#FCD34D" fontSize="9.5">
                  Orange • Huntington Beach
                </text>
                <text x="382" y="268" textAnchor="middle" fill="#FBBF24" fontSize="9">
                  Costa Mesa • Newport Beach
                </text>
                <circle cx="360" cy="195" r="3" fill="#F59E0B" />
              </g>

              {/* Connecting Interstate Transit Arteries (I-10, I-5, I-210, I-605) */}
              <path d="M 175 160 L 265 105" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <path d="M 280 120 L 350 200" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <path d="M 180 190 L 220 240" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <path d="M 140 100 L 160 145" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            </svg>
          </div>

          {/* Right Column: Live Region Statistics & Rapid Dispatch Metrics */}
          <div className="md:col-span-5 space-y-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Active Zone Details
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Same-Day Units Ready
                </span>
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-white">
                {activeRegion.name}
              </h3>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                {activeRegion.description}
              </p>

              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Avg Response Time:</span>
                  <span className="font-extrabold text-brand-accent text-sm">
                    {activeRegion.dispatchTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Local Coverage:</span>
                  <span className="font-extrabold text-white text-sm">
                    {filteredNeighborhoods.length} Cities
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-accent py-3 px-3 text-xs font-black text-brand-navy-dark shadow-sm hover:bg-sky-300 transition-all cursor-pointer"
              >
                <Phone className="size-3.5" />
                <span>Call Dispatch</span>
              </a>
              <a
                href={siteConfig.smsHref}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 py-3 px-3 text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
              >
                <MessageSquareText className="size-3.5 text-brand-accent" />
                <span>$75 Text Voucher</span>
              </a>
            </div>

            {/* Optional On-Demand Satellite/Street Map Loader */}
            {!loadInteractiveMap ? (
              <button
                type="button"
                onClick={() => setLoadInteractiveMap(true)}
                className="w-full text-center text-xs text-slate-400 hover:text-brand-accent underline cursor-pointer py-1"
              >
                Need detailed street zoom? Click to load interactive map
              </button>
            ) : (
              <div className="relative mt-2 overflow-hidden rounded-xl border border-white/20 shadow-md">
                <iframe
                  title={`Street Map - ${activeRegion.name}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeRegion.bbox}&layer=mapnik&marker=${activeRegion.marker}`}
                  className="w-full h-[220px] border-0"
                  loading="lazy"
                />
              </div>
            )}
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
            prefetch={false}
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
              prefetch={false}
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
