import { CheckCircle2, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  "Free, no-obligation estimates",
  "Background-checked technicians",
  "Upfront pricing",
  "Master technician on every job",
  "25 years experience",
];

export function DispatchBanner() {
  return (
    <section>
      <div className="bg-brand-navy/90 py-3 sm:py-3.5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Left: 10% Off promo */}
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-accent/20">
                <Tag className="size-4 text-brand-accent" />
              </span>
              <div>
                <p className="text-sm font-bold text-white sm:text-base">
                  Get 10% Off Your First Visit — Estimate Online
                </p>
              </div>
            </div>

            {/* Center: Same-Day Dispatch + trust bullets */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-brand-accent" />
                <span className="text-sm font-bold text-white">
                  Same-Day Dispatch
                </span>
              </div>
              <ul className="hidden items-center gap-3 text-xs text-slate-200 md:flex">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1"
                  >
                    <CheckCircle2 className="size-3 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: CTA */}
            <Button
              render={<a href="#estimate" />}
              nativeButton={false}
              size="sm"
              className="shrink-0 bg-brand-accent px-5 text-sm font-bold text-brand-navy-dark hover:bg-sky-300"
            >
              Claim 10% Off + Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
