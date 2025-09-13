import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, url, score } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "AI Visibility Pro <noreply@aivcheck.com>",
      to: email,
      subject: "Your AI Visibility Pro Report",
      html: `
        <h2>Your AI Visibility Check</h2>
        <p>Website: <strong>${url}</strong></p>
        <p>Visibility Score: <strong>${score}%</strong></p>
        <p>The full PDF report feature is coming soon.</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
