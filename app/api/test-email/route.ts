import { NextResponse } from "next/server";
import { sendReportEmail } from "../../../lib/email";

export async function GET() {
  try {
    await sendReportEmail(
      "your-email@example.com", // заменишь на свой email
      "Test Email from AI Signal Pro",
      "This is a test email to confirm Resend works."
    );
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Send failed" }, { status: 500 });
  }
}
