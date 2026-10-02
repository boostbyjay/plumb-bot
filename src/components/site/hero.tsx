import Image from "next/image";
import { Phone, ShieldCheck, BadgeCheck, Clock, DollarSign, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const trustBadges = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "100% Satisfaction Guarantee" },
  { icon: DollarSign, label: "Upfront Pricing" },
  { icon: Clock, label: "Available 24/7 for Emergencies" },
  { icon: Award, label: "Owner-Operated" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-navy text-white">
      <div className="grid lg:grid-cols-2 min-h-[520px]">
        {/* Left: Hero Image */}
        <div className="relative hidden lg:block">
          <Image
            src="/jobs/job-07-drain-cable.jpg"
            alt="Professional drain cleaning with heavy-duty cable machine"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-brand-navy/10" />
        </div>

        {/* Right: Content */}
        <div className="relative z-10 flex flex-col justify-center px-4 pt-6 pb-24 sm:px-6 sm:pt-10 sm:pb-28 lg:py-20 lg:pb-28">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-accent whitespace-nowrap">
            25+ Years Serving LA, Orange County &amp; the San Gabriel Valley
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Trusted Plumbing &amp; Drain Experts for Home &amp; Business
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg">
            From emergency leak repairs to full commercial repiping, JJJ
            Plumbing delivers fast, up-front pricing and guaranteed
            workmanship.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<a href={siteConfig.phoneHref} />}
              nativeButton={false}
              size="lg"
              className="h-12 bg-brand-accent px-7 text-base font-bold text-brand-navy-dark hover:bg-sky-300"
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

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-brand-accent" />
                <dt className="text-xs font-semibold text-slate-100">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom: Full-width dispatch bar */}
    </section>
  );
}
