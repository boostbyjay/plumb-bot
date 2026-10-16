"use client";

import { useState, useId, useEffect } from "react";
import { CheckCircle2, ClipboardList, Loader2, Phone, ShieldCheck, Tag } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const POPULAR_PLUMBING_OPTIONS = [
  "Drain Cleaning / Clogged Drain",
  "Hydro-Jetting ($149 Special)",
  "Water Heater Repair or Replace",
  "Tankless Water Heater Service",
  "Sewer Line Repair / Camera Inspection",
  "Emergency Leak / Burst Pipe Repair",
  "Toilet Repair or Installation",
  "Faucet, Sink, or Garbage Disposal",
  "Slab Leak Detection & Repair",
  "Commercial Plumbing / Backflow",
  "Other Plumbing Service",
] as const;

const serviceIdToOption: Record<string, string> = {
  "drain-cleaning": "Hydro-Jetting ($149 Special)",
  "emergency-repairs": "Emergency Leak / Burst Pipe Repair",
  "water-heaters": "Water Heater Repair or Replace",
  "sewer-lines": "Sewer Line Repair / Camera Inspection",
  "commercial": "Commercial Plumbing / Backflow",
};

export function QuickQuoteModal({ hideTrigger = false }: { hideTrigger?: boolean }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; service?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!hideTrigger) return;
    function onOpenEvent(e: Event) {
      const custom = e as CustomEvent<{ code?: string; serviceId?: string }>;
      if (custom.detail?.code) {
        setCouponCode(custom.detail.code);
      }
      if (custom.detail?.serviceId) {
        const mapped = serviceIdToOption[custom.detail.serviceId] || custom.detail.serviceId;
        setService(mapped);
      }
      setOpen(true);
    }
    window.addEventListener("jjj:open-quick-quote", onOpenEvent);
    return () => window.removeEventListener("jjj:open-quick-quote", onOpenEvent);
  }, [hideTrigger]);

  function validate() {
    const next: { name?: string; phone?: string; service?: string } = {};
    if (name.trim().length < 2) {
      next.name = "Please enter your name.";
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      next.phone = "Enter a valid 10-digit phone number.";
    }
    if (!service) {
      next.service = "Please choose a service from the list.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function fireConfetti() {
    try {
      const cf = require("canvas-confetti");
      cf({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.55 },
        colors: ["#0ea5e9", "#facc15", "#ffffff", "#38bdf8"],
      });
    } catch {
      // ignore if unavailable
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const pageUrl = typeof window !== "undefined" ? window.location.href : siteConfig.siteUrl;
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const sourceInfo = params?.get("gclid")
        ? `Google Ads (gclid: ${params.get("gclid")})`
        : params?.get("utm_source") || "Direct / Organic Search";

      const matchedCoupon = siteConfig.coupons.find((c) => c.code === couponCode);

      const payload: Record<string, string> = {
        _subject: `⚡ QUICK ESTIMATE: ${name} — ${service} ${couponCode ? `[${couponCode}] ` : ""}(${phone})`,
        _template: "table",
        _captcha: "false",
        "Form Type": "Instant Estimate Popup",
        "Customer Name": name,
        "Phone Number": phone,
        "Service Requested": service,
        "Special Offer / Coupon": matchedCoupon ? `${matchedCoupon.title} (${couponCode})` : couponCode || "None",
        "Traffic Source": sourceInfo,
        "Submitted From": pageUrl,
      };

      const res = await fetch("https://formsubmit.co/ajax/jjjplumbinginc@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      fireConfetti();
      if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "generate_lead", {
          event_category: "engagement",
          event_label: service,
          value: 1,
        });
      }
    } catch {
      setStatus("error");
    }
  }

  function handleResetAndClose() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setName("");
      setPhone("");
      setService("");
      setCouponCode("");
      setErrors({});
    }, 250);
  }

  const activeCoupon = siteConfig.coupons.find((c) => c.code === couponCode);
  const showCouponOnSuccess = Boolean(activeCoupon && couponCode && couponCode !== "JJJ-75OFF");

  return (
    <>
      {!hideTrigger && (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          size="lg"
          variant="outline"
          className="h-11 sm:h-12 w-full border-white/30 bg-white/10 px-3 sm:px-5 text-xs sm:text-base font-bold text-white hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] cursor-pointer"
        >
          <ClipboardList className="size-4 shrink-0 mr-1.5 text-brand-accent" />
          <span className="sm:hidden">Quick Form</span>
          <span className="hidden sm:inline">Quick Online Quote</span>
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md p-5 sm:p-6 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3.5 py-4 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="size-8" />
              </div>
              <span className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Request Received
              </span>
              <h3 className="text-2xl font-black text-brand-navy">
                {showCouponOnSuccess ? activeCoupon!.title : "Fast Dispatch Confirmed"}
              </h3>
              <p className="max-w-xs text-sm text-slate-600 leading-relaxed">
                Our dispatch team will text you at <strong className="text-brand-navy">{phone}</strong> within 5 minutes to confirm your visit.
              </p>
              {showCouponOnSuccess && (
                <div className="w-full rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50/70 p-3 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Official Coupon Code Locked In
                  </p>
                  <p className="mt-1 font-mono text-lg font-extrabold text-emerald-900">
                    {couponCode}
                  </p>
                </div>
              )}
              <div className="mt-2 flex flex-col sm:flex-row gap-2 w-full">
                <Button
                  render={<a href={siteConfig.phoneHref} />}
                  nativeButton={false}
                  className="flex-1 bg-brand-navy text-white font-bold hover:bg-brand-navy-light h-11"
                >
                  <Phone className="size-4 mr-1.5" />
                  Call {siteConfig.phone}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetAndClose}
                  className="h-11 font-semibold"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader className="text-left pb-2 border-b border-slate-100">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 w-fit">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>5-Minute Text Response</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight mt-1">
                  Request Your Free Estimate
                </DialogTitle>
                <p className="text-sm text-slate-600">
                  Fill out the 3 quick boxes below — we text you within 5 minutes.
                </p>
              </DialogHeader>

              {couponCode && (
                <div className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs sm:text-sm">
                  <span className="flex items-center gap-2 font-bold text-emerald-950">
                    <Tag className="size-4 text-emerald-600 shrink-0" />
                    {activeCoupon
                      ? activeCoupon.title
                      : couponCode === "HERO10"
                      ? "10% Senior, Military & First Responder"
                      : "$75 Off Any Repair"}
                  </span>
                  <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white shrink-0">
                    Applied ✓
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-2.5 flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <Label htmlFor={`qq-name-${uid}`} className="text-sm font-bold text-slate-800">
                    Your Name
                  </Label>
                  <Input
                    id={`qq-name-${uid}`}
                    name="name"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className="h-11 text-base px-3.5"
                  />
                  {errors.name && (
                    <p className="text-xs font-semibold text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor={`qq-phone-${uid}`} className="text-sm font-bold text-slate-800">
                    Phone Number
                  </Label>
                  <Input
                    id={`qq-phone-${uid}`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(626) 555-0123"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className="h-11 text-base px-3.5"
                  />
                  {errors.phone && (
                    <p className="text-xs font-semibold text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor={`qq-service-${uid}`} className="text-sm font-bold text-slate-800">
                    Service Needed
                  </Label>
                  <select
                    id={`qq-service-${uid}`}
                    name="service"
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value);
                      if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                    }}
                    className="h-11 w-full rounded-md border border-input bg-white px-3 text-base text-slate-900 shadow-xs outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-accent/40"
                  >
                    <option value="" disabled>
                      Tap to choose a service...
                    </option>
                    {POPULAR_PLUMBING_OPTIONS.map((option, idx) => (
                      <option key={option} value={option}>
                        {idx + 1}. {option}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-xs font-semibold text-destructive">{errors.service}</p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-xs font-semibold text-destructive">
                    Could not send request. Please call us directly at {siteConfig.phone}.
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="mt-1 h-12 w-full bg-brand-accent font-extrabold text-base text-brand-navy-dark hover:bg-sky-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-5 animate-spin mr-1.5" />
                      Sending...
                    </>
                  ) : (
                    "Get My Free Estimate →"
                  )}
                </Button>

                <p className="flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium text-center">
                  <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                  <span>100% Diagnostic credited to repair • CA LIC #842875</span>
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
