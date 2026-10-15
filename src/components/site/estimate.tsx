"use client";

import { Phone } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function Estimate() {
  return (
    <section id="estimate" className="bg-slate-50 py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-5">
            <div className="bg-brand-navy p-8 text-white lg:col-span-2 sm:p-10">
              <span className="inline-block rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
                Instant $75 Voucher
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Get a Fast, Upfront Quote
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                Submit this quick form to automatically unlock your <strong>$75 repair voucher</strong>. Our dispatch team will call you back within 5 minutes to confirm details and pricing.
              </p>

              {/* Text a photo alternative */}
              <div className="mt-6 rounded-xl border border-brand-accent/30 bg-brand-navy-dark/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                  Snap &amp; Text a Photo
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Don&apos;t want to type? Text a quick photo or video of your leak to lock in your voucher.
                </p>
                <a
                  href={siteConfig.smsHref}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-accent hover:text-sky-200"
                >
                  💬 Text a Photo to {siteConfig.phone} →
                </a>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Active Emergency? Call Now:
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-1 flex items-center gap-2 text-lg font-bold text-brand-accent hover:text-sky-200"
                >
                  <Phone className="size-5" />
                  {siteConfig.phone}
                </a>
                <p className="mt-1 text-xs text-slate-400">
                  {siteConfig.hours.emergency}
                </p>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:col-span-3">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
