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
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { neighborhoods } from "@/app/neighborhoods/neighborhood-data";

type RegionDef = {
  id: string;
  name: string;
  shortName: string;
  dispatchTime: string;
  badgeTime: string;
  description: string;
  colorHex: string;
  badgeBg: string;
};

const REGIONS: RegionDef[] = [
  {
    id: "all",
    name: "All SoCal Coverage",
    shortName: "All Regions",
    dispatchTime: "25–55 Min Average",
    badgeTime: "25–55m",
    description: "Full master plumbing coverage across 75+ cities in 5 Southern California regions.",
    colorHex: "#38BDF8",
    badgeBg: "bg-brand-navy text-white",
  },
  {
    id: "sgv",
    name: "San Gabriel Valley",
    shortName: "San Gabriel Valley",
    dispatchTime: "25–40 Min Priority",
    badgeTime: "25–40m",
    description: "Fastest response with primary dispatch units stationed daily across SGV communities.",
    colorHex: "#10B981",
    badgeBg: "bg-emerald-600 text-white",
  },
  {
    id: "la",
    name: "Los Angeles & Westside",
    shortName: "LA & Westside",
    dispatchTime: "35–50 Min Dispatch",
    badgeTime: "35–50m",
    description: "Emergency repairs, drain clearing, and repiping for LA and Westside residential & commercial accounts.",
    colorHex: "#0284C7",
    badgeBg: "bg-blue-600 text-white",
  },
  {
    id: "oc",
    name: "Orange County",
    shortName: "Orange County",
    dispatchTime: "35–55 Min Dispatch",
    badgeTime: "35–55m",
    description: "Same-day hydro-jetting, water heaters, and pipe repairs across North and Central Orange County.",
    colorHex: "#F59E0B",
    badgeBg: "bg-amber-600 text-white",
  },
  {
    id: "sfv",
    name: "San Fernando Valley",
    shortName: "San Fernando Valley",
    dispatchTime: "40–55 Min Dispatch",
    badgeTime: "40–55m",
    description: "Licensed master plumbers serving valley homes with upfront pricing and zero hidden fees.",
    colorHex: "#A855F7",
    badgeBg: "bg-purple-600 text-white",
  },
  {
    id: "southbay",
    name: "South Bay & Gateway Cities",
    shortName: "South Bay & Gateway",
    dispatchTime: "35–50 Min Dispatch",
    badgeTime: "35–50m",
    description: "Prompt mobile dispatch for sewer lines, water heaters, and slab leaks throughout the South Bay.",
    colorHex: "#06B6D4",
    badgeBg: "bg-cyan-700 text-white",
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

      {/* Completely Static Actual Map with Geographical Coverage Highlights & Compact Location Pins */}
      <div className="mt-5 relative overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-950 shadow-xl select-none">
        {/* Actual Static Photographic/Cartographic Map of Southern California */}
        <div className="relative w-full aspect-[16/9] min-h-[340px] sm:min-h-[440px] max-h-[580px]">
          <Image
            src="/socal-coverage-basemap.jpg"
            alt="Southern California Plumbing Service Coverage Map"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center pointer-events-none"
            priority
          />

          {/* Semi-transparent dark vignette allowing map highways & terrain to clearly show */}
          <div className="absolute inset-0 bg-slate-950/45 pointer-events-none" />

          {/* SVG Overlay: Geographical Highlights & Sleek Compact Pins */}
          <svg
            viewBox="0 0 1000 562.5"
            className="absolute inset-0 w-full h-full pointer-events-auto"
            aria-label="JJJ Plumbing Service Zones Overlay"
          >
            <defs>
              <radialGradient id="hubPulseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#10B981" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </radialGradient>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- MASTER OVERALL COVERAGE HIGHLIGHT PERIMETER --- */}
            {/* Soft, illuminated contour outlining entire Southern California coverage zone */}
            <path
              d="M 120 120 C 230 75, 480 85, 770 135 C 830 200, 860 340, 850 440 C 815 495, 680 515, 610 500 C 520 460, 420 455, 335 375 C 240 300, 195 235, 120 120 Z"
              fill="rgba(56, 189, 248, 0.08)"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeDasharray="8 6"
              strokeOpacity="0.75"
              filter="url(#softGlow)"
              className="pointer-events-none"
            />

            {/* --- REGION 1 HIGHLIGHT: San Fernando Valley (NW) --- */}
            <path
              d="M 120 120 C 180 80, 310 90, 390 120 C 400 170, 360 190, 260 185 C 160 180, 100 150, 120 120 Z"
              onClick={() => setActiveRegionId("sfv")}
              className={`cursor-pointer transition-all duration-300 ${
                activeRegionId === "sfv"
                  ? "fill-purple-500/35 stroke-purple-400 stroke-2 filter-[drop-shadow(0_0_8px_rgba(168,85,247,0.6))]"
                  : activeRegionId === "all"
                  ? "fill-purple-500/15 stroke-purple-400/40 stroke-1 hover:fill-purple-500/30"
                  : "fill-purple-500/5 stroke-purple-400/20 stroke-1 hover:fill-purple-500/20"
              }`}
            />

            {/* --- REGION 2 HIGHLIGHT: San Gabriel Valley (NE / Primary Hub) --- */}
            <path
              d="M 400 130 C 520 105, 710 120, 785 150 C 805 210, 735 240, 620 235 C 500 235, 420 195, 400 130 Z"
              onClick={() => setActiveRegionId("sgv")}
              className={`cursor-pointer transition-all duration-300 ${
                activeRegionId === "sgv"
                  ? "fill-emerald-500/40 stroke-emerald-400 stroke-[2.5] filter-[drop-shadow(0_0_10px_rgba(16,185,129,0.7))]"
                  : activeRegionId === "all"
                  ? "fill-emerald-500/20 stroke-emerald-400/50 stroke-1 hover:fill-emerald-500/35"
                  : "fill-emerald-500/5 stroke-emerald-400/20 stroke-1 hover:fill-emerald-500/20"
              }`}
            />

            {/* --- REGION 3 HIGHLIGHT: Los Angeles & Westside (Central-West) --- */}
            <path
              d="M 230 240 C 320 205, 430 215, 495 235 C 490 300, 390 315, 330 305 C 240 295, 210 260, 230 240 Z"
              onClick={() => setActiveRegionId("la")}
              className={`cursor-pointer transition-all duration-300 ${
                activeRegionId === "la"
                  ? "fill-blue-500/35 stroke-blue-400 stroke-2 filter-[drop-shadow(0_0_8px_rgba(2,132,199,0.6))]"
                  : activeRegionId === "all"
                  ? "fill-blue-500/15 stroke-blue-400/40 stroke-1 hover:fill-blue-500/30"
                  : "fill-blue-500/5 stroke-blue-400/20 stroke-1 hover:fill-blue-500/20"
              }`}
            />

            {/* --- REGION 4 HIGHLIGHT: South Bay & Gateway Cities (SW Coast) --- */}
            <path
              d="M 330 315 C 440 305, 540 320, 580 340 C 570 415, 490 450, 430 445 C 360 430, 320 370, 330 315 Z"
              onClick={() => setActiveRegionId("southbay")}
              className={`cursor-pointer transition-all duration-300 ${
                activeRegionId === "southbay"
                  ? "fill-cyan-500/35 stroke-cyan-400 stroke-2 filter-[drop-shadow(0_0_8px_rgba(6,182,212,0.6))]"
                  : activeRegionId === "all"
                  ? "fill-cyan-500/15 stroke-cyan-400/40 stroke-1 hover:fill-cyan-500/30"
                  : "fill-cyan-500/5 stroke-cyan-400/20 stroke-1 hover:fill-cyan-500/20"
              }`}
            />

            {/* --- REGION 5 HIGHLIGHT: Orange County (SE) --- */}
            <path
              d="M 570 325 C 680 300, 800 320, 840 380 C 855 450, 780 495, 680 500 C 600 480, 560 410, 570 325 Z"
              onClick={() => setActiveRegionId("oc")}
              className={`cursor-pointer transition-all duration-300 ${
                activeRegionId === "oc"
                  ? "fill-amber-500/35 stroke-amber-400 stroke-2 filter-[drop-shadow(0_0_8px_rgba(245,158,11,0.6))]"
                  : activeRegionId === "all"
                  ? "fill-amber-500/15 stroke-amber-400/40 stroke-1 hover:fill-amber-500/30"
                  : "fill-amber-500/5 stroke-amber-400/20 stroke-1 hover:fill-amber-500/20"
              }`}
            />

            {/* --- ANCHOR CITY BEACONS & LABELS --- */}
            {/* San Gabriel Valley Primary HQ Beacon */}
            <circle cx="530" cy="190" r="14" fill="url(#hubPulseGlow)" className="animate-pulse" />
            <circle cx="530" cy="190" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="530" y="208" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold" className="pointer-events-none drop-shadow">
              San Gabriel (HQ)
            </text>

            {/* Pasadena Dot */}
            <circle cx="490" cy="155" r="3" fill="#6EE7B7" opacity="0.9" />
            <text x="490" y="148" textAnchor="middle" fill="#E2E8F0" fontSize="9" opacity="0.85" className="pointer-events-none">
              Pasadena
            </text>

            {/* DTLA Dot */}
            <circle cx="470" cy="250" r="3.5" fill="#38BDF8" opacity="0.95" />
            <text x="470" y="265" textAnchor="middle" fill="#E2E8F0" fontSize="9.5" fontWeight="600" className="pointer-events-none">
              Downtown LA
            </text>

            {/* Santa Monica Dot */}
            <circle cx="245" cy="260" r="3" fill="#38BDF8" opacity="0.9" />
            <text x="245" y="275" textAnchor="middle" fill="#BAE6FD" fontSize="9" opacity="0.85" className="pointer-events-none">
              Santa Monica
            </text>

            {/* Glendale Dot */}
            <circle cx="360" cy="155" r="3" fill="#C084FC" opacity="0.9" />
            <text x="360" y="147" textAnchor="middle" fill="#E9D5FF" fontSize="9" opacity="0.85" className="pointer-events-none">
              Glendale
            </text>

            {/* Long Beach Dot */}
            <circle cx="490" cy="410" r="3.5" fill="#22D3EE" opacity="0.95" />
            <text x="490" y="426" textAnchor="middle" fill="#CFFAFE" fontSize="9" fontWeight="600" className="pointer-events-none">
              Long Beach
            </text>

            {/* Anaheim Dot */}
            <circle cx="630" cy="335" r="3.5" fill="#FBBF24" opacity="0.95" />
            <text x="630" y="327" textAnchor="middle" fill="#FEF3C7" fontSize="9.5" fontWeight="600" className="pointer-events-none">
              Anaheim
            </text>

            {/* Irvine Dot */}
            <circle cx="740" cy="440" r="3" fill="#F59E0B" opacity="0.9" />
            <text x="740" y="455" textAnchor="middle" fill="#FDE68A" fontSize="9" opacity="0.85" className="pointer-events-none">
              Irvine
            </text>

            {/* --- COMPACT SLEEK PIN BADGES (REPLACED BIG AREA BOXES) --- */}

            {/* Pin 1: San Fernando Valley (NW) */}
            <g
              onClick={() => setActiveRegionId("sfv")}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <rect
                x="150"
                y="90"
                width="170"
                height="26"
                rx="13"
                fill="#0A192F"
                fillOpacity="0.92"
                stroke={activeRegionId === "sfv" ? "#C084FC" : "#7E22CE"}
                strokeWidth={activeRegionId === "sfv" ? "2" : "1.2"}
                filter="url(#softGlow)"
              />
              <circle cx="163" cy="103" r="3.5" fill="#A855F7" />
              <text x="218" y="107" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                SF Valley
              </text>
              <rect x="268" y="94" width="46" height="18" rx="9" fill="#581C87" />
              <text x="291" y="106.5" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="bold">
                40–55m
              </text>
              {/* Pin pointer triangle */}
              <polygon points="230,116 235,123 240,116" fill="#0A192F" />
            </g>

            {/* Pin 2: San Gabriel Valley (NE - Primary Dispatch Hub) */}
            <g
              onClick={() => setActiveRegionId("sgv")}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <rect
                x="540"
                y="105"
                width="190"
                height="28"
                rx="14"
                fill="#0A192F"
                fillOpacity="0.95"
                stroke={activeRegionId === "sgv" ? "#34D399" : "#059669"}
                strokeWidth={activeRegionId === "sgv" ? "2.5" : "1.5"}
                filter="url(#softGlow)"
              />
              <circle cx="555" cy="119" r="4" fill="#10B981" />
              <text x="618" y="123" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontWeight="800">
                ★ SGV (Central Hub)
              </text>
              <rect x="678" y="109" width="46" height="20" rx="10" fill="#065F46" />
              <text x="701" y="123" textAnchor="middle" fill="#D1FAE5" fontSize="9.5" fontWeight="bold">
                25–40m
              </text>
              {/* Pin pointer triangle */}
              <polygon points="630,133 635,142 640,133" fill="#0A192F" />
            </g>

            {/* Pin 3: Los Angeles & Westside (Center-West) */}
            <g
              onClick={() => setActiveRegionId("la")}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <rect
                x="260"
                y="215"
                width="175"
                height="26"
                rx="13"
                fill="#0A192F"
                fillOpacity="0.92"
                stroke={activeRegionId === "la" ? "#38BDF8" : "#0369A1"}
                strokeWidth={activeRegionId === "la" ? "2" : "1.2"}
                filter="url(#softGlow)"
              />
              <circle cx="273" cy="228" r="3.5" fill="#0284C7" />
              <text x="328" y="232" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                LA &amp; Westside
              </text>
              <rect x="382" y="219" width="46" height="18" rx="9" fill="#075985" />
              <text x="405" y="231.5" textAnchor="middle" fill="#E0F2FE" fontSize="9" fontWeight="bold">
                35–50m
              </text>
              {/* Pin pointer triangle */}
              <polygon points="345,241 350,248 355,241" fill="#0A192F" />
            </g>

            {/* Pin 4: South Bay & Gateway Cities (SW Coast) */}
            <g
              onClick={() => setActiveRegionId("southbay")}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <rect
                x="330"
                y="340"
                width="175"
                height="26"
                rx="13"
                fill="#0A192F"
                fillOpacity="0.92"
                stroke={activeRegionId === "southbay" ? "#22D3EE" : "#0891B2"}
                strokeWidth={activeRegionId === "southbay" ? "2" : "1.2"}
                filter="url(#softGlow)"
              />
              <circle cx="343" cy="353" r="3.5" fill="#06B6D4" />
              <text x="398" y="357" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                South Bay Coast
              </text>
              <rect x="452" y="344" width="46" height="18" rx="9" fill="#155E75" />
              <text x="475" y="356.5" textAnchor="middle" fill="#CFFAFE" fontSize="9" fontWeight="bold">
                35–50m
              </text>
              {/* Pin pointer triangle */}
              <polygon points="415,366 420,373 425,366" fill="#0A192F" />
            </g>

            {/* Pin 5: Orange County (SE) */}
            <g
              onClick={() => setActiveRegionId("oc")}
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <rect
                x="650"
                y="360"
                width="170"
                height="26"
                rx="13"
                fill="#0A192F"
                fillOpacity="0.92"
                stroke={activeRegionId === "oc" ? "#FBBF24" : "#B45309"}
                strokeWidth={activeRegionId === "oc" ? "2" : "1.2"}
                filter="url(#softGlow)"
              />
              <circle cx="663" cy="373" r="3.5" fill="#F59E0B" />
              <text x="716" y="377" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                Orange County
              </text>
              <rect x="767" y="364" width="46" height="18" rx="9" fill="#78350F" />
              <text x="790" y="376.5" textAnchor="middle" fill="#FEF3C7" fontSize="9" fontWeight="bold">
                35–55m
              </text>
              {/* Pin pointer triangle */}
              <polygon points="730,386 735,393 740,386" fill="#0A192F" />
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
