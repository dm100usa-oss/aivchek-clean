// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendReportEmail(to: string, subject: string, text: string) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // исправленный адрес для теста
      to,
      subject,
      text,
    });
    return true;
  } catch (error: any) {
    console.error("Email send failed:", error);
    return false;
  }
}
