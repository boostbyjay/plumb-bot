import { ShieldCheck, DollarSign, BadgeCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const guarantees = [
  {
    icon: ShieldCheck,
    title: '"Fixed Right or It\'s Free"',
    badge: "Workmanship Promise",
    description:
      "If our repair doesn't solve your plumbing issue, we come back and make it right at zero additional cost to you. We stand behind every job 100%.",
  },
  {
    icon: DollarSign,
    title: "100% Upfront Pricing",
    badge: "Zero Surprises",
    description:
      "You approve the exact quote before we turn a wrench. No hidden travel charges, no dispatch add-ons, and no overtime surprises on your invoice.",
  },
  {
    icon: BadgeCheck,
    title: "Diagnostic Credited",
    badge: "100% Applied",
    description:
      "Your service evaluation fee is completely credited toward the cost of any approved repair or replacement. You never pay twice.",
  },
  {
    icon: Award,
    title: "Free 2nd Opinions",
    badge: "Sewer & Repiping",
    description:
      "Got an expensive quote from another company? We provide a 100% free second opinion and camera review to protect you from unnecessary work.",
  },
];

export function Guarantees() {
  return (
    <section className="bg-slate-100/80 py-10 sm:py-14 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Risk-Free Guarantees
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Why Southern California Homeowners Trust JJJ Plumbing
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Hiring a contractor shouldn&apos;t feel like a gamble. We eliminate the risk with 4 ironclad promises on every service call.
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-brand-accent">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {g.badge}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-base sm:text-lg font-bold text-brand-navy">
                    {g.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Owner-Operator vs. Big-Box Comparison Table */}
        <div className="mt-10 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="bg-brand-navy px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-accent">
                The Owner-Operator Advantage
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                How JJJ Plumbing Compares to Big-Box Franchise Companies
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-bold text-emerald-300 w-fit">
              ✓ Zero Commissioned Sales Reps
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            {[
              {
                feature: "Who Shows Up at Your Door",
                jjj: "Licensed Master Plumber & Owner-Operator",
                bigBox: "Junior Tech Paid on Sales Commission",
              },
              {
                feature: "Pricing Structure",
                jjj: "100% Upfront Flat-Rate Quote Before Work",
                bigBox: "Low Bait-and-Switch Fee + Surprise Add-Ons",
              },
              {
                feature: "Service & Diagnostic Fee",
                jjj: "100% Credited Toward Your Approved Repair",
                bigBox: "Non-Refundable Dispatch & Trip Charges",
              },
              {
                feature: "High-Ticket Sewer / Repipe Quotes",
                jjj: "Honest Repair-First Approach + Free 2nd Opinion",
                bigBox: "High-Pressure $10,000+ Full Replacement Push",
              },
            ].map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-3.5 sm:px-8 items-center"
              >
                <div className="sm:col-span-4 font-bold text-brand-navy">
                  {row.feature}
                </div>
                <div className="sm:col-span-4 flex items-center gap-2 font-semibold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 rounded-xl px-3 py-2">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span>{row.jjj}</span>
                </div>
                <div className="sm:col-span-4 flex items-center gap-2 text-slate-500 bg-slate-50 rounded-xl px-3 py-2">
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-slate-300 text-[10px] font-bold text-slate-700">
                    ✕
                  </span>
                  <span className="line-through decoration-slate-400/70">{row.bigBox}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 px-6 py-4 sm:px-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm font-medium text-slate-600 text-center sm:text-left">
              Ready for honest, master-plumber diagnostics with zero sales pressure?
            </p>
            <Button
              render={<a href="#estimate" />}
              nativeButton={false}
              size="lg"
              className="w-full sm:w-auto bg-brand-accent px-6 font-extrabold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer shrink-0"
            >
              Get Your Free Upfront Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
