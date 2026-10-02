import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, zip, details } = body;

    await resend.emails.send({
      from: "JJJ Plumbing <leads@jetmanjetting.com>",
      to: ["jobs@jetmanjetting.com"],
      subject: `New lead: ${service || "General Inquiry"} from ${name}`,
      html: `
        <h2>New Estimate Request</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Zip:</strong> ${zip}</li>
          <li><strong>Details:</strong> ${details || "None provided"}</li>
        </ul>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
