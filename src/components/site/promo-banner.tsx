import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function PromoBanner() {
  return (
    <section className="bg-brand-accent py-2.5 sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-2.5 sm:flex-row sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-navy/10">
              <Tag className="size-3.5 text-brand-navy" />
            </span>
            <p className="text-sm font-bold text-brand-navy-dark sm:text-base">
              Claim $75 Off Any Repair Over $300 — Unlocked via Online Estimate or Photo Text
            </p>
          </div>
          <Button
            render={<a href="#estimate" />}
            nativeButton={false}
            size="sm"
            className="shrink-0 bg-brand-navy px-4 text-xs font-bold text-white hover:bg-brand-navy-light sm:text-sm"
          >
            Claim $75 Voucher
          </Button>
        </div>
      </div>
    </section>
  );
}
