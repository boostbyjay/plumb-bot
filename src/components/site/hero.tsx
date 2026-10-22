import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, BadgeCheck, DollarSign, Award, Star, Camera, Tag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { photoBlur } from "@/lib/photo-blur";
import { LeadForm } from "@/components/site/lead-form";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Fixed Right or Free" },
  { icon: DollarSign, label: "Diagnostic Fee Credited" },
  { icon: Award, label: "Free 2nd Opinion on Major Repairs" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-navy text-white min-h-[calc(100svh-3.75rem)] lg:min-h-[calc(100vh-4.5rem)] flex flex-col justify-center">
      {/* Background Image with Dark Vignette Overlay for Crisp Contrast */}
      <div className="absolute inset-0">
        <Image
          src="/work/hydrojetting-truck-hero-1920.jpg"
          alt="JJJ Plumbing truck-mounted hydro jetting rig, 4000 PSI at 18 GPM, on a job site"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={photoBlur["hydrojetting-truck-hero"]}
          className="object-cover object-[center_35%]"
        />
        {/* Responsive contrast gradient: ensures 100% WCAG AAA text contrast across mobile & desktop */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/90 to-brand-navy-dark/97 lg:bg-gradient-to-r lg:from-brand-navy-dark/95 lg:via-brand-navy/90 lg:to-brand-navy-dark/75" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:py-14 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1">
        {/* Left Column: Headlines, Trust Pills, Quick Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
          {/* Badges: Google Rating + Live Dispatch + Service Areas */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={siteConfig.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 hover:bg-amber-400/20 transition-colors"
            >
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span>4.9 / 5.0 Rating on Google</span>
            </a>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Same-Day 45-Min Dispatch</span>
            </span>

            <Link
              href="/neighborhoods"
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-200 hover:bg-sky-500/25 transition-all"
            >
              <MapPin className="size-3 text-brand-accent shrink-0" />
              <span>Serving 75+ SoCal Cities</span>
            </Link>
          </div>

          <h1 className="mt-4 sm:mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.85rem] xl:text-[3.15rem] break-words text-balance text-white">
            Licensed Plumbing &amp; Drain Experts Across Greater LA, SGV &amp; Orange County.
          </h1>

          <p className="mt-3.5 sm:mt-4 max-w-xl text-base text-slate-200 sm:text-lg text-pretty leading-relaxed">
            Fast 45-minute mobile dispatch across 75+ Southern California communities. Master plumbers on every call, upfront pricing, and guaranteed workmanship.
          </p>

          {/* Action Buttons: Symmetrical 2-Button Grid */}
          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 sm:max-w-xl">
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              size="lg"
              className="h-11 sm:h-12 w-full bg-brand-accent px-4 sm:px-5 text-sm sm:text-base font-extrabold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <Phone className="size-4.5 shrink-0 mr-1.5" />
              Call {siteConfig.phone}
            </Button>

            <Button
              render={<a href={siteConfig.smsHref} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-11 sm:h-12 w-full border-white/30 bg-white/10 px-4 sm:px-5 text-sm sm:text-base font-bold text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <Camera className="size-4 shrink-0 mr-1.5 text-brand-accent" />
              Text Photo for Quote
            </Button>
          </div>

          {/* Unified Specials & Regional Dispatch Card */}
          <div className="mt-3.5 rounded-2xl border border-white/15 bg-white/[0.06] p-3 sm:p-3.5 backdrop-blur-xs sm:max-w-xl shadow-lg">
            {/* Web Specials Ribbon */}
            <a
              href="#specials"
              data-specials-trigger="true"
              className="flex items-center justify-between rounded-xl border border-amber-400/35 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-500/20 hover:border-amber-400/60 transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Tag className="size-3.5 text-amber-400 shrink-0" />
                <span><strong className="text-white font-extrabold">Save $75 Off</strong> Any Service Today</span>
              </span>
              <span className="text-[11px] font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View Web Specials →
              </span>
            </a>

            {/* Direct Mobile Dispatch Coverage */}
            <div className="mt-2.5 pt-2.5 border-t border-white/10">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-brand-accent">
                  <MapPin className="size-3 text-brand-accent shrink-0" />
                  Direct Mobile Dispatch Across:
                </span>
                <Link
                  href="/neighborhoods"
                  className="text-[11px] font-bold text-sky-300 hover:text-white transition-colors shrink-0"
                >
                  75+ Cities Served →
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-200">
                <span className="font-semibold text-white">San Gabriel Valley</span>
                <span className="text-white/40">•</span>
                <span className="font-semibold text-white">Los Angeles &amp; Westside</span>
                <span className="text-white/40">•</span>
                <span className="font-semibold text-white">San Fernando Valley</span>
                <span className="text-white/40">•</span>
                <span className="font-semibold text-white">Orange County</span>
                <span className="text-white/40">•</span>
                <span className="font-semibold text-white">South Bay</span>
              </div>
            </div>
          </div>

          <p className="mt-3.5 text-[11px] sm:text-xs text-slate-300/90 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-emerald-300 font-semibold">✓ Diagnostic fee credited to repair</span>
            <span>•</span>
            <span className="text-brand-accent font-semibold">✓ 0% APR financing</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">✓ {siteConfig.bilingual}</span>
          </p>

          <dl className="mt-4 sm:mt-5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 min-w-0">
                <Icon className="size-4 shrink-0 text-brand-accent" />
                <dt className="text-xs font-semibold text-slate-100 leading-snug">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Right Column (Desktop Only): High-Converting Embedded Estimate Card */}
        <div className="hidden lg:block lg:col-span-5 min-w-0">
          <div className="rounded-3xl border border-white/20 bg-white p-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                $75 Voucher Applied
              </span>
              <span className="text-[11px] font-bold text-slate-500">5-Min Callback</span>
            </div>
            <h2 className="text-2xl font-black text-brand-navy tracking-tight">
              Request Free Estimate
            </h2>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 rounded-lg p-1.5 border border-emerald-200 mb-2">
              <MapPin className="size-3.5 text-emerald-600 shrink-0" />
              <span>Serving All 75+ Cities in LA, SGV &amp; OC • Same-Day Dispatch</span>
            </div>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Upfront flat pricing approved before work begins. Master plumbers on call.
            </p>
            <LeadForm compact defaultCouponCode="JJJ-75OFF" />
          </div>
        </div>
      </div>
    </section>
  );
}
