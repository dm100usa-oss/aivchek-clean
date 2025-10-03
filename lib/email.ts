// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export interface SendReportEmailProps {
  to: string;
  url: string;
  mode: string;
  pdfBuffer?: Buffer;
}

export async function sendReportEmail({ to, url, mode, pdfBuffer }: SendReportEmailProps) {
  const subject = `AI Website Visibility Report – ${url}`;
  const plainText = `Hello,

Attached is your AI Website Visibility Report for ${url}.
It includes an overview for the site owner and a detailed checklist for the developer.

If for any reason you are not currently in contact with a developer, AI Signal Max can help quickly improve your website’s visibility in AI platforms.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="color:#111;">AI Website Visibility Report</h2>
      <p>Hello,</p>
      <p>Attached is your AI Website Visibility Report for <strong>${url}</strong>.</p>
      <p>It includes an overview for the site owner and a detailed checklist for the developer.</p>
      <p>If you are not currently in contact with a developer, 
      <strong>AI Signal Max</strong> can help quickly improve your website’s visibility in AI platforms.</p>
      <p style="margin-top:20px;">Best regards,<br/>AI Signal Max</p>
    </div>
  `;

  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject,
    text: plainText,
    html,
    attachments: pdfBuffer
      ? [
          {
            filename: "AI-Signal-Report.pdf",
            content: pdfBuffer.toString("base64"),
            type: "application/pdf",
            disposition: "attachment",
          },
        ]
      : [],
  });
}
