"use client";

import { useId, useState, useEffect, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, Clock, Sparkles, ShieldCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { services, siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success";

export type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  zip: string;
  details: string;
  urgency: string;
  couponCode: string;
};

type FormErrors = Partial<Record<keyof FormValues | "_form", string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  zip: "",
  details: "",
  urgency: "asap",
  couponCode: "",
};

const quickIssues = [
  { label: "💧 Hydro-Jet / Drain", service: "drain-cleaning", coupon: "HYDRO149" },
  { label: "🚨 Emergency Leak", service: "emergency-repairs", coupon: "" },
  { label: "🚿 Water Heater", service: "water-heaters", coupon: "HEAT150" },
  { label: "🏗️ Sewer / Line", service: "sewer-lines", coupon: "SEWER-2ND" },
  { label: "🏢 Commercial", service: "commercial", coupon: "" },
];

const urgencyOptions = [
  { id: "asap", label: "🚨 Emergency ASAP (Under 90 min)", tag: "Fastest" },
  { id: "today-morning", label: "☀️ Today (8 AM – 12 PM)", tag: "Morning" },
  { id: "today-afternoon", label: "⛅ Today (12 PM – 5 PM)", tag: "Afternoon" },
  { id: "flexible", label: "📅 Tomorrow / Flexible", tag: "Scheduled" },
];

