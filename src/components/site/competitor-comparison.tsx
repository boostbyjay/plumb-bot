import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

type ComparisonRow = {
  feature: string;
  jjj: string;
  jjjSub?: string;
  socalChains: string;
  socalChainsType: "warning" | "negative";
  handymen: string;
  handymenType: "negative" | "warning";
};

const rows: ComparisonRow[] = [
  {
    feature: "Pricing & Quotes",
    jjj: "100% Upfront Written Quote",
    jjjSub: "Approved in writing before a single wrench is turned",
    socalChains: "Commission-based technician quotes; frequent mid-job add-ons",
    socalChainsType: "warning",
    handymen: "Verbal guesses that often double once walls or pipes are opened",
    handymenType: "negative",
  },
  {
    feature: "Diagnostic Service Fee",
    jjj: "100% Credited to Repair",
    jjjSub: "Applied directly to approved work — you never pay twice",
    socalChains: "$150–$275 non-refundable dispatch fee kept regardless",
    socalChainsType: "negative",
    handymen: "Unpredictable travel fees or zero formal evaluation",
    handymenType: "warning",
  },
  {
    feature: "Pricing vs. Overhead",
    jjj: "20–35% Lower than Franchises",
    jjjSub: "Independent local master plumbers — zero corporate franchise or TV billboard markups",
    socalChains: "Inflated rates to pay for multi-million dollar TV ads, celebrity spokespeople & corporate layers",
    socalChainsType: "warning",
    handymen: "Cheap initial quote, but costly mistakes with zero warranty or recourse",
    handymenType: "negative",
  },
  {
    feature: "Major Plumbing 2nd Opinions",
    jjj: "100% Free Diagnostic Review",
    jjjSub: "Free review on copper repiping, slab leaks, water heaters & sewer jobs",
    socalChains: "$250+ fee with high-pressure sales quotas to push full yard excavation or whole-home repiping",
    socalChainsType: "negative",
    handymen: "Cannot perform commercial trenchless CIPP lining or electronic leak detection",
    handymenType: "negative",
  },
  {
    feature: "Drain Cleaning Rig",
    jjj: "4,000 PSI Truck-Mounted Rig",
    jjjSub: "Heavy-duty US Jetter blasts grease, scale & roots to bare metal",
    socalChains: "Often dispatch junior techs with basic snakes or subcontract big jobs",
    socalChainsType: "warning",
    handymen: "Lightweight hand snakes that only punch a temporary 1-inch hole",
    handymenType: "negative",
  },
  {
    feature: "State License & Insurance",
    jjj: "CA CSLB Lic #842875 + $2M Policy",
    jjjSub: "Fully bonded, licensed, and insured for 25 continuous years",
    socalChains: "Licensed corporate entities",
    socalChainsType: "warning",
    handymen: "Unlicensed. Homeowner assumes 100% financial liability if worker is injured or floods property",
    handymenType: "negative",
  },
  {
    feature: "Spotless Home Protection",
    jjj: "Shoe Covers & Runners Guaranteed",
    jjjSub: "Clean boots & drop cloths on every single call without asking",
    socalChains: "Inconsistent depending on the apprentice or subcontractor dispatched",
    socalChainsType: "warning",
    handymen: "Rarely provide floor protection or sanitizing cleanup",
    handymenType: "negative",
  },
];

export function CompetitorComparison() {
  return (
    <section className="bg-white py-14 sm:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            The Honest Difference
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl text-balance">
            How JJJ Plumbing Compares to Top Southern California Plumbers
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Don&apos;t get stuck with corporate franchise sales quotas or unlicensed guesswork. See why homeowners across Los Angeles, Orange County, and the SGV choose JJJ Plumbing.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full min-w-[720px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-sm">
                <th className="py-4 px-5 font-bold text-slate-700 w-[24%]">
                  Standard of Service
                </th>
                <th className="py-4 px-5 font-black text-brand-navy bg-brand-accent/15 border-x-2 border-brand-accent/50 w-[32%]">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="size-4 text-brand-navy" />
                    <span>JJJ Plumbing Inc</span>
                  </div>
                  <span className="block text-[11px] font-normal text-slate-700 mt-0.5">
                    Master Plumber Owner-Operated
                  </span>
                </th>
                <th className="py-4 px-5 font-bold text-slate-600 w-[24%]">
                  Top SoCal Franchises
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                    (e.g., Mike Diamond, Rescue Rooter, Adeedo)
                  </span>
                </th>
                <th className="py-4 px-5 font-bold text-slate-600 w-[20%]">
                  Unlicensed Handymen
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                    (Online lead boards &amp; apps)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 font-bold text-slate-900">
                    {row.feature}
                  </td>

                  {/* JJJ Column (Highlighted with Accent) */}
                  <td className="py-4 px-5 bg-brand-accent/5 border-x-2 border-brand-accent/40 font-semibold text-brand-navy">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-slate-950 block">
                          {row.jjj}
                        </span>
                        {row.jjjSub && (
                          <span className="text-xs text-slate-600 block mt-0.5 font-normal">
                            {row.jjjSub}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Top SoCal Corporate Chains Column */}
                  <td className="py-4 px-5 text-slate-600">
                    <div className="flex items-start gap-2">
                      {row.socalChainsType === "negative" ? (
                        <XCircle className="size-4.5 shrink-0 text-red-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="size-4.5 shrink-0 text-amber-500 mt-0.5" />
                      )}
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {row.socalChains}
                      </span>
                    </div>
                  </td>

                  {/* Handymen Column */}
                  <td className="py-4 px-5 text-slate-600">
                    <div className="flex items-start gap-2">
                      {row.handymenType === "negative" ? (
                        <XCircle className="size-4.5 shrink-0 text-red-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="size-4.5 shrink-0 text-amber-500 mt-0.5" />
                      )}
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {row.handymen}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Reassurance Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <span className="text-sm font-extrabold text-emerald-950 block">
                The JJJ Risk-Free Guarantee: &ldquo;Fixed Right or It&apos;s Free&rdquo;
              </span>
              <p className="text-xs text-emerald-800 mt-0.5">
                Every repair is backed by 25 years of master craftsmanship. If our repair doesn&apos;t solve the problem, we return and fix it at zero extra charge.
              </p>
            </div>
          </div>
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            className="shrink-0 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs h-10 px-5 rounded-xl cursor-pointer"
          >
            Call {siteConfig.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
