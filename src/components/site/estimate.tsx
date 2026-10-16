"use client";

import { Phone, MessageSquare } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function Estimate() {
  return (
    <section id="estimate" className="bg-slate-50 py-10 sm:py-14 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-500 target:ring-2 target:ring-brand-accent/60 target:shadow-2xl">
          <div className="grid lg:grid-cols-5">
            <div className="bg-brand-navy p-5 sm:p-7 text-white lg:col-span-2 flex flex-col justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Same-Day Dispatch • 5-Min Reply
                </div>

                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Request Your Free Estimate
                </h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300">
                  Fill out the 4 quick boxes on the right — our dispatch team will text or call you within 5 minutes with upfront pricing.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Prefer to Call or Text Directly?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 transition-colors hover:bg-white/15"
                  >
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">
                        Call Us Directly
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-base font-extrabold text-brand-accent">
                        <Phone className="size-4 shrink-0" />
                        {siteConfig.phone}
                      </span>
                    </div>
                  </a>

                  <a
                    href={siteConfig.smsHref}
                    className="flex items-center justify-between rounded-xl border border-brand-accent/35 bg-brand-accent/15 px-4 py-3 transition-colors hover:bg-brand-accent/25"
                  >
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                        Fast Photo Quote
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-base font-extrabold text-white">
                        <MessageSquare className="size-4 shrink-0 text-brand-accent" />
                        Text Us a Photo →
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 lg:col-span-3 flex flex-col justify-center">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
