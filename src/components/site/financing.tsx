import { CheckCircle2, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  "Visa",
  "Mastercard",
  "Amex",
  "Discover",
  "Apple Pay",
  "Buy Now, Pay Later",
];

export function Financing() {
  return (
    <section id="financing" className="bg-white py-5 sm:py-7 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark text-white px-4 py-4 sm:px-6 sm:py-5 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left: Badges + Heading + Perks */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                  <Sparkles className="size-3 text-brand-accent shrink-0" />
                  <span>Affordable Homeowner Financing</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  <CheckCircle2 className="size-3 text-emerald-400 shrink-0" />
                  <span>Buy Now, Pay Later Options Available</span>
                </span>
              </div>

              <h2 className="mt-2 text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-white leading-tight">
                0% APR Financing on Water Heaters, Sewer Lines &amp; Repiping
              </h2>

              <p className="mt-1 text-xs text-slate-300 leading-snug">
                Low monthly payments from $79/mo • 60-second soft check (no credit impact) • Zero prepayment penalties.
              </p>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-300">
                <span className="text-slate-400 font-semibold">Accepted:</span>
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded bg-white/10 px-2 py-0.5 font-medium text-slate-200"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Single CTA Button */}
            <div className="shrink-0 lg:w-64">
              <Button
                render={<a href="#estimate" />}
                nativeButton={false}
                className="w-full bg-brand-accent hover:bg-sky-300 text-brand-navy-dark font-extrabold text-xs sm:text-sm h-10 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <DollarSign className="size-4 shrink-0 mr-1" />
                Apply With Your Estimate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
