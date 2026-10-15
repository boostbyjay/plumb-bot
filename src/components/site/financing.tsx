import { CheckCircle2, CreditCard, DollarSign, ShieldCheck, Sparkles, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const financingPerks = [
  {
    title: "0% APR Interest Available",
    detail: "Promotional zero-interest plans for up to 18 months on qualifying installations.",
  },
  {
    title: "Low Payments From $79/mo",
    detail: "Predictable, budget-friendly fixed monthly installments for sewer liners and tankless units.",
  },
  {
    title: "60-Second Soft Check",
    detail: "Quick pre-qualification without impacting your personal credit score.",
  },
  {
    title: "Zero Hidden Prepayment Penalties",
    detail: "Pay off your balance whenever you want with absolutely no extra fees.",
  },
];

const paymentMethods = [
  "Visa",
  "Mastercard",
  "American Express",
  "Discover",
  "Apple Pay",
  "Flexible Financing",
];

export function Financing() {
  return (
    <section id="financing" className="bg-white py-8 sm:py-10 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark text-white p-5 sm:p-7 lg:p-8 shadow-lg">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 7 cols: Financing details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand-accent">
                <Sparkles className="size-3 text-brand-accent" />
                <span>Affordable Homeowner Financing</span>
              </div>

              <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-snug">
                0% APR Financing on Water Heaters, Sewer Lines &amp; Repiping
              </h2>

              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Keep your home running smoothly with affordable monthly installments, promotional 0% interest, and 60-second pre-qualification.
              </p>

              {/* Compact 4-perk grid */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
                {financingPerks.map((perk) => (
                  <div key={perk.title} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
                    <CheckCircle2 className="size-3.5 text-brand-accent shrink-0" />
                    <span className="font-semibold text-slate-100 truncate">{perk.title}</span>
                  </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300">
                <span className="text-slate-400 font-medium">Accepted:</span>
                {paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-200"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 5 cols: Compact Action Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-white/15 bg-white/[0.08] p-4 sm:p-5 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">
                    Fast Pre-Approval
                  </span>
                </div>
                
                <h3 className="mt-2 text-base sm:text-lg font-bold text-white">
                  Get Flexible Payment Options
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  Pre-qualify in 60 seconds with no impact on your credit score.
                </p>

                <div className="mt-3.5 grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  <Button
                    render={<a href="#estimate" />}
                    nativeButton={false}
                    className="w-full bg-brand-accent hover:bg-sky-300 text-brand-navy-dark font-extrabold text-xs h-9.5 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  >
                    <DollarSign className="size-3.5 shrink-0 mr-1" />
                    Apply With Your Estimate
                  </Button>

                  <Button
                    render={<a href={siteConfig.phoneHref} />}
                    nativeButton={false}
                    variant="outline"
                    className="w-full border-white/20 bg-white/5 hover:bg-white/15 text-white font-semibold text-xs h-9 rounded-lg"
                  >
                    <Phone className="size-3.5 shrink-0 mr-1 text-brand-accent" />
                    Call {siteConfig.phone}
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
