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
    <section id="financing" className="bg-white py-14 sm:py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark text-white shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left 7 cols: Financing details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/40 bg-brand-accent/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
                <Sparkles className="size-3.5" />
                <span>Affordable Homeowner Financing</span>
              </div>

              <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                0% APR Financing on Water Heaters, Sewer Lines &amp; Major Repiping
              </h2>

              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                A sudden plumbing emergency shouldn&apos;t drain your savings. JJJ Plumbing offers flexible financing options designed to keep your home running smoothly with affordable monthly installments.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {financingPerks.map((perk) => (
                  <div key={perk.title} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
                    <CheckCircle2 className="size-4.5 text-brand-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{perk.title}</h4>
                      <p className="mt-0.5 text-xs text-slate-300 leading-snug">{perk.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Methods Badges */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  All Major Payment Methods Accepted
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {paymentMethods.map((method) => (
                    <span
                      key={method}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200"
                    >
                      <CreditCard className="size-3 text-brand-accent" />
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Fast Call to Action Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 sm:p-7 text-center shadow-lg">
                <span className="inline-block rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                  Pre-Approval Available
                </span>
                
                <h3 className="mt-3 text-xl sm:text-2xl font-black text-white">
                  Get Flexible Payment Options Today
                </h3>
                
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Ask our master plumber for financing options during your on-site estimate or submit a request online.
                </p>

                <div className="mt-5 space-y-2.5">
                  <Button
                    render={<a href="#estimate" />}
                    nativeButton={false}
                    className="w-full bg-brand-accent hover:bg-sky-300 text-brand-navy-dark font-extrabold text-sm h-11 rounded-xl shadow-md"
                  >
                    <DollarSign className="size-4 shrink-0 mr-1" />
                    Apply With Your Estimate
                  </Button>

                  <Button
                    render={<a href={siteConfig.phoneHref} />}
                    nativeButton={false}
                    variant="outline"
                    className="w-full border-white/25 bg-white/5 hover:bg-white/15 text-white font-bold text-sm h-11 rounded-xl"
                  >
                    <Phone className="size-4 shrink-0 mr-1 text-brand-accent" />
                    Call to Inquire: {siteConfig.phone}
                  </Button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-300">
                  <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />
                  <span>Licensed &amp; Insured • {siteConfig.license}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
