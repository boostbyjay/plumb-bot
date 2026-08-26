import { Phone } from "lucide-react";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function Estimate() {
  return (
    <section id="estimate" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="grid lg:grid-cols-5">
            <div className="bg-brand-navy p-8 text-white lg:col-span-2 sm:p-10">
              <span className="text-sm font-bold uppercase tracking-wide text-brand-accent">
                Free Estimate
              </span>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Get a Fast, No-Obligation Quote
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                Fill out the form and our dispatch team will call you back
                within 5 minutes during business hours to confirm details and
                schedule your visit.
              </p>
              <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Prefer to talk now?
                </p>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-2 flex items-center gap-2 text-lg font-bold text-brand-accent hover:text-sky-200"
                >
                  <Phone className="size-5" />
                  {siteConfig.phone}
                </a>
                <p className="mt-1 text-xs text-slate-400">
                  {siteConfig.hours.emergency}
                </p>
              </div>
            </div>
            <div className="p-8 sm:p-10 lg:col-span-3">
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
