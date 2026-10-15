import { AlertTriangle, Camera, CheckCircle2, Phone, Video } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

export function SecondOpinionBanner() {
  return (
    <section className="bg-amber-50/70 border-y border-amber-200 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl border border-amber-300 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-900">
                <AlertTriangle className="size-3.5 text-amber-700" />
                <span>Before You Approve An Expensive Repair</span>
              </div>

              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-brand-navy">
                Got a High Quote from Another Rooter Company?
              </h3>

              <p className="mt-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                Don&apos;t risk thousands on unnecessary excavation. JJJ Plumbing provides a <strong>100% Free Second Opinion &amp; Sewer Camera Inspection</strong> on all major sewer repairs, trenchless lining, and whole-home repiping. We routinely save Los Angeles homeowners $1,000 to $3,500 with honest, master-plumber diagnostics.
              </p>

              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Free Video Camera Verification
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Zero High-Pressure Sales Tactics
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Trenchless &amp; Non-Invasive Options
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Button
                render={<a href={siteConfig.phoneHref} />}
                nativeButton={false}
                size="lg"
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-bold h-11 px-6 rounded-xl shadow-sm"
              >
                <Phone className="size-4 mr-1.5 text-brand-accent" />
                Call for 2nd Opinion
              </Button>

              <Button
                render={<a href={siteConfig.smsHref} />}
                nativeButton={false}
                size="lg"
                variant="outline"
                className="border-amber-400 bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold h-11 px-6 rounded-xl"
              >
                <Camera className="size-4 mr-1.5 text-amber-700" />
                Text Quote for Free Review
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
