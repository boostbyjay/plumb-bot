"use client";

import { Phone } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function Estimate() {
  return (
    <section id="estimate" className="bg-slate-50 py-16 sm:py-24 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-500 target:ring-2 target:ring-brand-accent/60 target:shadow-2xl">
          <div className="grid lg:grid-cols-5">
            <div className="bg-brand-navy p-5 sm:p-7 text-white lg:col-span-2 flex flex-col justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Dispatch Active • 5-Min Text Reply
                </div>

                <h2 className="mt-2.5 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  Request Your Free Estimate
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm leading-snug text-slate-300">
                  Pick your window below — our team texts you within 5 minutes with upfront pricing. 100% of diagnostic credited to repair.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                <a
                  href={siteConfig.phoneHref}
                  className="flex flex-col justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 transition-colors hover:bg-white/10"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Call 24/7 Dispatch
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-brand-accent">
                    <Phone className="size-3.5 shrink-0" />
                    {siteConfig.phone}
                  </span>
                </a>

                <a
                  href={siteConfig.smsHref}
                  className="flex flex-col justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-3 py-2.5 transition-colors hover:bg-brand-accent/20"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">
                    Fast Photo Quote
                  </span>
                  <span className="mt-0.5 text-xs sm:text-sm font-extrabold text-white">
                    💬 Text Us a Photo →
                  </span>
                </a>
              </div>
            </div>
            <div className="p-5 sm:p-8 lg:col-span-3">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
