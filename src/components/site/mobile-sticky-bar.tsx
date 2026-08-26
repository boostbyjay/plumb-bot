"use client";

import { useState } from "react";
import { ClipboardList, Phone } from "lucide-react";
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
      <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-slate-800 bg-brand-navy shadow-[0_-4px_16px_rgba(0,0,0,0.25)] lg:hidden">
        <a
          href={siteConfig.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 border-r border-slate-700/60 py-3.5 text-sm font-semibold text-white active:bg-white/10"
        >
          <Phone className="size-4" />
          Tap to Call
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 bg-brand-amber py-3.5 text-sm font-bold text-brand-navy-dark active:bg-amber-400"
        >
          <ClipboardList className="size-4" />
          Request Quote
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-brand-navy">
              Get Your Free Estimate
            </DialogTitle>
          </DialogHeader>
          <LeadForm compact />
        </DialogContent>
      </Dialog>
    </>
  );
}
