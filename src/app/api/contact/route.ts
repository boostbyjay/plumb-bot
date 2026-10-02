import { NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import { siteConfig } from "@/lib/site-config";

const COUNTER_FILE = "data/lead-counter.json";
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function getNextLeadNumber(): Promise<number> {
  try {
    const raw = await fs.readFile(COUNTER_FILE, "utf-8");
    const data = JSON.parse(raw);
    const next = (data.count || 0) + 1;
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count: next }, null, 2));
    return next;
  } catch {
    await fs.writeFile(COUNTER_FILE, JSON.stringify({ count: 1 }, null, 2));
    return 1;
  }
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return request.headers.get("host") || "unknown";
}

function buildCustomerEmail(name: string, serviceLabel: string, phone: string, zip: string, details: string): string {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e293b; border-radius: 8px 8px 0 0; padding: 24px; text-align: center;">
        <img src="${siteConfig.siteUrl}/email/logo-email.png" alt="JJJ Plumbing" style="max-width: 420px; width: 100%; height: auto; display: block; margin: 0 auto;" />
        <p style="color: #94a3b8; font-size: 13px; margin: 10px 0 0 0;">We&apos;ll be in touch within 5 minutes during business hours</p>
      </div>
      <div style="background-color: #ffffff; border-radius: 0 0 8px 8px; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
        <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 16px 18px; margin-bottom: 20px;">
          <p style="color: #92400e; font-size: 15px; font-weight: 700; margin: 0 0 4px 0;">🎉 10% Off Your First Visit — Confirmed</p>
          <p style="color: #a16207; font-size: 13px; margin: 0;">Your discount is locked in.</p>
        </div>

        <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">What to Expect Next</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; width: 160px;">⏱ Response Time</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">Within 5 minutes during business hours (Mon–Sat, 8AM–6PM)</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">💰 Pricing</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">Upfront pricing — you approve before work begins</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">🛡 Guarantee</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">100% satisfaction guaranteed on every job</td>
          </tr>
        </table>

        <h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Your Estimate Request</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; width: 140px;">Name</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Service</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${serviceLabel}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Zip / Address</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${zip || "—"}</td>
          </tr>
          ${details ? `
          <tr>
            <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; vertical-align: top;">Details</td>
            <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0; white-space: pre-wrap;">${details}</td>
          </tr>` : ""}
        </table>

        <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
          <p style="color: #075985; font-size: 13px; font-weight: 600; margin: 0 0 6px 0;">Need immediate help?</p>
          <p style="color: #0c4a6e; font-size: 13px; margin: 0 0 8px 0;">Call us directly:</p>
          <p style="margin: 0;"><a href="tel:+16265066951" style="color: #2563eb; font-size: 16px; font-weight: 700; text-decoration: none;">(626) 506-6951</a></p>
        </div>

        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          JJJ Plumbing Inc &middot; Licensed & Insured &middot; CA LIC #842875<br />
          Serving Los Angeles, Orange County &amp; the San Gabriel Valley since 2001
        </p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, phone, email, service, zip, details } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      "emergency-repairs": "Emergency Repairs",
      "drain-cleaning": "Drain Cleaning & Hydro Jetting",
      "water-heaters": "Water Heater Services",
      "sewer-lines": "Sewer Line Repair & Replacement",
      "commercial": "Commercial Plumbing",
      "other": "Something else",
    };

    const serviceLabel = serviceLabels[service] || service;
    const summary = `${serviceLabel} request from ${name} in ${zip || "their area"}${details ? `. ${details}` : ""}`;
    const leadNumber = await getNextLeadNumber();
    const ip = getClientIp(request);

    const leadEmail = process.env.LEAD_EMAIL || "jakecosta444@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || "JJJ Plumbing <onboarding@resend.dev>";

    const customerHtml = buildCustomerEmail(name, serviceLabel, phone, zip || "", details || "");

    const results = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [leadEmail],
        subject: `Lead #${leadNumber} · ${serviceLabel} — ${name}`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #1e293b; border-radius: 8px 8px 0 0; padding: 20px 24px;">
              <p style="color: #f59e0b; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 4px 0;">New Lead</p>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0;">${serviceLabel}</h1>
                <span style="background-color: #ef4444; color: #ffffff; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px;">High priority</span>
                <span style="background-color: #2563eb; color: #ffffff; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 999px;">#${leadNumber}</span>
              </div>
            </div>
            <div style="background-color: #ffffff; border-radius: 0 0 8px 8px; padding: 20px 24px; border: 1px solid #e2e8f0; border-top: none;">
              <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 18px 0;">${summary}</p>

              <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;">
                <p style="color: #92400e; font-size: 13px; font-weight: 700; margin: 0 0 4px 0;">🎉 Discount Applied</p>
                <p style="color: #a16207; font-size: 13px; margin: 0;">This customer claimed <strong>10% off their first visit</strong> by requesting an estimate online.</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; width: 140px;">Lead #</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0; font-family: monospace; font-size: 16px; font-weight: 700;">${leadNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Name</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Email</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Phone</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Service</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${serviceLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">Zip / Address</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0;">${zip || "—"}</td>
                </tr>
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0;">IP Address</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0; font-family: monospace;">${ip}</td>
                </tr>
                ${details ? `
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; vertical-align: top;">Details</td>
                  <td style="padding: 10px 14px; color: #1e293b; border: 1px solid #e2e8f0; white-space: pre-wrap;">${details}</td>
                </tr>` : ""}
              </table>
              <p style="margin-top: 18px; font-size: 12px; color: #94a3b8;">Received from jjjplumbing.com — ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [email],
        subject: `Your Estimate Request #${leadNumber} — JJJ Plumbing`,
        html: customerHtml,
      }),
    ]);

    const [leadResult, customerResult] = results;

    if (leadResult.error || customerResult.error) {
      console.error("Resend error:", JSON.stringify(leadResult.error || customerResult.error));
      return NextResponse.json(
        { ok: false, error: "Email failed to send." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, leadNumber });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 }
    );
  }
}
