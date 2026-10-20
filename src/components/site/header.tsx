"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, ShieldCheck, House, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/site-config";

const NAV_TARGETS = [
  "specials",
  "services",
  "recent-work",
  "financing",
  "fixtures",
  "commercial",
  "about",
  "service-areas",
  "reviews",
  "estimate",
  "faq",
];

export function bounceScroll(target: HTMLElement) {
  const start = window.scrollY;
  const headerOffset = 80;
  // If element is tall (like estimate or services), land cleanly at the top of the section with header offset
  // If element is smaller, center it
  const isTall = target.offsetHeight > window.innerHeight * 0.6;
  const end = isTall
    ? target.getBoundingClientRect().top + start - headerOffset
    : target.getBoundingClientRect().top + start - (window.innerHeight - target.offsetHeight) / 2;
  const distance = end - start;
  const duration = 850;
  const startTime = performance.now();

  function easeOutBack(t: number) {
    const c1 = 1.35;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function frame(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutBack(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

export function Header() {
  const [open, setOpen] = useState(false);

  function handleHomeClick(e: React.MouseEvent) {
    if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleMobileHomeClick(e: React.MouseEvent) {
    setOpen(false);
    if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash && window.location.hash !== "#specials") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[href*='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const hash = href.includes("#") ? href.split("#")[1] : "";
      if (!hash) return;

      if (hash === "estimate") {
        e.preventDefault();
        setOpen(false);
        window.dispatchEvent(new CustomEvent("jjj:open-quick-quote"));
        return;
      }
      if (!NAV_TARGETS.includes(hash)) return;

      if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          setTimeout(() => bounceScroll(el), 50);
        }
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Mobile & Desktop Live Dispatch Announcement Bar */}
      <div className="bg-brand-navy-dark border-b border-white/10 py-1.5 px-3 sm:px-4 text-xs text-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-extrabold text-white text-[10.5px] sm:text-xs shrink-0 flex items-center gap-1">
              <MapPin className="size-3 text-brand-accent shrink-0 inline" />
              <span>Now Dispatching:</span>
            </span>
            <span className="truncate text-[10.5px] sm:text-xs text-slate-300">
              San Gabriel Valley • Los Angeles • San Fernando Valley • Orange County • South Bay
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 text-xs">
            <span className="text-emerald-400 font-bold text-[11px]">✓ 45-Min Mobile Response</span>
            <span className="text-white/20">•</span>
            <Link href="/neighborhoods" className="text-brand-accent hover:underline font-bold text-[11px] flex items-center gap-0.5">
              <span>75+ Cities</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-800 bg-brand-navy text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 py-1.5 sm:py-2.5">
          <Link href="/" onClick={handleHomeClick} className="flex shrink-0 items-center gap-2 cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
            <Image
              src="/jjj-plumbing-logo-v3.png"
              alt="JJJ Plumbing logo"
              width={1179}
              height={403}
              className="h-11 w-auto rounded-md sm:h-14"
              priority
            />
          </Link>

          {/* Mobile License & Bilingual Badge */}
          <div className="flex lg:hidden items-center gap-1.5">
            <span className="rounded-xl border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
              {siteConfig.bilingual}
            </span>
            <a
              href={siteConfig.cslbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-200 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              title="Verify California Contractor License"
            >
              <ShieldCheck className="size-3 text-brand-accent shrink-0" />
              <span>{siteConfig.license}</span>
            </a>
          </div>

          <nav className="hidden items-center gap-1.5 xl:gap-2 lg:flex flex-1 justify-center max-w-4xl mx-2">
            <Link
              href="/"
              onClick={handleHomeClick}
              className="h-9 w-9 xl:h-9.5 xl:w-9.5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] text-slate-100 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer shrink-0"
              aria-label="Home"
            >
              <House className="size-4" />
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="h-9 xl:h-9.5 inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-2.5 xl:px-3.5 text-xs xl:text-sm font-bold tracking-tight text-slate-100 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <a
              href={siteConfig.cslbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 xl:h-9.5 inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.06] px-2.5 text-xs font-semibold text-slate-100 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              title="Verify California Contractor License"
            >
              <ShieldCheck className="size-3.5 text-brand-accent" />
              <span>{siteConfig.license}</span>
            </a>
            <div className="relative inline-flex items-center justify-center">
              <Button
                render={<a href={siteConfig.phoneHref} />}
                nativeButton={false}
                className="h-9 xl:h-9.5 rounded-xl bg-brand-accent px-3.5 xl:px-4.5 text-xs xl:text-sm font-extrabold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <Phone className="size-3.5 xl:size-4 mr-1" />
                Call Now
              </Button>
              <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-amber-300/90 pointer-events-none">
                {siteConfig.bilingual}
              </span>
            </div>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white lg:hidden transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-brand-navy text-white border-slate-800 w-[280px] sm:w-[320px]"
            >
              <SheetHeader>
                <SheetTitle className="text-white">
                  <span>Menu</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-3 py-3">
                <div className="flex items-center justify-between rounded-xl border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-300">
                  <span>{siteConfig.bilingual}</span>
                  <span className="text-[11px] text-slate-300">Technicians Available</span>
                </div>
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-base font-bold text-slate-100 hover:border-brand-accent hover:bg-brand-accent/15 hover:text-brand-accent cursor-pointer"
                  onClick={handleMobileHomeClick}
                >
                  <House className="size-4 text-brand-accent" />
                  Home
                </Link>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-base font-bold text-slate-100 hover:border-brand-accent hover:bg-brand-accent/15 hover:text-brand-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={siteConfig.cslbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:text-brand-accent"
                >
                  <ShieldCheck className="size-4 text-brand-accent" />
                  Verify {siteConfig.license} (CSLB) →
                </a>
                <Button
                  render={<a href={siteConfig.phoneHref} />}
                  nativeButton={false}
                  className="mt-2 bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-bold"
                >
                  <Phone className="size-4" />
                  Call {siteConfig.phone}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
