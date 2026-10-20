import { Award, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section aria-label="Trust Credentials and Guarantees" className="border-b border-slate-200 bg-white py-4 sm:py-5 shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 items-center">
          {/* 1. Google Guaranteed */}
          <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-2.5 sm:p-3 transition-colors hover:bg-emerald-50">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
              <CheckCircle2 className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black tracking-tight text-emerald-950">
                  Google Guaranteed
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-emerald-800 leading-tight truncate">
                Backed up to $1,500
              </p>
            </div>
          </div>

          {/* 2. CSLB Master License */}
          <a
            href={siteConfig.cslbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3 transition-all hover:border-brand-accent/60 hover:bg-white hover:shadow-xs group cursor-pointer"
            title="Verify California Contractor License"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-brand-accent shadow-xs group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <ShieldCheck className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black tracking-tight text-brand-navy group-hover:text-brand-blue flex items-center gap-1">
                {siteConfig.license}
              </span>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 leading-tight truncate">
                Active &amp; Insured • Verify ↗
              </p>
            </div>
          </a>

          {/* 3. BBB A+ Accredited */}
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 sm:p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy text-white shadow-xs">
              <Award className="size-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-black tracking-tight text-brand-navy">
                BBB Accredited
              </span>
              <p className="text-[10px] sm:text-[11px] font-semibold text-amber-700 leading-tight truncate">
                A+ Highest Rating
              </p>
            </div>
          </div>

          {/* 4. 4.9 Star Rating + 500+ Jobs Completed */}
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-2.5 sm:p-3 transition-colors hover:bg-amber-50 cursor-pointer"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
              <Star className="size-5 fill-white text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black tracking-tight text-amber-950">
                  4.9★ Top Rated
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-amber-800 leading-tight truncate">
                500+ Projects in SoCal
              </p>
            </div>
          </a>

          {/* 5. Bilingual & 25 Years */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center justify-between sm:justify-start lg:justify-center gap-2 rounded-xl border border-brand-accent/30 bg-sky-50/60 p-2.5 sm:p-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div>
                <span className="text-xs font-black text-brand-navy block">
                  {siteConfig.bilingual}
                </span>
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 leading-tight">
                  25 Years Serving LA, OC &amp; SGV
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
