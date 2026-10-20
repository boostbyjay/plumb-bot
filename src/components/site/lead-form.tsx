"use client";

import { useId, useState, useEffect, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success";

export type FormValues = {
  name: string;
  phone: string;
  service: string;
  zip: string;
  details: string;
  couponCode: string;
};

type FormErrors = Partial<Record<keyof FormValues | "_form", string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  service: "",
  zip: "",
  details: "",
  couponCode: "",
};

const serviceChoices = [
  { value: "Drain Cleaning / Clogged Drain", label: "1. Drain Cleaning / Clogged Drain" },
  { value: "Hydro-Jetting ($149 Special)", label: "2. Hydro-Jetting ($149 Special)" },
  { value: "Water Heater Repair or Replace", label: "3. Water Heater Repair or Replace" },
  { value: "Tankless Water Heater Service", label: "4. Tankless Water Heater Service" },
  { value: "Sewer Line Repair / Camera Inspection", label: "5. Sewer Line Repair / Camera Inspection" },
  { value: "Emergency Leak / Burst Pipe Repair", label: "6. Emergency Leak / Burst Pipe Repair" },
  { value: "Toilet Repair or Installation", label: "7. Toilet Repair or Installation" },
  { value: "Faucet, Sink, or Garbage Disposal", label: "8. Faucet, Sink, or Garbage Disposal" },
  { value: "Slab Leak Detection & Repair", label: "9. Slab Leak Detection & Repair" },
  { value: "Commercial Plumbing / Backflow", label: "10. Commercial Plumbing / Backflow" },
  { value: "Other Plumbing Service", label: "11. Other Plumbing Service" },
];

// Map internal coupon serviceIds to plain-English dropdown values
const serviceIdMap: Record<string, string> = {
  "drain-cleaning": "Hydro-Jetting ($149 Special)",
  "emergency-repairs": "Emergency Leak / Burst Pipe Repair",
  "water-heaters": "Water Heater Repair or Replace",
  "sewer-lines": "Sewer Line Repair / Camera Inspection",
  "commercial": "Commercial Plumbing / Backflow",
};

