// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  to: string;
  url: string;
  mode: string;
  pdfBuffer: Buffer; // сюда прилетает готовый PDF
}

export async function sendReportEmail({ to, url, mode, pdfBuffer }: SendReportEmailProps) {
  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject: `AI Website Visibility Report – ${url}`,
    text: `Hello,\n\nAttached is your AI Website Visibility Report for ${url}.\nMode: ${mode}.\n\nBest regards,\nAI Signal Max`,
    attachments: [
      {
        filename: `AI_Signal_Max_Report_${mode}.pdf`,
        content: pdfBuffer.toString("base64"),
      },
    ],
  });
}
