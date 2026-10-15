import { Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function CtaBanner({
  title = "Not in the mood for a DIY project today?",
  description = `Our licensed plumbers serve the San Gabriel Valley and greater Los Angeles area and can usually get to you the same day. Skip the trial and error — get it fixed right the first time.`,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-brand-accent/30 bg-brand-navy px-6 py-8 text-white sm:px-10 sm:py-10">
      <div className="relative flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-accent">
            <ShieldCheck className="h-4 w-4" />
            Licensed, insured, and background-checked • Claim $75 Repair Voucher
          </div>
          <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
          <p className="text-sm text-slate-300 sm:text-base">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
          <Button
            render={<a href="/#estimate" />}
            nativeButton={false}
            className="bg-brand-accent font-bold text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
          >
            Claim $75 Voucher
          </Button>
          <Button
            render={<a href={siteConfig.phoneHref} />}
            nativeButton={false}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Phone className="mr-2 h-4 w-4" />
            Call {siteConfig.phone}
          </Button>
        </div>
      </div>
    </div>
  );
}
