import { ShieldCheck, DollarSign, BadgeCheck } from "lucide-react";
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
    title: "Licensed Code-Compliance",
    badge: "Done to CA Code",
    description:
      "All repairs and installations are completed strictly to California Uniform Plumbing Code by licensed professionals — no shortcuts, no unpermitted risks.",
  },
];

export function Guarantees() {
  return (
    <section className="bg-slate-100/80 py-10 sm:py-14 border-y border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
            Risk-Free Guarantee
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Why Southern California Homeowners Trust JJJ Plumbing
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Hiring a contractor shouldn&apos;t feel like a gamble. We eliminate the risk with 3 ironclad promises on every service call.
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-5xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-brand-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brand-navy text-brand-accent">
                      <Icon className="size-6" />
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      {g.badge}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-navy">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {g.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action card */}
        <div className="mt-8 mx-auto max-w-3xl rounded-2xl border border-brand-accent/30 bg-brand-navy p-5 sm:p-6 text-center text-white">
          <div className="mx-auto max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold">
              Ready for Fast, Guaranteed Plumbing Service?
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
              Submit your request or text a photo to unlock your <strong>$75 repair voucher</strong>.
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              *Valid on repairs $300+. Limit one voucher per customer.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button
                render={<a href="#estimate" />}
                nativeButton={false}
                size="lg"
                className="bg-brand-accent px-6 font-bold text-brand-navy-dark hover:bg-sky-300"
              >
                Claim $75 Voucher &amp; Free Estimate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