export function LeadForm({
  compact = false,
  className,
  defaultCouponCode,
}: {
  compact?: boolean;
  className?: string;
  defaultCouponCode?: string;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues,
    couponCode: defaultCouponCode || "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});

  // Listen to external coupon clicks from the Specials section or Hero
  useEffect(() => {
    function handleSelectCoupon(e: Event) {
      const custom = e as CustomEvent<{ code?: string; serviceId?: string }>;
      if (custom.detail?.code) {
        const mappedService = custom.detail.serviceId
          ? serviceIdMap[custom.detail.serviceId] || custom.detail.serviceId
          : undefined;
        setValues((prev) => ({
          ...prev,
          couponCode: custom.detail.code!,
          service: mappedService || prev.service,
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

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!values.service) nextErrors.service = "Please choose a service from the list.";
    if (!values.zip.trim()) nextErrors.zip = "Please enter your city or zip code.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const matchedCoupon = siteConfig.coupons.find((c) => c.code === values.couponCode);
      const hasSpecificOffer =
        values.couponCode &&
        values.couponCode !== "JJJ-75OFF" &&
        matchedCoupon;

      const pageUrl = typeof window !== "undefined" ? window.location.href : siteConfig.siteUrl;
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const gclid = urlParams?.get("gclid") || "";
      const utmSource = urlParams?.get("utm_source") || "";
      const trafficSource = gclid
        ? `Google Ads (gclid: ${gclid})`
        : utmSource
        ? `Campaign (${utmSource})`
        : "Organic / Direct";

      const response = await fetch("https://formsubmit.co/ajax/jjjplumbinginc@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Estimate Request: ${values.service} ${hasSpecificOffer ? `[${values.couponCode}] ` : ""}- ${values.name}`,
          _template: "table",
          _captcha: "false",
          "Customer Name": values.name,
          "Phone Number": values.phone,
          "Service Needed": values.service,
          "City / Zip Code": values.zip,
          "Special Offer / Coupon": hasSpecificOffer ? matchedCoupon.title : values.couponCode || "None",
          "Issue Description": values.details || "None provided",
          "Submitted From": pageUrl,
          "Traffic Source": trafficSource,
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
        particleCount: 120,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#0ea5e9", "#facc15", "#ffffff", "#38bdf8"],
        gravity: 0.7,
        ticks: 220,
      });
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
          "flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-50/70 p-6 text-center shadow-lg",
          className,
        )}
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="size-7" />
        </div>
        <div>
          <span className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Request Received
          </span>
          <h3 className="mt-2 text-xl sm:text-2xl font-black text-emerald-950">
            {showCoupon ? matchedCoupon!.title : "Fast Dispatch Confirmed"}
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-emerald-800">
            Our dispatch team will text you at <strong>{values.phone}</strong> within 5 minutes to confirm your visit.
          </p>
        </div>

        {showCoupon && (
          <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-emerald-400 bg-white p-3.5 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Your Official Coupon Code
            </p>
            <div className="mt-1 inline-block rounded-lg bg-emerald-100 px-4 py-1 font-mono text-lg font-extrabold tracking-widest text-emerald-900 border border-emerald-300">
              {values.couponCode}
            </div>
          </div>
        )}

        <div className="w-full pt-1">
          <a
            href={siteConfig.phoneHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3 px-4 text-sm font-bold text-white hover:bg-brand-navy-light"
          >
            Call {siteConfig.phone} Now
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
      className={cn("flex flex-col gap-3.5", className)}
    >
      {/* Clean 1-line offer badge when a coupon was clicked */}
      {values.couponCode && (
        <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-3.5 py-2 text-xs sm:text-sm">
          <span className="flex items-center gap-2 font-bold text-emerald-950">
            <Tag className="size-4 text-emerald-600 shrink-0" />
            {activeCoupon ? activeCoupon.title : "$75 Repair Voucher"} Locked In
          </span>
          <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-bold text-white">
            Applied ✓
          </span>
        </div>
      )}

      {/* Row 1: Name & Phone */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor={`name-${uid}`} className="text-sm font-bold text-slate-800">
            Your Name
          </Label>
          <Input
            id={`name-${uid}`}
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="h-11 text-base px-3.5"
          />
          {errors.name && (
            <p className="text-xs font-semibold text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`phone-${uid}`} className="text-sm font-bold text-slate-800">
            Phone Number
          </Label>
          <Input
            id={`phone-${uid}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(626) 555-0123"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className="h-11 text-base px-3.5"
          />
          {errors.phone && (
            <p className="text-xs font-semibold text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Row 2: Service Needed & City/Zip */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor={`service-${uid}`} className="text-sm font-bold text-slate-800">
            Service Needed
          </Label>
          <select
            id={`service-${uid}`}
            name="service"
            value={values.service}
            onChange={(e) => updateField("service", e.target.value)}
            aria-invalid={Boolean(errors.service)}
            className="h-11 w-full rounded-md border border-input bg-white px-3 text-base text-slate-900 shadow-xs outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-accent/40"
          >
            <option value="" disabled>
              Tap to choose a service...
            </option>
            {serviceChoices.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-xs font-semibold text-destructive">{errors.service}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor={`zip-${uid}`} className="text-sm font-bold text-slate-800">
            City or Zip Code
          </Label>
          <Input
            id={`zip-${uid}`}
            name="zip"
            autoComplete="postal-code"
            placeholder="San Gabriel or 91776"
            value={values.zip}
            onChange={(e) => updateField("zip", e.target.value)}
            aria-invalid={Boolean(errors.zip)}
            className="h-11 text-base px-3.5"
          />
          {errors.zip && (
            <p className="text-xs font-semibold text-destructive">{errors.zip}</p>
          )}
        </div>
      </div>

      {/* Row 3: Brief Optional Note */}
      {!compact && (
        <div className="flex flex-col gap-1">
          <Label htmlFor={`details-${uid}`} className="text-sm font-bold text-slate-800">
            How Can We Help? <span className="font-normal text-slate-500">(Optional)</span>
          </Label>
          <Textarea
            id={`details-${uid}`}
            name="details"
            rows={2}
            value={values.details}
            onChange={(e) => updateField("details", e.target.value)}
            placeholder="E.g. Kitchen sink backed up, water heater leaking..."
            className="text-base min-h-[60px] resize-none px-3.5 py-2"
          />
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-1 w-full bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-extrabold h-12 text-base shadow-sm cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin mr-2" />
            Sending Request...
          </>
        ) : (
          <>
            <Send className="size-4 mr-2" />
            Get My Free Estimate
          </>
        )}
      </Button>

      {errors._form && (
        <p className="text-center text-xs font-semibold text-destructive">{errors._form}</p>
      )}

      <p className="text-center text-xs font-semibold text-emerald-700">
        ✓ We text you within 5 minutes • Diagnostic fee 100% credited to repair
      </p>
    </form>
  );
}