export function LeadForm({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // Listen to external coupon clicks from the Specials section
  useEffect(() => {
    function handleSelectCoupon(e: Event) {
      const custom = e as CustomEvent<{ code?: string; serviceId?: string }>;
      if (custom.detail?.code) {
        setValues((prev) => ({
          ...prev,
          couponCode: custom.detail.code!,
          service: custom.detail.serviceId || prev.service,
        }));
      }
    }
    window.addEventListener("jjj:select-coupon", handleSelectCoupon);
    return () => window.removeEventListener("jjj:select-coupon", handleSelectCoupon);
  }, []);

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleQuickIssueClick(serviceId: string, couponCode: string) {
    setValues((prev) => ({
      ...prev,
      service: serviceId,
      couponCode: couponCode || "",
    }));
    setErrors((prev) => ({ ...prev, service: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter a phone number.";
    if (!values.email.trim()) nextErrors.email = "Please enter your email.";
    if (!values.service) nextErrors.service = "Please select a service or tap an issue chip.";
    if (!values.zip.trim()) nextErrors.zip = "Please enter your address or zip code.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const serviceLabel =
        services.find((s) => s.id === values.service)?.title || values.service;

      const urgencyLabel =
        urgencyOptions.find((u) => u.id === values.urgency)?.label || values.urgency;

      const matchedCoupon = siteConfig.coupons.find((c) => c.code === values.couponCode);
      const hasSpecificOffer =
        values.couponCode &&
        values.couponCode !== "JJJ-75OFF" &&
        matchedCoupon;

      const offerLine = hasSpecificOffer
        ? `\nOFFICIAL COUPON CODE: ${values.couponCode}\nOFFER APPLIED: ${matchedCoupon.title}\n`
        : "";

      const introSentence = hasSpecificOffer
        ? `Thank you for contacting JJJ Plumbing! We have received your request and your special offer (${matchedCoupon.title}) has been locked in for your visit.`
        : `Thank you for contacting JJJ Plumbing! We have received your request and our dispatch team is reviewing your details.`;

      const autoresponseMessage = `${introSentence}

Our dispatch team will text you at ${values.phone} within 5 minutes to confirm your details, arrival window, and upfront pricing.
${offerLine}
REQUESTED SERVICE: ${serviceLabel}
PREFERRED ARRIVAL: ${urgencyLabel}
SERVICE LOCATION: ${values.zip}
${values.details ? `DETAILS PROVIDED: ${values.details}\n` : ""}
GUARANTEE: Your diagnostic fee is 100% credited toward any repair performed.

If this is an active emergency (burst pipe, gas leak, active flooding, or main sewer backup), please call us directly 24/7 at ${siteConfig.phone} for immediate emergency dispatch.

JJJ Plumbing Inc
${siteConfig.license}
Phone: ${siteConfig.phone}
Website: https://www.jjjplumbing.com`;

      const response = await fetch("https://formsubmit.co/ajax/jjjplumbinginc@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Quote Request: ${serviceLabel} ${hasSpecificOffer ? `[${values.couponCode}] ` : ""}- ${values.name}`,
          _template: "table",
          _captcha: "false",
          _autoresponse: autoresponseMessage,
          email: values.email,
          _replyto: values.email,
          "Customer Name": values.name,
          "Phone Number": values.phone,
          "Email Address": values.email,
          "Service Needed": serviceLabel,
          "Preferred Arrival Time": urgencyLabel,
          "Special Offer / Coupon": hasSpecificOffer ? matchedCoupon.title : "None",
          "Address / Zip Code": values.zip,
          "Issue Description": values.details || "None provided",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === "false" || data.success === false) {
        throw new Error(data.message || "Something went wrong. Please call us directly.");
      }

      setStatus("success");
      trackConversion();
      fireConfetti();
    } catch (error) {
      setStatus("idle");
      setErrors({
        _form: error instanceof Error ? error.message : "Something went wrong. Please call us directly.",
      });
    }
  }

  function trackConversion() {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "form",
        event_label: values.service,
        value: 1,
      });
    }
  }

  function fireConfetti() {
    try {
      const cf = require("canvas-confetti");
      cf({
        particleCount: 150,
        spread: 75,
        origin: { y: 0.5 },
        colors: ["#0ea5e9", "#facc15", "#ffffff", "#38bdf8"],
        gravity: 0.7,
        ticks: 250,
      });
      setTimeout(() => {
        cf({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.4 },
          colors: ["#0ea5e9", "#facc15"],
          gravity: 0.6,
          ticks: 200,
        });
      }, 200);
    } catch {
      // confetti not available
    }
  }

  if (status === "success") {
    const matchedCoupon = siteConfig.coupons.find((c) => c.code === values.couponCode);
    const showCoupon = Boolean(matchedCoupon && values.couponCode && values.couponCode !== "JJJ-75OFF");
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-50/70 p-6 sm:p-8 text-center shadow-lg",
          className,
        )}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-8" />
        </div>
        <div>
          <span className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Request Received
          </span>
          <h3 className="mt-2 text-2xl font-black text-emerald-950">
            {showCoupon ? matchedCoupon!.title : "Fast Dispatch Confirmed"}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-emerald-800">
            Our dispatch team will text you at <strong>{values.phone}</strong> within 5 minutes to confirm your visit.
          </p>
        </div>

        {/* Digital Coupon Box - only if specific promo like hydrojetting, never the $75 voucher */}
        {showCoupon && (
          <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-emerald-400 bg-white p-4 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your Official Coupon Code
            </p>
            <div className="mt-1.5 inline-block rounded-lg bg-emerald-100 px-4 py-1.5 font-mono text-xl font-extrabold tracking-widest text-emerald-900 border border-emerald-300">
              {values.couponCode}
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Show this screen to your technician upon arrival. Diagnostic fee 100% credited toward your repair!
            </p>
          </div>
        )}

        {/* Reassurance badge */}
        <div className="w-full max-w-sm rounded-xl border border-emerald-200 bg-white/80 p-3 text-xs text-emerald-900 font-medium text-center">
          ✓ 100% Diagnostic fee credited toward your repair if work is performed.
        </div>

        <div className="w-full pt-1">
          <p className="text-xs text-slate-500 mb-2">Need immediate emergency dispatch right now?</p>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 px-4 text-sm font-bold text-white hover:bg-brand-navy-light"
          >
            Call {siteConfig.phone} (Immediate Dispatch)
          </a>
        </div>
      </div>
    );
  }

  const activeCoupon = siteConfig.coupons.find((c) => c.code === values.couponCode);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      {/* Dynamic Active Offer Banner */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-accent/50 bg-gradient-to-r from-sky-50 to-amber-50/60 p-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-navy-dark text-xs font-black shadow-sm">
            <Tag className="size-3.5" />
          </span>
          <div className="leading-snug min-w-0">
            <p className="font-extrabold text-brand-navy truncate">
              {activeCoupon ? activeCoupon.title : "$75 Repair Voucher"}
            </p>
            <p className="text-[11px] text-slate-600">
              Code: <strong className="font-mono text-brand-blue">{values.couponCode}</strong> · {activeCoupon?.savings || "Discount Locked"}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-200">
          Applied ✓
        </span>
      </div>

      {/* 1-Click Quick Issue Selector Chips */}
      <div>
        <Label className="text-xs font-semibold text-slate-600 mb-1.5 block">
          Quick-Select Your Problem:
        </Label>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {quickIssues.map((item) => {
            const isSelected = values.service === item.service;
            return (
              <button
                key={item.service}
                type="button"
                onClick={() => handleQuickIssueClick(item.service, item.coupon)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all border",
                  isSelected
                    ? "bg-brand-navy text-white border-brand-navy shadow-sm ring-2 ring-brand-accent/50"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preferred Arrival Window / Urgency */}
      <div>
        <Label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center justify-between">
          <span>Preferred Arrival Window:</span>
          <span className="text-[11px] text-emerald-600 font-bold">Same-Day Available</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {urgencyOptions.map((opt) => {
            const isSelected = values.urgency === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateField("urgency", opt.id)}
                className={cn(
                  "flex items-center justify-between text-left rounded-xl p-2.5 text-xs font-semibold transition-all border",
                  isSelected
                    ? "bg-brand-accent/15 border-brand-accent text-brand-navy-dark ring-2 ring-brand-accent/40 shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                )}
              >
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`name-${uid}`} className="text-xs font-semibold">Full Name</Label>
          <Input
            id={`name-${uid}`}
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="h-10 text-sm"
          />
          {errors.name && (
            <p className="text-xs font-medium text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`phone-${uid}`} className="text-xs font-semibold">Phone Number</Label>
          <Input
            id={`phone-${uid}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(626) 555-0123"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className="h-10 text-sm"
          />
          {errors.phone && (
            <p className="text-xs font-medium text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`email-${uid}`} className="text-xs font-semibold">Email Address</Label>
          <Input
            id={`email-${uid}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="h-10 text-sm"
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`service-${uid}`} className="text-xs font-semibold">Service Needed</Label>
          <Select
            value={values.service || null}
            onValueChange={(value) => updateField("service", (value as string) ?? "")}
          >
            <SelectTrigger id={`service-${uid}`} className="w-full h-10 text-sm">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.title}
                </SelectItem>
              ))}
              <SelectItem value="other">Something else</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-xs font-medium text-destructive">{errors.service}</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`zip-${uid}`} className="text-xs font-semibold">Address or Zip Code</Label>
          <Input
            id={`zip-${uid}`}
            name="zip"
            autoComplete="postal-code"
            placeholder="San Gabriel, 91776"
            value={values.zip}
            onChange={(e) => updateField("zip", e.target.value)}
            aria-invalid={Boolean(errors.zip)}
            className="h-10 text-sm"
          />
          {errors.zip && (
            <p className="text-xs font-medium text-destructive">{errors.zip}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`coupon-${uid}`} className="text-xs font-semibold">Special Offer (Optional)</Label>
          <Select
            value={values.couponCode || "none"}
            onValueChange={(val) => updateField("couponCode", val === "none" ? "" : (val ?? ""))}
          >
            <SelectTrigger id={`coupon-${uid}`} className="w-full h-10 text-sm font-semibold">
              <SelectValue placeholder="No coupon applied" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No coupon applied</SelectItem>
              {siteConfig.coupons.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.code} — {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`details-${uid}`} className="text-xs font-semibold">Additional Details (Optional)</Label>
        <Textarea
          id={`details-${uid}`}
          name="details"
          rows={compact ? 2 : 3}
          value={values.details}
          onChange={(e) => updateField("details", e.target.value)}
          placeholder="E.g. Kitchen sink backing up, water heater leaking at base..."
          className="text-sm"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-1 w-full bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-extrabold h-11 text-sm sm:text-base shadow-sm"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin mr-1.5" />
            Locking In Offer...
          </>
        ) : (
          <>
            <Send className="size-4 mr-1.5" />
            Lock In Offer &amp; Book Arrival Window
          </>
        )}
      </Button>
      {errors._form && (
        <p className="text-center text-xs text-destructive">{errors._form}</p>
      )}
      
      <div className="text-center space-y-1">
        <p className="text-[11px] font-semibold text-emerald-700">
          ✓ Diagnostic fee 100% credited toward your repair if work is performed.
        </p>
        <p className="text-[10px] text-muted-foreground leading-normal">
          No hidden fees. Upfront quote before any wrench is turned. We will text you within 5 minutes.
        </p>
      </div>
    </form>
  );
}
