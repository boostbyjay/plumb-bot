import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, zip, details } = body;

    // Forward to Formspree — no API key needed at build time
    const res = await fetch("https://formspree.io/f/maengkbw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, service, zip, details }),
    });

    if (!res.ok) throw new Error("Formspree error");

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}