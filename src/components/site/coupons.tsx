"use client";

import { Check, Copy, Sparkles, Tag, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Coupons() {
  const [open, setOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }

    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[href='#specials'], a[href='/#specials'], button[data-specials-trigger]");
      if (link) {
        e.preventDefault();
        setOpen(true);
      }
    }

    // Check if loaded with #specials in hash
    if (typeof window !== "undefined" && window.location.hash === "#specials") {
      setOpen(true);
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
      // Dispatch custom event to prefill lead form
      window.dispatchEvent(
        new CustomEvent("jjj:select-coupon", {
          detail: { code, serviceId },
        })
      );

      const el = document.getElementById("estimate");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl p-4 sm:p-6 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200">
        <DialogHeader className="text-left pb-3 border-b border-slate-100">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-navy w-fit">
            <Sparkles className="size-3 text-brand-accent" />
            <span>Limited-Time Web Specials</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight mt-1.5">
            Exclusive Los Angeles Plumbing Coupons
          </DialogTitle>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Lock in upfront savings on your next repair, drain clearing, or installation. Tap claim to lock in your offer online or copy the code to mention over the phone.
          </p>
        </DialogHeader>

        {/* Scrollable Coupons Grid (2 columns on tablet/desktop, stacked on mobile) */}
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
                  {/* Coupon Code Pill */}
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
                    className="w-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold rounded-lg h-9 shadow-sm"
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

        {/* Diagnostic reassurance footer in popup */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-700 text-center sm:text-left">
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
  );
}
