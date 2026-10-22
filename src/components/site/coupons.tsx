"use client";

import { Check, Copy, Sparkles, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { bounceScroll } from "@/components/site/header";

export function Coupons() {
  const [open, setOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }

    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("[data-specials-trigger]");
      if (link) {
        e.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("jjj:open-specials", handleOpenEvent);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("jjj:open-specials", handleOpenEvent);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  function handleClaim(code: string, serviceId?: string) {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("jjj:select-coupon", {
          detail: { code, serviceId },
        })
      );
      const el = document.getElementById("estimate");
      if (el) {
        setTimeout(() => bounceScroll(el), 50);
      }
    }
  }

  function handleCopy(code: string) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  }

  return (
    <>
      {/* 1. On-Page Web Specials Strip (Directly Visible on Page Canvas) */}
      <section id="specials" className="bg-slate-50/70 py-12 sm:py-16 scroll-mt-20 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
              Limited-Time Web Specials
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl text-balance">
              Exclusive Plumbing &amp; Drain Coupons
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Lock in upfront savings on your next repair, drain cleaning, or water heater installation. Mention over the phone or tap to claim directly.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.coupons.map((coupon) => {
              const isPopular = coupon.popular;
              return (
                <div
                  key={coupon.id}
                  className={`relative flex flex-col justify-between rounded-2xl border-2 border-dashed bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                    isPopular
                      ? "border-brand-accent bg-gradient-to-b from-sky-50/50 to-white ring-1 ring-brand-accent/30"
                      : "border-slate-300 hover:border-brand-accent/70"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 right-4 rounded-full bg-brand-accent px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-brand-navy-dark shadow-xs">
                      {coupon.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {coupon.badge}
                      </span>
                      <span className="text-emerald-600 font-extrabold text-xs">{coupon.savings}</span>
                    </div>

                    <div className="mt-3">
                      <span className="text-3xl font-black text-brand-navy tracking-tight">
                        {coupon.amount}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-slate-900 leading-snug">
                        {coupon.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-dashed border-slate-200">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 mb-2.5">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800">
                        CODE: {coupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className="text-xs text-brand-blue hover:text-brand-navy font-semibold flex items-center gap-1 p-0.5 cursor-pointer"
                        title="Copy code"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600 text-[11px]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleClaim(coupon.code, coupon.serviceId)}
                      className="w-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-xl h-10 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Claim This Offer</span>
                      <ArrowRight className="size-3.5 ml-1.5" />
                    </Button>

                    <p className="mt-2 text-[10px] text-slate-400 text-center leading-tight">
                      {coupon.disclaimer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hero / Senior / Military Discount Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-brand-blue/30 bg-sky-50/80 p-4 sm:p-5">
            <div className="text-center sm:text-left">
              <span className="text-sm font-extrabold text-brand-navy block sm:inline">
                🎖️ Senior, Military &amp; First Responder Discount — Extra 10% OFF
              </span>
              <p className="text-xs text-slate-600 mt-1 sm:mt-0.5">
                Thank you for serving our community. Mention code <strong className="font-mono text-brand-navy">HERO10</strong> for 10% off any qualifying repair (up to $150).
              </p>
            </div>
            <Button
              type="button"
              onClick={() => handleClaim("HERO10")}
              className="shrink-0 bg-brand-blue hover:bg-brand-navy text-white text-xs font-bold h-9 px-4 rounded-xl cursor-pointer"
            >
              Claim 10% Off
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Modal Dialog (Preserved for Header, Buttons & Mobile Sticky Bar) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl p-4 sm:p-6 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200">
          <DialogHeader className="text-left pb-3 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-navy w-fit">
              <Sparkles className="size-3 text-brand-accent" />
              <span>Limited-Time Web Specials</span>
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight mt-1.5">
              Exclusive Plumbing Coupons
            </DialogTitle>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Lock in upfront savings on your next repair, drain clearing, or installation. Tap claim to lock in your offer online or copy the code to mention over the phone.
            </p>
          </DialogHeader>

          <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
            {siteConfig.coupons.map((coupon) => {
              const isPopular = coupon.popular;
              return (
                <div
                  key={coupon.id}
                  className={`relative flex flex-col justify-between rounded-xl border-2 border-dashed bg-white p-4 shadow-sm transition-all hover:border-brand-accent ${
                    isPopular
                      ? "border-brand-accent bg-gradient-to-b from-sky-50/40 to-white ring-1 ring-brand-accent/30"
                      : "border-slate-200"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-brand-accent px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-brand-navy-dark shadow-sm">
                      {coupon.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {coupon.badge}
                      </span>
                      <span className="text-emerald-600 font-bold text-xs">{coupon.savings}</span>
                    </div>

                    <div className="mt-2.5">
                      <span className="text-2xl font-black text-brand-navy">
                        {coupon.amount}
                      </span>
                      <h3 className="mt-0.5 text-base font-bold text-slate-900 leading-snug">
                        {coupon.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                        {coupon.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1 mb-2.5">
                      <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800">
                        CODE: {coupon.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(coupon.code)}
                        className="text-xs text-brand-blue hover:text-brand-navy font-semibold flex items-center gap-1 p-0.5"
                        title="Copy code"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-600 text-[11px]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleClaim(coupon.code, coupon.serviceId)}
                      className="w-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg h-9 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Claim This Offer</span>
                      <ArrowRight className="size-3 ml-1" />
                    </Button>

                    <p className="mt-1.5 text-[10px] text-slate-400 text-center leading-tight">
                      {coupon.disclaimer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 rounded-xl border border-brand-blue/25 bg-sky-50/70 px-4 py-3 text-xs">
            <div className="text-center sm:text-left">
              <span className="font-extrabold text-brand-navy">
                🎖️ Senior, Military &amp; First Responder Discount — 10% OFF
              </span>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Thank you for serving our community. Mention code <strong className="font-mono text-brand-navy">HERO10</strong> for 10% off any standard repair (up to $150).
              </p>
            </div>
            <Button
              type="button"
              onClick={() => handleClaim("HERO10")}
              size="sm"
              className="shrink-0 bg-brand-blue hover:bg-brand-navy text-white text-[11px] font-bold h-8 px-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Claim 10% Off
            </Button>
          </div>

          <div className="mt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-700 text-center sm:text-left">
            <span className="flex items-center gap-1.5 font-bold text-emerald-800 text-[11px] sm:text-xs">
              <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
              100% Diagnostic Fee Credited Toward Approved Repair
            </span>
            <span className="text-slate-500 text-[11px]">
              {siteConfig.bilingual} Disponible
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
