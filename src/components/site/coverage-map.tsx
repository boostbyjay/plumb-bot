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
  "90265": { city: "Malibu", region: "Los Angeles & Westside", time: "40–55 Min" },
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
              <filter id="cityLabelShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.95" />
              </filter>
              <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- MASTER OVERALL COVERAGE HIGHLIGHT PERIMETER --- */}
            <path
              d="M 90 220 C 80 160, 90 120, 100 85 C 190 90, 280 100, 380 115 C 470 110, 630 105, 790 120 C 810 170, 820 220, 825 275 C 830 350, 830 420, 780 520 C 730 535, 690 530, 640 500 C 590 475, 550 460, 520 460 C 490 465, 475 465, 464 465 C 430 460, 400 435, 405 395 C 410 360, 405 335, 395 315 C 380 295, 365 285, 345 280 C 270 280, 170 275, 90 260 C 85 240, 88 230, 90 220 Z"
              fill="rgba(14, 165, 233, 0.05)"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              strokeOpacity="0.8"
              filter="url(#softGlow)"
              className="pointer-events-none"
            />

            {/* --- REGION 1: San Fernando Valley (NW) --- */}
            <path
              d="M 90 220 C 80 160, 90 120, 100 85 C 190 90, 280 100, 380 115 L 400 195 C 300 205, 200 212, 90 220 Z"
              onClick={() => setActiveRegionId("sfv")}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              fill={
                activeRegionId === "sfv"
                  ? "rgba(168, 85, 247, 0.65)"
                  : activeRegionId === "all"
                  ? "rgba(147, 51, 234, 0.44)"
                  : "rgba(147, 51, 234, 0.28)"
              }
              stroke="#C084FC"
              strokeWidth={activeRegionId === "sfv" ? "2.5" : activeRegionId === "all" ? "2" : "1.2"}
              filter={activeRegionId === "sfv" ? "url(#softGlow)" : undefined}
            />

            {/* --- REGION 2: San Gabriel Valley (NE) --- */}
            <path
              d="M 400 195 L 380 115 C 470 110, 630 105, 790 120 C 810 170, 820 220, 825 275 C 750 280, 670 280, 585 285 C 550 282, 510 278, 475 275 C 450 245, 420 220, 400 195 Z"
              onClick={() => setActiveRegionId("sgv")}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              fill={
                activeRegionId === "sgv"
                  ? "rgba(16, 185, 129, 0.68)"
                  : activeRegionId === "all"
                  ? "rgba(16, 185, 129, 0.48)"
                  : "rgba(16, 185, 129, 0.30)"
              }
              stroke="#34D399"
              strokeWidth={activeRegionId === "sgv" ? "3" : activeRegionId === "all" ? "2.5" : "1.5"}
              filter={activeRegionId === "sgv" ? "url(#softGlow)" : undefined}
            />

            {/* --- REGION 3: Los Angeles & Westside (embracing Malibu) --- */}
            <path
              d="M 90 220 C 200 212, 300 205, 400 195 C 420 220, 450 245, 475 275 C 445 290, 420 305, 395 315 C 380 295, 365 285, 345 280 C 270 280, 170 275, 90 260 C 85 240, 88 230, 90 220 Z"
              onClick={() => setActiveRegionId("la")}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              fill={
                activeRegionId === "la"
                  ? "rgba(2, 132, 199, 0.68)"
                  : activeRegionId === "all"
                  ? "rgba(2, 132, 199, 0.44)"
                  : "rgba(2, 132, 199, 0.28)"
              }
              stroke="#38BDF8"
              strokeWidth={activeRegionId === "la" ? "2.5" : activeRegionId === "all" ? "2" : "1.2"}
              filter={activeRegionId === "la" ? "url(#softGlow)" : undefined}
            />

            {/* --- REGION 4: South Bay & Gateway Cities --- */}
            <path
              d="M 395 315 C 420 305, 445 290, 475 275 C 510 278, 550 282, 585 285 C 570 335, 550 390, 520 460 C 490 465, 475 465, 464 465 C 430 460, 400 435, 405 395 C 410 360, 405 335, 395 315 Z"
              onClick={() => setActiveRegionId("southbay")}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              fill={
                activeRegionId === "southbay"
                  ? "rgba(6, 182, 212, 0.68)"
                  : activeRegionId === "all"
                  ? "rgba(6, 182, 212, 0.44)"
                  : "rgba(6, 182, 212, 0.28)"
              }
              stroke="#22D3EE"
              strokeWidth={activeRegionId === "southbay" ? "2.5" : activeRegionId === "all" ? "2" : "1.2"}
              filter={activeRegionId === "southbay" ? "url(#softGlow)" : undefined}
            />

            {/* --- REGION 5: Orange County --- */}
            <path
              d="M 585 285 C 670 280, 750 280, 825 275 C 830 350, 830 420, 780 520 C 730 535, 690 530, 640 500 C 590 475, 550 460, 520 460 C 550 390, 570 335, 585 285 Z"
              onClick={() => setActiveRegionId("oc")}
              className="cursor-pointer transition-all duration-300 hover:opacity-95"
              fill={
                activeRegionId === "oc"
                  ? "rgba(245, 158, 11, 0.68)"
                  : activeRegionId === "all"
                  ? "rgba(245, 158, 11, 0.44)"
                  : "rgba(245, 158, 11, 0.28)"
              }
              stroke="#FBBF24"
              strokeWidth={activeRegionId === "oc" ? "2.5" : activeRegionId === "all" ? "2" : "1.2"}
              filter={activeRegionId === "oc" ? "url(#softGlow)" : undefined}
            />

            {/* Subtle Region Watermark Titles */}
            <text x="220" y="112" textAnchor="middle" fill="#E9D5FF" fontSize="11" fontWeight="900" letterSpacing="2" opacity="0.55" className="pointer-events-none select-none">
              SAN FERNANDO VALLEY
            </text>
            <text x="640" y="132" textAnchor="middle" fill="#A7F3D0" fontSize="12" fontWeight="900" letterSpacing="2.5" opacity="0.6" className="pointer-events-none select-none">
              SAN GABRIEL VALLEY
            </text>
            <text x="210" y="270" textAnchor="middle" fill="#BAE6FD" fontSize="10.5" fontWeight="900" letterSpacing="2" opacity="0.55" className="pointer-events-none select-none">
              WESTSIDE / LA
            </text>
            <text x="460" y="348" textAnchor="middle" fill="#CFFAFE" fontSize="10" fontWeight="900" letterSpacing="1.8" opacity="0.5" className="pointer-events-none select-none">
              SOUTH BAY &amp; GATEWAY
            </text>
            <text x="740" y="370" textAnchor="middle" fill="#FEF3C7" fontSize="12" fontWeight="900" letterSpacing="2" opacity="0.55" className="pointer-events-none select-none">
              ORANGE COUNTY
            </text>

            {/* --- 1. SAN FERNANDO VALLEY CITIES --- */}
            <g id="sfv-cities">
              <circle cx="160" cy="170" r="3" fill="#C084FC" stroke="#FFF" strokeWidth="1" />
              <text x="160" y="162" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="600" filter="url(#cityLabelShadow)">
                Woodland Hills
              </text>

              <circle cx="230" cy="172" r="3" fill="#C084FC" stroke="#FFF" strokeWidth="1" />
              <text x="230" y="164" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="600" filter="url(#cityLabelShadow)">
                Encino
              </text>

              <circle cx="280" cy="138" r="3" fill="#C084FC" stroke="#FFF" strokeWidth="1" />
              <text x="280" y="130" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="600" filter="url(#cityLabelShadow)">
                Van Nuys
              </text>

              <circle cx="295" cy="176" r="3.5" fill="#C084FC" stroke="#FFF" strokeWidth="1.2" />
              <text x="295" y="189" textAnchor="middle" fill="#F3E8FF" fontSize="9.5" fontWeight="700" filter="url(#cityLabelShadow)">
                Sherman Oaks
              </text>

              <circle cx="355" cy="175" r="3" fill="#C084FC" stroke="#FFF" strokeWidth="1" />
              <text x="355" y="166" textAnchor="middle" fill="#F3E8FF" fontSize="9" fontWeight="600" filter="url(#cityLabelShadow)">
                Studio City
              </text>

              <circle cx="385" cy="148" r="3.5" fill="#C084FC" stroke="#FFF" strokeWidth="1.2" />
              <text x="385" y="139" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700" filter="url(#cityLabelShadow)">
                Burbank
              </text>

              <circle cx="425" cy="168" r="3.5" fill="#C084FC" stroke="#FFF" strokeWidth="1.2" />
              <text x="425" y="159" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700" filter="url(#cityLabelShadow)">
                Glendale
              </text>
            </g>

            {/* --- 2. LOS ANGELES & WESTSIDE CITIES --- */}
            <g id="la-cities">
              <circle cx="150" cy="248" r="4.5" fill="#38BDF8" stroke="#FFF" strokeWidth="1.8" />
              <text x="150" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900" filter="url(#cityLabelShadow)">
                Malibu
              </text>

              <circle cx="285" cy="260" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="285" y="252" textAnchor="middle" fill="#BAE6FD" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Pacific Palisades
              </text>

              <circle cx="345" cy="272" r="4" fill="#38BDF8" stroke="#FFF" strokeWidth="1.5" />
              <text x="345" y="286" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                Santa Monica
              </text>

              <circle cx="380" cy="225" r="4.5" fill="#38BDF8" stroke="#FFF" strokeWidth="1.8" />
              <text x="380" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" filter="url(#cityLabelShadow)">
                Beverly Hills
              </text>

              <circle cx="428" cy="216" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="428" y="208" textAnchor="middle" fill="#BAE6FD" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                West Hollywood
              </text>

              <circle cx="435" cy="195" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="435" y="187" textAnchor="middle" fill="#BAE6FD" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Hollywood
              </text>

              <circle cx="395" cy="280" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="395" y="293" textAnchor="middle" fill="#BAE6FD" fontSize="9" fontWeight="600" filter="url(#cityLabelShadow)">
                Culver City
              </text>

              <circle cx="465" cy="250" r="4.5" fill="#38BDF8" stroke="#FFF" strokeWidth="1.8" />
              <text x="465" y="264" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" filter="url(#cityLabelShadow)">
                Downtown LA
              </text>

              <circle cx="458" cy="222" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="458" y="233" textAnchor="middle" fill="#BAE6FD" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Silver Lake
              </text>

              <circle cx="425" cy="308" r="3" fill="#38BDF8" stroke="#FFF" strokeWidth="1" />
              <text x="425" y="320" textAnchor="middle" fill="#BAE6FD" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Inglewood
              </text>
            </g>

            {/* --- 3. SAN GABRIEL VALLEY CITIES (Zero HQ label) --- */}
            <g id="sgv-cities">
              <circle cx="490" cy="155" r="4" fill="#10B981" stroke="#FFF" strokeWidth="1.5" />
              <text x="490" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                Pasadena
              </text>

              <circle cx="485" cy="178" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="485" y="170" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                S. Pasadena
              </text>

              {/* San Gabriel - Standard clean city label with zero HQ text */}
              <circle cx="530" cy="190" r="4" fill="#10B981" stroke="#FFF" strokeWidth="1.5" />
              <text x="530" y="203" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                San Gabriel
              </text>

              <circle cx="495" cy="215" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="495" y="226" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Alhambra
              </text>

              <circle cx="515" cy="240" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="515" y="252" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Monterey Park
              </text>

              <circle cx="565" cy="160" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
              <text x="565" y="150" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Arcadia
              </text>

              <circle cx="610" cy="155" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="610" y="145" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Monrovia
              </text>

              <circle cx="558" cy="180" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="558" y="172" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Temple City
              </text>

              <circle cx="585" cy="202" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
              <text x="585" y="214" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                El Monte
              </text>

              <circle cx="645" cy="210" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
              <text x="645" y="222" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" filter="url(#cityLabelShadow)">
                West Covina
              </text>

              <circle cx="665" cy="185" r="3" fill="#10B981" stroke="#FFF" strokeWidth="1" />
              <text x="665" y="176" textAnchor="middle" fill="#A7F3D0" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Covina
              </text>

              <circle cx="700" cy="165" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
              <text x="700" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Glendora
              </text>

              <circle cx="570" cy="265" r="3.5" fill="#10B981" stroke="#FFF" strokeWidth="1.2" />
              <text x="570" y="277" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" filter="url(#cityLabelShadow)">
                Whittier
              </text>
            </g>

            {/* --- 4. SOUTH BAY & GATEWAY CITIES --- */}
            <g id="southbay-cities">
              <circle cx="380" cy="335" r="3.5" fill="#22D3EE" stroke="#FFF" strokeWidth="1.2" />
              <text x="380" y="325" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Manhattan Beach
              </text>

              <circle cx="390" cy="370" r="3.5" fill="#22D3EE" stroke="#FFF" strokeWidth="1.2" />
              <text x="390" y="382" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Redondo Beach
              </text>

              <circle cx="435" cy="385" r="4" fill="#22D3EE" stroke="#FFF" strokeWidth="1.5" />
              <text x="435" y="398" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                Torrance
              </text>

              <circle cx="410" cy="440" r="3" fill="#22D3EE" stroke="#FFF" strokeWidth="1" />
              <text x="410" y="452" textAnchor="middle" fill="#CFFAFE" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Palos Verdes
              </text>

              <circle cx="515" cy="290" r="3.5" fill="#22D3EE" stroke="#FFF" strokeWidth="1.2" />
              <text x="515" y="302" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Downey
              </text>

              <circle cx="550" cy="315" r="3" fill="#22D3EE" stroke="#FFF" strokeWidth="1" />
              <text x="550" y="327" textAnchor="middle" fill="#CFFAFE" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Norwalk
              </text>

              <circle cx="540" cy="358" r="3" fill="#22D3EE" stroke="#FFF" strokeWidth="1" />
              <text x="540" y="370" textAnchor="middle" fill="#CFFAFE" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Cerritos
              </text>

              <circle cx="498" cy="382" r="3" fill="#22D3EE" stroke="#FFF" strokeWidth="1" />
              <text x="498" y="373" textAnchor="middle" fill="#CFFAFE" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Lakewood
              </text>

              <circle cx="475" cy="430" r="4.5" fill="#22D3EE" stroke="#FFF" strokeWidth="1.8" />
              <text x="475" y="443" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900" filter="url(#cityLabelShadow)">
                Long Beach
              </text>
            </g>

            {/* --- 5. ORANGE COUNTY CITIES --- */}
            <g id="oc-cities">
              <circle cx="625" cy="305" r="3.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.2" />
              <text x="625" y="295" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Fullerton
              </text>

              <circle cx="655" cy="278" r="3" fill="#FBBF24" stroke="#FFF" strokeWidth="1" />
              <text x="655" y="268" textAnchor="middle" fill="#FEF3C7" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Brea
              </text>

              <circle cx="630" cy="340" r="4.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.8" />
              <text x="630" y="353" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900" filter="url(#cityLabelShadow)">
                Anaheim
              </text>

              <circle cx="675" cy="345" r="3.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.2" />
              <text x="675" y="335" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Orange
              </text>

              <circle cx="605" cy="375" r="3" fill="#FBBF24" stroke="#FFF" strokeWidth="1" />
              <text x="605" y="387" textAnchor="middle" fill="#FEF3C7" fontSize="8.5" fontWeight="600" filter="url(#cityLabelShadow)">
                Garden Grove
              </text>

              <circle cx="665" cy="385" r="3.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.2" />
              <text x="665" y="398" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" filter="url(#cityLabelShadow)">
                Santa Ana
              </text>

              <circle cx="645" cy="435" r="3.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.2" />
              <text x="645" y="425" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" filter="url(#cityLabelShadow)">
                Costa Mesa
              </text>

              <circle cx="575" cy="455" r="4" fill="#FBBF24" stroke="#FFF" strokeWidth="1.5" />
              <text x="575" y="468" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                Huntington Beach
              </text>

              <circle cx="655" cy="475" r="4" fill="#FBBF24" stroke="#FFF" strokeWidth="1.5" />
              <text x="655" y="488" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" filter="url(#cityLabelShadow)">
                Newport Beach
              </text>

              <circle cx="725" cy="425" r="4.5" fill="#FBBF24" stroke="#FFF" strokeWidth="1.8" />
              <text x="725" y="438" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="900" filter="url(#cityLabelShadow)">
                Irvine
              </text>
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
