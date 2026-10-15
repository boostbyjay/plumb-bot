"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, Mail } from "lucide-react";
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
};

type FormErrors = Partial<Record<keyof FormValues | "_form", string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  zip: "",
  details: "",
};

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

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter a phone number.";
    if (!values.email.trim()) nextErrors.email = "Please enter your email.";
    if (!values.service) nextErrors.service = "Please select a service.";
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

      const autoresponseMessage = `Thank you for contacting JJJ Plumbing! We have received your request and your $75 Repair Voucher (Code: JJJ-75OFF) is now unlocked and locked in for your service visit.

A member of our team will call you at ${values.phone} within 5 minutes during business hours to confirm your estimate and schedule your visit.

VOUCHER CODE: JJJ-75OFF
DISCOUNT: $75 OFF Any Plumbing Repair Over $300
Requested Service: ${serviceLabel}
Service Location: ${values.zip}
${values.details ? `Details Provided: ${values.details}\n` : ""}
If this is an active emergency (burst pipe, gas leak, active flooding, or main sewer backup), please call us directly at ${siteConfig.phone} for immediate dispatch.

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
          _subject: `New $75 Voucher Quote: ${serviceLabel} - ${values.name}`,
          _template: "table",
          _captcha: "false",
          _autoresponse: autoresponseMessage,
          email: values.email,
          _replyto: values.email,
          "Customer Name": values.name,
          "Phone Number": values.phone,
          "Email Address": values.email,
          "Service Needed": serviceLabel,
          "Address / Zip Code": values.zip,
          "Issue Description": values.details || "None provided",
          "Voucher Applied": "JJJ-75OFF ($75 Off $300+)",
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
            Voucher Unlocked &amp; Applied
          </span>
          <h3 className="mt-2 text-2xl font-black text-emerald-950">
            $75 Repair Voucher Locked In
          </h3>
          <p className="mt-2 max-w-sm text-sm text-emerald-800">
            Our dispatch team will call you at <strong>{values.phone}</strong> within 5 minutes to confirm your estimate.
          </p>
        </div>

        {/* Digital Coupon Box */}
        <div className="w-full max-w-sm rounded-xl border-2 border-dashed border-emerald-400 bg-white p-4 shadow-sm text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Your Official Voucher Code
          </p>
          <div className="mt-1.5 inline-block rounded-lg bg-emerald-100 px-4 py-1.5 font-mono text-xl font-extrabold tracking-widest text-emerald-900 border border-emerald-300">
            JJJ-75OFF
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Show this screen or quote <strong>JJJ-75OFF</strong> to your technician upon arrival. Valid on repairs $300+ (limit one per customer).
          </p>
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

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-center gap-2 rounded-xl border border-brand-accent/40 bg-brand-accent/10 p-2.5 sm:p-3 text-xs sm:text-sm font-semibold text-brand-navy">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent text-brand-navy-dark text-xs font-black">
          $
        </span>
        <div className="leading-snug">
          <p>
            <strong>$75 Repair Voucher:</strong> Unlocked automatically when you submit this form or text a photo!
          </p>
          <p className="text-[11px] font-normal text-slate-600 mt-0.5">
            *Valid on repairs $300+. Limit one voucher per customer.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`name-${uid}`}>Full Name</Label>
          <Input
            id={`name-${uid}`}
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-xs font-medium text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`phone-${uid}`}>Phone Number</Label>
          <Input
            id={`phone-${uid}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(626) 555-0123"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <p className="text-xs font-medium text-destructive">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`email-${uid}`}>Email Address</Label>
          <Input
            id={`email-${uid}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="text-xs font-medium text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`service-${uid}`}>Service Needed</Label>
          <Select
            value={values.service || null}
            onValueChange={(value) => updateField("service", (value as string) ?? "")}
          >
            <SelectTrigger id={`service-${uid}`} className="w-full">
              <SelectValue placeholder="Select a service" />
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

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`zip-${uid}`}>Address / Zip Code</Label>
        <Input
          id={`zip-${uid}`}
          name="zip"
          autoComplete="postal-code"
          placeholder="91776"
          value={values.zip}
          onChange={(e) => updateField("zip", e.target.value)}
          aria-invalid={Boolean(errors.zip)}
        />
        {errors.zip && (
          <p className="text-xs font-medium text-destructive">{errors.zip}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor={`details-${uid}`}>Brief Description of Issue</Label>
        <Textarea
          id={`details-${uid}`}
          name="details"
          rows={compact ? 3 : 4}
          value={values.details}
          onChange={(e) => updateField("details", e.target.value)}
          placeholder="Tell us what's going on — e.g. kitchen sink is clogged, water heater not heating, etc."
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-1 w-full bg-brand-accent text-brand-navy-dark hover:bg-sky-300 font-bold"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Claim $75 Voucher &amp; Get Estimate
          </>
        )}
      </Button>
      {errors._form && (
        <p className="text-center text-xs text-destructive">{errors._form}</p>
      )}
      <p className="text-center text-[11px] text-muted-foreground leading-normal">
        *Voucher valid on repairs $300+. Limit 1 per customer. By submitting, you agree to be contacted about your service request.
      </p>
    </form>
  );
}
