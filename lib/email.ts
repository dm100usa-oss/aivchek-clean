// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
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

If you are not currently in contact with a developer, AI Signal Max can help quickly improve your website’s visibility in AI platforms.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin-bottom: 16px;">AI Website Visibility Report</h2>
      <p>Hello,</p>
      <p>Attached is your AI Website Visibility Report for <strong>${url}</strong>.</p>
      <p>It includes an <strong>overview for the site owner</strong> and a <strong>detailed checklist for the developer</strong>.</p>
      <p>If you are not currently in contact with a developer, <strong>AI Signal Max</strong> can help quickly improve your website’s visibility in AI platforms.</p>
      <p>Contact: <a href="mailto:support@aisignalmax.com">support@aisignalmax.com</a></p>
      <p style="margin-top: 24px;">Best regards,<br/>AI Signal Max</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: plainText,
      html,
      attachments: pdfBuffer
        ? [
            {
              filename: "AI-Signal-Report.pdf",
              content: pdfBuffer.toString("base64"),
            },
          ]
        : [],
    });
    return true;
  } catch (error: any) {
    console.error("Email send failed:", error);
    return false;
  }
}
