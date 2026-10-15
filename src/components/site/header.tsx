"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, ShieldCheck, House } from "lucide-react";
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
  "services",
  "recent-work",
  "fixtures",
  "commercial",
  "about",
  "service-areas",
  "reviews",
  "estimate",
];

function bounceScroll(target: HTMLElement) {
  const start = window.scrollY;
  const end =
    target.getBoundingClientRect().top +
    start -
    window.innerHeight / 2 +
    target.offsetHeight / 2;
  const distance = end - start;
  const duration = 900;
  const startTime = performance.now();

  function easeOutBack(t: number) {
    const c1 = 1.70158;
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

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[href^='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const hash = href.replace("#", "");
      if (!NAV_TARGETS.includes(hash)) return;

      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => bounceScroll(el), 50);
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-slate-800 bg-brand-navy text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 py-1.5 sm:py-2">
          <Link href="#top" className="flex shrink-0 items-center gap-2">
            <Image
              src="/jjj-plumbing-logo-v2.png"
              alt="JJJ Plumbing logo"
              width={1179}
              height={403}
              className="h-11 w-auto rounded-md sm:h-14"
              priority
            />
          </Link>

          {/* Mobile License Badge */}
          <div className="flex lg:hidden items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-200 shadow-sm">
            <ShieldCheck className="size-3.5 text-brand-accent shrink-0" />
            <span>{siteConfig.license}</span>
          </div>

          <nav className="hidden items-center gap-1.5 xl:gap-2.5 lg:flex flex-1 justify-center max-w-4xl mx-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] p-2 xl:p-2.5 text-slate-100 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              aria-label="Home"
            >
              <House className="size-4" />
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-2.5 py-1.5 xl:px-4 xl:py-2 text-xs xl:text-sm font-bold tracking-tight text-slate-100 shadow-sm transition-all duration-200 hover:border-brand-accent/70 hover:bg-brand-accent/15 hover:text-brand-accent hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex shrink-0">
            <div className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-slate-200">
              <ShieldCheck className="size-4 text-brand-accent" />
              {siteConfig.license}
            </div>
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              className="h-10 xl:h-11 rounded-xl bg-brand-accent px-4 xl:px-5 text-xs xl:text-sm font-extrabold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all hover:-translate-y-0.5"
            >
              <Phone className="size-3.5 xl:size-4" />
              Call Now
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white lg:hidden"
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
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-base font-bold text-slate-100 hover:border-brand-accent hover:bg-brand-accent/15 hover:text-brand-accent"
                  onClick={() => setOpen(false)}
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
                <div className="mt-3 flex items-center gap-1.5 px-3 text-xs text-slate-300">
                  <ShieldCheck className="size-4 text-brand-accent" />
                  {siteConfig.license}
                </div>
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
