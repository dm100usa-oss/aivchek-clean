// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  to: string;
  url: string;
  mode: string;
  pdfBuffer?: Buffer;
}

export async function sendReportEmail({
  to,
  url,
  mode,
  pdfBuffer,
}: SendReportEmailProps) {
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
      <h2 style="margin-bottom: 16px;">AI Website Visibility Report</h2>
      <p>Website: ${url}</p>
      <p>Mode: ${mode}</p>
      <p>This report is attached as a PDF.</p>
      <p>If you need support, please contact: <a href="mailto:support@aisignalmax.com">support@aisignalmax.com</a></p>
    </div>
  `;

  const attachments =
    pdfBuffer && pdfBuffer.length > 0
      ? [
          {
            filename: "AI-Website-Visibility-Report.pdf",
            content: pdfBuffer.toString("base64"),
            type: "application/pdf",
          },
        ]
      : [];

  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject,
    text: plainText,
    html,
    attachments,
  });
}
