import { Phone, ShieldCheck, BadgeCheck, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "100% Satisfaction Guarantee" },
  { icon: DollarSign, label: "Upfront Pricing" },
  { icon: Clock, label: "Available 24/7 for Emergencies" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-brand-navy text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.35), transparent 40%), radial-gradient(circle at 85% 10%, rgba(255,255,255,0.15), transparent 35%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-amber/40 bg-brand-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-amber">
            25 Years Serving the San Gabriel Valley &amp; LA County
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Trusted Plumbing &amp; Drain Experts for Home &amp; Business
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
            From emergency leak repairs to full commercial repiping, JJJ
            Plumbing delivers fast, up-front pricing and guaranteed
            workmanship.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              size="lg"
              className="h-12 bg-brand-amber px-7 text-base font-bold text-brand-navy-dark hover:bg-amber-400"
            >
              <Phone className="size-5" />
              Call {siteConfig.phone}
            </Button>
            <Button
              render={<a href="#estimate" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              Get Free Estimate
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-amber" />
                <dt className="text-sm font-medium text-slate-200">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex size-11 items-center justify-center rounded-full bg-brand-amber/15">
                <Clock className="size-5 text-brand-amber" />
              </div>
              <div>
                <p className="font-bold">Same-Day Dispatch</p>
                <p className="text-sm text-slate-400">
                  Mon–Sat, 8AM–6PM
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-4">
              {[
                "Free, no-obligation estimates",
                "Background-checked, uniformed technicians",
                "Upfront pricing before we start any work",
                "25 years serving local families & businesses",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-amber" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              render={<a href="#estimate" />}
              nativeButton={false}
              size="lg"
              className="mt-6 w-full bg-white text-brand-navy hover:bg-slate-100 font-bold"
            >
              Request Your Free Estimate
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
