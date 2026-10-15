"use client";

import { Camera, Phone, Tag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MobileStickyBar() {
  return (
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
        onClick={() => {
          window.dispatchEvent(new CustomEvent("jjj:open-specials"));
        }}
        className="flex flex-1 flex-col sm:flex-row items-center justify-center gap-1 bg-brand-accent py-2.5 text-xs sm:text-sm font-extrabold text-brand-navy-dark active:bg-sky-300"
      >
        <Tag className="size-4" />
        <span>Specials $59+</span>
      </button>
    </div>
  );
}
