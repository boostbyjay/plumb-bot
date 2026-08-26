import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceAreas, siteConfig } from "@/lib/site-config";

export function ServiceAreas() {
  return (
    <section id="service-areas" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wide text-brand-orange">
            Where We Work
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
            Proudly Serving the San Gabriel Valley &amp; Los Angeles County
          </h2>
          <p className="mt-4 text-slate-600">
            Don&apos;t see your city listed? Give us a call &mdash; there&apos;s
            a good chance we cover your area too.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3 sm:p-8 md:grid-cols-4 lg:grid-cols-5">
          {serviceAreas.map((city) => (
            <div
              key={city}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <MapPin className="size-4 shrink-0 text-brand-orange" />
              {city}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            size="lg"
            className="bg-brand-navy px-7 font-semibold text-white hover:bg-brand-navy-light"
          >
            <Phone className="size-4" />
            Ask if We Cover Your Area: {siteConfig.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
