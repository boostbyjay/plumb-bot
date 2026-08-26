"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
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
import { services } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success";

type FormValues = {
  name: string;
  phone: string;
  service: string;
  zip: string;
  details: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
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
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.phone.trim()) nextErrors.phone = "Please enter a phone number.";
    if (!values.service) nextErrors.service = "Please select a service.";
    if (!values.zip.trim()) nextErrors.zip = "Please enter your address or zip code.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // NOTE: This form currently submits locally only. To go live, wire this
    // up to Formspree, Resend, or a Next.js Server Action and send `values`
    // to your dispatch email/SMS pipeline.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center",
          className,
        )}
      >
        <CheckCircle2 className="size-12 text-emerald-600" />
        <h3 className="text-lg font-bold text-emerald-900">
          Thanks! Dispatch has received your request
        </h3>
        <p className="max-w-sm text-sm text-emerald-800">
          A member of our team will call you within 5 minutes during business
          hours. For true emergencies, please call us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
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
            Get My Free Estimate
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your service request.
        No spam, ever.
      </p>
    </form>
  );
}
