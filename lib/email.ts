// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  to: string;
  url: string;
  mode: string;
  ownerBuffer?: Buffer;
  developerBuffer?: Buffer;
}

export async function sendReportEmail({
  to,
  url,
  mode,
  ownerBuffer,
  developerBuffer,
}: SendReportEmailProps) {
  try {
    await resend.emails.send({
      from: "AI Signal Max <reports@aisignalmax.com>",
      to,
      subject: `AI Website Visibility Report – ${url}`,
      text: `Hello,

Attached is your AI Website Visibility Report for ${url}.
Mode: ${mode === "pro" ? "Full (15 factors)" : "Quick (5 factors)"}.

You will find:
– An overview for the site owner.
– A detailed checklist for the developer.

All visibility scores are approximate and provided for user convenience only.

Best regards,
AI Signal Max Team`,
      attachments: [
        ...(ownerBuffer
          ? [{ filename: `AI_Report_Owner_${url}.pdf`, content: ownerBuffer }]
          : []),
        ...(developerBuffer
          ? [{ filename: `AI_Report_Developer_${url}.pdf`, content: developerBuffer }]
          : []),
      ],
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
