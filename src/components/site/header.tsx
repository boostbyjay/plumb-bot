"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-brand-navy-dark text-white text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center sm:justify-between">
          <p className="flex items-center gap-1.5">
            <span aria-hidden>🚨</span>
            <span>
              Same-Day Dispatch Available &nbsp;|&nbsp; Licensed &amp; Insured
            </span>
          </p>
          <a
            href={siteConfig.phoneHref}
            className="hidden items-center gap-1.5 font-semibold text-brand-accent hover:text-sky-200 sm:flex"
          >
            <Phone className="size-3.5" />
            {siteConfig.phone}
          </a>
        </div>
      </div>

      <div className="border-b border-slate-800 bg-brand-navy text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:py-3">
          <Link href="#top" className="flex shrink-0 items-center gap-2">
            <div className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1.5">
              <Image
                src="/jjj-plumbing-logo.png"
                alt="JJJ Plumbing logo"
                width={1300}
                height={484}
                className="h-7 w-auto sm:h-8"
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-brand-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <ShieldCheck className="size-4 text-brand-accent" />
              {siteConfig.license}
            </div>
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              className="bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-semibold"
            >
              <Phone className="size-4" />
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
                <SheetTitle className="text-white flex items-center justify-between">
                  <span>Menu</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-brand-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-4 flex items-center gap-1.5 px-3 text-xs text-slate-400">
                  <ShieldCheck className="size-4 text-brand-accent" />
                  {siteConfig.license}
                </div>
                <Button
                  render={<a href={siteConfig.phoneHref} />}
                  nativeButton={false}
                  className="mt-3 mx-3 bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-semibold"
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
