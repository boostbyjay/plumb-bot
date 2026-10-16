import Image from "next/image";
import { Phone, ShieldCheck, BadgeCheck, DollarSign, Award, Star, Camera, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { photoBlur } from "@/lib/photo-blur";
import { QuickQuoteModal } from "@/components/site/quick-quote-modal";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Fixed Right or Free" },
  { icon: DollarSign, label: "Diagnostic Fee Credited" },
  { icon: Award, label: "Free 2nd Opinion on Sewers" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-navy text-white min-h-[calc(100svh-3.75rem)] lg:min-h-[calc(100vh-4.5rem)] flex flex-col">
      <div className="grid lg:grid-cols-2 min-h-0 flex-1 w-full max-w-full">
        {/* Left: Hero Image */}
        <div className="relative hidden lg:block h-full min-h-full">
          <Image
            src="/work/hydrojetting-truck-hero-1920.jpg"
            alt="JJJ Plumbing truck-mounted hydro jetting rig, 4000 PSI at 18 GPM, on a job site"
            fill
            priority
            sizes="50vw"
            placeholder="blur"
            blurDataURL={photoBlur["hydrojetting-truck-hero"]}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-brand-navy/10" />
        </div>

        {/* Mobile/tablet: same photo as a background layer behind the copy */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/work/hydrojetting-truck-hero-1024.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={photoBlur["hydrojetting-truck-hero"]}
            className="object-cover object-[center_28%]"
          />
          {/* keeps headline contrast well above WCAG AA over the photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/92 to-brand-navy-dark/97" />
        </div>

        {/* Right: Content */}
        <div className="relative z-10 flex min-w-0 max-w-full flex-1 flex-col justify-between lg:justify-center px-4 pt-7 pb-20 sm:px-6 sm:py-12 lg:py-12 lg:px-8">
          {/* Badges: Google Rating + Live Dispatch */}
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
              <span>Same-Day Dispatch</span>
            </span>
          </div>

          <h1 className="mt-4 sm:mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.15rem] break-words text-balance">
            Licensed Plumbing &amp; Drain Experts — Upfront Pricing, Same-Day Dispatch, 100% Guaranteed.
          </h1>

          <p className="mt-3.5 sm:mt-5 max-w-xl text-base text-slate-300 sm:text-lg text-pretty">
            From emergency leak repairs to sewer replacements, JJJ Plumbing arrives on time with master plumbers, upfront pricing, and guaranteed workmanship.
          </p>

          <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 sm:max-w-xl">
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              size="lg"
              className="col-span-2 sm:col-span-1 h-11 sm:h-12 w-full bg-brand-accent px-4.5 sm:px-5 text-sm sm:text-base font-bold text-brand-navy-dark hover:bg-sky-300 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <Phone className="size-4.5 shrink-0 mr-1.5" />
              Call {siteConfig.phone}
            </Button>

            <Button
              render={<a href="#specials" data-specials-trigger="true" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="col-span-2 sm:col-span-1 h-11 sm:h-12 w-full border-brand-accent/60 bg-brand-accent/10 px-4.5 sm:px-5 text-sm sm:text-base font-bold text-brand-accent hover:bg-brand-accent hover:text-brand-navy-dark transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <Tag className="size-4 shrink-0 mr-1.5" />
              View Web Specials
            </Button>

            <Button
              render={<a href={siteConfig.smsHref} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="col-span-1 h-11 sm:h-12 w-full border-white/30 bg-white/10 px-3 sm:px-5 text-xs sm:text-base font-bold text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
            >
              <Camera className="size-4 shrink-0 mr-1.5 text-brand-accent" />
              <span className="sm:hidden">Text Photo</span>
              <span className="hidden sm:inline">Text Photo for Quote</span>
            </Button>

            <div className="col-span-1">
              <QuickQuoteModal />
            </div>
          </div>

          <p className="mt-3 text-[11px] sm:text-xs text-slate-300/90 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="text-emerald-300 font-semibold">✓ Diagnostic credited to repair</span>
            <span>•</span>
            <span className="text-brand-accent font-semibold">✓ 0% APR financing</span>
            <span>•</span>
            <span className="text-amber-300 font-semibold">✓ {siteConfig.bilingual}</span>
          </p>

          <dl className="mt-4 sm:mt-5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
      </div>

      {/* Bottom: Full-width dispatch bar */}
    </section>
  );
}
