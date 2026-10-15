"use client";

import { useState } from "react";
import { Camera, Phone, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/site/lead-form";
import { siteConfig } from "@/lib/site-config";

export function MobileStickyBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-slate-800 bg-brand-navy shadow-[0_-4px_20px_rgba(0,0,0,0.35)] lg:hidden">
        {/* 1. Call Now */}
        <a
          href={siteConfig.phoneHref}
          className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-1 border-r border-slate-700/60 py-2.5 text-xs sm:text-sm font-semibold text-white active:bg-white/10"
        >
          <Phone className="size-4 text-brand-accent" />
          <span>Call Now</span>
        </a>

        {/* 2. Text Photo */}
        <a
          href={siteConfig.smsHref}
          className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-1 border-r border-slate-700/60 py-2.5 text-xs sm:text-sm font-semibold text-white active:bg-white/10"
        >
          <Camera className="size-4 text-brand-accent" />
          <span>Text Photo</span>
        </a>

        {/* 3. Specials / $59+ */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-1 bg-brand-accent py-2.5 text-xs sm:text-sm font-extrabold text-brand-navy-dark active:bg-sky-300"
        >
          <Tag className="size-4" />
          <span>Specials $59+</span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-brand-navy">
              Claim Web Special &amp; Book Arrival Window
            </DialogTitle>
            <p className="text-xs text-slate-600">
              Select your offer ($59 drain clearing, $75 off repair, or $150 off water heater). Diagnostic fee 100% credited toward your repair!
            </p>
          </DialogHeader>
          <LeadForm compact />
        </DialogContent>
      </Dialog>
    </>
  );
}
