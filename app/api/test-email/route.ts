// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { sendReportEmail } from "../../../lib/email";

export async function GET() {
  const success = await sendReportEmail(
    "dm100usa@gmail.com",
    "Test Email",
    "This is a test email from AI Signal Pro."
  );

  if (success) {
    return NextResponse.json({ status: "ok", message: "Email sent successfully" });
  } else {
    return NextResponse.json({ status: "error", message: "Email send failed" }, { status: 500 });
  }
}
