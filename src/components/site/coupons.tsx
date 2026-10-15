"use client";

import { Check, Copy, Sparkles, Tag, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function Coupons() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  function handleClaim(code: string, serviceId?: string) {
    if (typeof window !== "undefined") {
      // Dispatch custom event to prefill lead form
      window.dispatchEvent(
        new CustomEvent("jjj:select-coupon", {
          detail: { code, serviceId },
        })
      );

      const el = document.getElementById("estimate");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
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
    <section id="specials" className="bg-slate-100/90 py-12 sm:py-16 border-y border-slate-200 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
            <Sparkles className="size-3.5 text-brand-accent" />
            <span>Limited-Time Web Specials</span>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Exclusive Los Angeles Plumbing Coupons
          </h2>
          <p className="mt-2.5 text-base text-slate-600 sm:text-lg">
            Lock in upfront savings on your next repair, drain clearing, or installation. Mention the coupon code or claim online below.
          </p>
        </div>

        {/* 4-Card Coupons Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.coupons.map((coupon) => {
            const isPopular = coupon.popular;
            return (
              <div
                key={coupon.id}
                className={`relative flex flex-col justify-between rounded-2xl border-2 border-dashed bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                  isPopular
                    ? "border-brand-accent bg-gradient-to-b from-sky-50/50 to-white ring-2 ring-brand-accent/20"
                    : "border-slate-300 hover:border-brand-accent/60"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-brand-navy-dark shadow-sm">
                    {coupon.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                      {coupon.badge}
                    </span>
                    <span className="text-emerald-600 font-bold">{coupon.savings}</span>
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl sm:text-3xl font-black text-brand-navy">
                      {coupon.amount}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-slate-900 leading-snug">
                      {coupon.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {coupon.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-dashed border-slate-200">
                  {/* Coupon Code Pill */}
                  <div className="flex items-center justify-between rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-800">
                      CODE: {coupon.code}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(coupon.code)}
                      className="text-xs text-brand-blue hover:text-brand-navy font-semibold flex items-center gap-1"
                      title="Copy code"
                    >
                      {copiedCode === coupon.code ? (
                        <>
                          <Check className="size-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleClaim(coupon.code, coupon.serviceId)}
                    className="w-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs sm:text-sm font-bold rounded-xl h-10 shadow-sm"
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

        {/* Diagnostic reassurance banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl bg-brand-navy-dark/95 text-white p-3.5 sm:p-4 text-xs sm:text-sm text-center">
          <span className="flex items-center gap-1.5 text-emerald-300 font-bold">
            <ShieldCheck className="size-4 shrink-0" />
            100% Diagnostic Fee Credited to Any Approved Repair
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="flex items-center gap-1.5 text-brand-accent font-bold">
            <Clock className="size-4 shrink-0" />
            Same-Day Dispatch Across LA &amp; San Gabriel Valley
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="text-amber-300 font-bold">
            {siteConfig.bilingual} Disponible
          </span>
        </div>
      </div>
    </section>
  );
}
