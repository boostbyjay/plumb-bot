"use client";

import { CheckCircle2, XCircle, AlertCircle, Sparkles, ArrowRight, Video, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bounceScroll } from "@/components/site/header";

export function JettingVsSnaking() {
  function handleClaimOffer() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("jjj:select-coupon", {
          detail: { code: "HYDRO249", serviceId: "drain-cleaning" },
        })
      );
      const el = document.getElementById("estimate");
      if (el) {
        setTimeout(() => bounceScroll(el), 50);
      }
    }
  }

  return (
    <section className="bg-slate-50 py-14 sm:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Equipment Superiority
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl text-balance">
            Why Our 4,000 PSI Hydro-Jetter Saves You Thousands Over Cheap Snaking
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Most plumbers only carry basic hand-crank snakes that poke a temporary hole. Discover why our commercial truck-mounted hydro-jetting rig permanently fixes recurring sewer and drain clogs.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
          {/* Column 1: Traditional Drain Snake */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
                  Temporary Relief
                </span>
                <span className="text-xs font-semibold text-slate-400">Standard Hand Snake</span>
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Traditional Mechanical Snaking
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Punches a narrow hole through soft obstructions without cleaning the pipe walls.
              </p>

              <ul className="mt-6 space-y-3.5 border-t border-slate-100 pt-5 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                  <span>
                    <strong>Only pokes a 1-inch opening:</strong> Fluid passes temporarily, but leaves 80% of hardened grease, soap scum, and sludge behind.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                  <span>
                    <strong>Clogs return in 3–6 weeks:</strong> Remaining grease and debris quickly collapse back into the hole, causing another emergency backup.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-5 shrink-0 text-red-500 mt-0.5" />
                  <span>
                    <strong>Leaves tree roots intact:</strong> Snake blades push around root balls rather than shearing them clean at the joint.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle className="size-5 shrink-0 text-amber-500 mt-0.5" />
                  <span>
                    <strong>Costly recurring cycles:</strong> Paying $250 multiple times a year adds up to thousands with zero permanent resolution.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-4 border border-slate-200/80 text-center">
              <span className="text-xs font-bold text-slate-700 block">The Reality:</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Like pushing a stick through a clogged straw — the build-up stays behind.
              </p>
            </div>
          </div>

          {/* Column 2: JJJ 4,000 PSI Truck-Mounted Hydro-Jetting (Highlighted) */}
          <div className="rounded-3xl border-2 border-brand-accent bg-white p-6 sm:p-8 shadow-xl flex flex-col justify-between ring-1 ring-brand-accent/40 relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-brand-accent px-4 py-1 text-xs font-black uppercase tracking-wider text-brand-navy-dark rounded-bl-xl shadow-xs">
              Permanent Fix
            </span>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy">
                <Sparkles className="size-4 text-brand-blue" />
                <span>Commercial Rig Performance</span>
              </div>

              <h3 className="mt-2 text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                JJJ 4,000 PSI Hydro-Jetting
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                18 GPM surgical water pressure scours the entire circumference back to factory diameter.
              </p>

              <ul className="mt-6 space-y-3.5 border-t border-slate-100 pt-5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Scours 100% of the pipe wall:</strong> 360-degree rotating jetter nozzles blast away grease, scale, and mineral sludge down to bare pipe.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Pulverizes aggressive tree roots:</strong> High-pressure laser-jet stream cuts intrusive roots flush with pipe walls.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Free HD Sewer Camera Inspection included:</strong> We visually inspect your line before and after to verify 100% clean flow.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="size-5 shrink-0 text-brand-blue mt-0.5" />
                  <span>
                    <strong>Extends pipe life for years:</strong> Restores full gravity drainage with zero yard excavation or jackhammering required.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-slate-200">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-emerald-800">Special Offer Available:</span>
                <span className="font-extrabold text-brand-navy">$249 Web Special (Save $200+)</span>
              </div>
              <Button
                type="button"
                onClick={handleClaimOffer}
                className="w-full bg-brand-accent hover:bg-sky-300 text-brand-navy-dark font-black h-11 text-sm rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <span>Claim $249 Hydro-Jetting Special</span>
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
