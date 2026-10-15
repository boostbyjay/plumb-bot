import { CheckCircle2, Clock, Tag, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  "No-obligation estimates",
  "Background-checked techs",
  "Upfront pricing",
  "Master technician on job",
];

export function DispatchBanner() {
  return (
    <section>
      <div className="border-y border-brand-accent/20 bg-brand-navy-dark/95 py-2.5 sm:py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Left: $75 Voucher promo */}
            <div className="flex items-center gap-2.5 text-center sm:text-left">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                <Tag className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                  Instant Voucher Offer
                </p>
                <p className="text-sm font-bold text-white sm:text-base">
                  $75 Repair Voucher — Unlocked when you submit a form or text a photo
                </p>
              </div>
            </div>

            {/* Center: Same-Day Dispatch + trust bullets */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-brand-accent" />
                <span className="text-xs font-bold text-white sm:text-sm">
                  Same-Day Dispatch
                </span>
              </div>
              <ul className="hidden items-center gap-3 text-xs text-slate-300 lg:flex">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1">
                    <CheckCircle2 className="size-3 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Actions */}
            <div className="flex w-full sm:w-auto items-center justify-center gap-2">
              <Button
                render={<a href="#estimate" />}
                nativeButton={false}
                size="sm"
                className="w-full sm:w-auto shrink-0 bg-brand-accent px-4 py-2 text-xs sm:text-sm font-bold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                Claim $75 Voucher
              </Button>
              <Button
                render={<a href={siteConfig.smsHref} />}
                nativeButton={false}
                size="sm"
                variant="outline"
                className="hidden sm:inline-flex shrink-0 border-white/30 bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-white/20"
              >
                <MessageSquareText className="size-3.5 mr-1 text-brand-accent" />
                Text Photo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
