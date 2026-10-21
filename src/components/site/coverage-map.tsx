"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
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
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { neighborhoods } from "@/app/neighborhoods/neighborhood-data";

type RegionDef = {
  id: string;
  name: string;
  dispatchTime: string;
  description: string;
  badgeBg: string;
  hubs: string[];
};

const REGIONS: RegionDef[] = [
  {
    id: "all",
    name: "All SoCal Coverage",
    dispatchTime: "25–55 Min Average",
    description: "Full master plumbing coverage across 75+ cities in 5 Southern California regions.",
    badgeBg: "bg-brand-navy text-white",
    hubs: ["San Gabriel Valley", "Los Angeles & Westside", "Orange County", "San Fernando Valley", "South Bay"],
  },
  {
    id: "sgv",
    name: "San Gabriel Valley",
    dispatchTime: "25–40 Min Priority",
    description: "Fastest response with primary dispatch units stationed daily across SGV communities.",
    badgeBg: "bg-emerald-600 text-white",
    hubs: ["San Gabriel", "Pasadena", "Alhambra", "Arcadia", "West Covina", "Glendora", "Whittier"],
  },
  {
    id: "la",
    name: "Los Angeles & Westside",
    dispatchTime: "35–50 Min Dispatch",
    description: "Emergency repairs, drain clearing, and repiping for LA and Westside residential & commercial accounts.",
    badgeBg: "bg-blue-600 text-white",
    hubs: ["DTLA", "Silver Lake", "Echo Park", "Beverly Hills", "Santa Monica", "Culver City"],
  },
  {
    id: "oc",
    name: "Orange County",
    dispatchTime: "35–55 Min Dispatch",
    description: "Same-day hydro-jetting, water heaters, and pipe repairs across North and Central Orange County.",
    badgeBg: "bg-amber-600 text-white",
    hubs: ["Anaheim", "Irvine", "Fullerton", "Orange", "Huntington Beach", "Newport Beach"],
  },
  {
    id: "sfv",
    name: "San Fernando Valley",
    dispatchTime: "40–55 Min Dispatch",
    description: "Licensed master plumbers serving valley homes with upfront pricing and zero hidden fees.",
    badgeBg: "bg-purple-600 text-white",
    hubs: ["Glendale", "Burbank", "Studio City", "Sherman Oaks", "Encino", "Woodland Hills"],
  },
  {
    id: "southbay",
    name: "South Bay & Gateway Cities",
    dispatchTime: "35–50 Min Dispatch",
    description: "Prompt mobile dispatch for sewer lines, water heaters, and slab leaks throughout the South Bay.",
    badgeBg: "bg-cyan-700 text-white",
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
            Official Southern California Dispatch Perimeter
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-brand-navy tracking-tight">
            JJJ Plumbing Service Areas &amp; Coverage Map
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

      {/* Completely Static Actual Map with Visual Coverage Overlay (Zero Zoom, Zero Scroll Hijack, 0ms Lag) */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-950 shadow-xl select-none">
        {/* Actual Static Photographic/Cartographic Map of Southern California */}
        <div className="relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[440px] max-h-[560px]">
          <Image
            src="/socal-coverage-basemap.jpg"
            alt="Southern California Plumbing Service Coverage Map"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center pointer-events-none"
            priority
          />

          {/* Semi-transparent dark vignette to make coverage overlays pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/60 pointer-events-none" />

          {/* SVG Overlay of Service Regions Positioned Directly Over Actual Geography */}
          <svg
            viewBox="0 0 1000 562.5"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            aria-label="JJJ Plumbing Service Zones Overlay"
          >
            <defs>
              <radialGradient id="pulseCenter" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Region 1: San Fernando Valley (Northwest) */}
            <g
              onClick={() => setActiveRegionId("sfv")}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="80"
                y="65"
                width="280"
                height="125"
                rx="20"
                className={
                  activeRegionId === "sfv" || activeRegionId === "all"
                    ? "fill-purple-500/30 stroke-purple-400 stroke-[2.5]"
                    : "fill-purple-500/10 stroke-purple-400/40 stroke-1 hover:fill-purple-500/25"
                }
              />
              <rect x="95" y="80" width="170" height="26" rx="6" fill="#0B132B" fillOpacity="0.85" />
              <text x="180" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                San Fernando Valley
              </text>
              <text x="180" y="125" textAnchor="middle" fill="#E9D5FF" fontSize="11" fontWeight="500">
                Glendale • Burbank • Encino
              </text>
              <text x="180" y="145" textAnchor="middle" fill="#C084FC" fontSize="10.5" fontWeight="600">
                ⚡ 40–55 Min Dispatch
              </text>
              <circle cx="300" cy="95" r="5" fill="#A855F7" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>

            {/* Region 2: San Gabriel Valley (Northeast - Primary Dispatch Hub) */}
            <g
              onClick={() => setActiveRegionId("sgv")}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="410"
                y="85"
                width="360"
                height="150"
                rx="22"
                className={
                  activeRegionId === "sgv" || activeRegionId === "all"
                    ? "fill-emerald-500/35 stroke-emerald-400 stroke-[3]"
                    : "fill-emerald-500/10 stroke-emerald-400/40 stroke-1 hover:fill-emerald-500/25"
                }
              />
              {/* Highlight badge for primary hub */}
              <rect x="430" y="102" width="220" height="28" rx="8" fill="#064E3B" fillOpacity="0.9" stroke="#10B981" strokeWidth="1" />
              <text x="540" y="121" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
                ★ San Gabriel Valley
              </text>
              <text x="590" y="152" textAnchor="middle" fill="#A7F3D0" fontSize="12" fontWeight="600">
                San Gabriel • Pasadena • Alhambra
              </text>
              <text x="590" y="172" textAnchor="middle" fill="#6EE7B7" fontSize="11">
                Arcadia • Covina • Glendora • Whittier
              </text>
              <text x="590" y="195" textAnchor="middle" fill="#34D399" fontSize="11.5" fontWeight="700">
                ⚡ 25–40 Min Priority Response
              </text>

              {/* Pulsing Beacon over San Gabriel */}
              <circle cx="510" cy="115" r="16" fill="url(#pulseCenter)" className="animate-pulse" />
              <circle cx="510" cy="115" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            </g>

            {/* Region 3: Los Angeles & Westside (Central-West) */}
            <g
              onClick={() => setActiveRegionId("la")}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="210"
                y="215"
                width="290"
                height="135"
                rx="20"
                className={
                  activeRegionId === "la" || activeRegionId === "all"
                    ? "fill-blue-500/30 stroke-blue-400 stroke-[2.5]"
                    : "fill-blue-500/10 stroke-blue-400/40 stroke-1 hover:fill-blue-500/25"
                }
              />
              <rect x="225" y="230" width="190" height="26" rx="6" fill="#0B132B" fillOpacity="0.85" />
              <text x="320" y="248" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                Los Angeles &amp; Westside
              </text>
              <text x="355" y="278" textAnchor="middle" fill="#BAE6FD" fontSize="11.5" fontWeight="500">
                DTLA • Beverly Hills • Culver City
              </text>
              <text x="355" y="298" textAnchor="middle" fill="#93C5FD" fontSize="11">
                Santa Monica • Silver Lake • Echo Park
              </text>
              <text x="355" y="320" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="700">
                ⚡ 35–50 Min Dispatch
              </text>
              <circle cx="370" cy="245" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>

            {/* Region 4: South Bay & Gateway Cities (Southwest Coast) */}
            <g
              onClick={() => setActiveRegionId("southbay")}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="320"
                y="370"
                width="290"
                height="130"
                rx="20"
                className={
                  activeRegionId === "southbay" || activeRegionId === "all"
                    ? "fill-cyan-500/30 stroke-cyan-400 stroke-[2.5]"
                    : "fill-cyan-500/10 stroke-cyan-400/40 stroke-1 hover:fill-cyan-500/25"
                }
              />
              <rect x="335" y="385" width="200" height="26" rx="6" fill="#0B132B" fillOpacity="0.85" />
              <text x="435" y="403" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="bold">
                South Bay &amp; Gateway Cities
              </text>
              <text x="465" y="432" textAnchor="middle" fill="#A5F3FC" fontSize="11.5" fontWeight="500">
                Torrance • Long Beach • Downey
              </text>
              <text x="465" y="452" textAnchor="middle" fill="#67E8F9" fontSize="11">
                Norwalk • Lakewood • Beach Cities
              </text>
              <text x="465" y="474" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="700">
                ⚡ 35–50 Min Dispatch
              </text>
              <circle cx="410" cy="398" r="5" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>

            {/* Region 5: Orange County (Southeast) */}
            <g
              onClick={() => setActiveRegionId("oc")}
              className="cursor-pointer transition-all duration-300"
            >
              <rect
                x="630"
                y="290"
                width="310"
                height="170"
                rx="22"
                className={
                  activeRegionId === "oc" || activeRegionId === "all"
                    ? "fill-amber-500/35 stroke-amber-400 stroke-[3]"
                    : "fill-amber-500/10 stroke-amber-400/40 stroke-1 hover:fill-amber-500/25"
                }
              />
              <rect x="650" y="308" width="160" height="26" rx="6" fill="#0B132B" fillOpacity="0.85" />
              <text x="730" y="326" textAnchor="middle" fill="#FFFFFF" fontSize="13.5" fontWeight="bold">
                Orange County
              </text>
              <text x="785" y="358" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="600">
                Anaheim • Irvine • Fullerton
              </text>
              <text x="785" y="378" textAnchor="middle" fill="#FCD34D" fontSize="11">
                Orange • Huntington Beach • Costa Mesa
              </text>
              <text x="785" y="398" textAnchor="middle" fill="#FBBF24" fontSize="11">
                Newport Beach • Santa Ana
              </text>
              <text x="785" y="422" textAnchor="middle" fill="#F59E0B" fontSize="11.5" fontWeight="700">
                ⚡ 35–55 Min Dispatch
              </text>
              <circle cx="715" cy="321" r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          </svg>

          {/* Floating Static Legend (Bottom Left) */}
          <div className="absolute bottom-3 left-3 rounded-xl border border-white/15 bg-slate-900/90 backdrop-blur-xs p-3 text-xs max-w-[280px] hidden sm:block pointer-events-none">
            <div className="flex items-center gap-2 font-black text-white text-[12px]">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Static Service Area Map</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-300 leading-tight">
              Coverage for 75+ communities across 5 key Southern California regions.
            </p>
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
