// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  url: string;
  mode: string;
  ownerBuffer?: Buffer;
  developerBuffer?: Buffer;
}

export async function sendReportEmail({
  url,
  mode,
  ownerBuffer,
  developerBuffer,
}: SendReportEmailProps) {
  const subject = `AI Website Visibility Report – ${url}`;

  const plainText = `Hello,

Attached are your AI Website Visibility Reports for ${url}.
This includes an overview for the site owner and a detailed checklist for the developer.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // sandbox адрес
      to: "dm100usa@gmail.com",      // только этот адрес будет работать в sandbox
      subject,
      text: plainText,
      attachments: [
        ...(ownerBuffer
          ? [{ filename: "AI-Signal-Owner.pdf", content: ownerBuffer.toString("base64") }]
          : []),
        ...(developerBuffer
          ? [{ filename: "AI-Signal-Developer.pdf", content: developerBuffer.toString("base64") }]
          : []),
      ],
    });
    return true;
  } catch (error: any) {
    console.error("Email send failed:", error);
    return false;
  }
}
