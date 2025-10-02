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
  const subject = `AI Website Visibility Report – ${url}`;

  const plainText = `Hello,

Attached are your AI Website Visibility Reports for ${url}.
- Overview for the site owner
- Detailed checklist for the developer

If you are not currently in contact with a developer, AI Signal Max can help quickly improve your website’s visibility in AI platforms.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin-bottom: 16px;">AI Website Visibility Reports</h2>
      <p>Hello,</p>
      <p>Attached are your AI Website Visibility Reports for <strong>${url}</strong>:</p>
      <ul>
        <li>Overview for the site owner</li>
        <li>Detailed checklist for the developer</li>
      </ul>
      <p>If you are not currently in contact with a developer, <strong>AI Signal Max</strong> can help quickly improve your website’s visibility in AI platforms.</p>
      <p>Contact: <a href="mailto:support@aisignalmax.com">support@aisignalmax.com</a></p>
      <p style="margin-top: 24px;">Best regards,<br/>AI Signal Max</p>
    </div>
  `;

  const attachments = [];
  if (ownerBuffer) {
    attachments.push({
      filename: "AI-Signal-Owner-Report.pdf",
      content: ownerBuffer.toString("base64"),
    });
  }
  if (developerBuffer) {
    attachments.push({
      filename: "AI-Signal-Developer-Report.pdf",
      content: developerBuffer.toString("base64"),
    });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // keep sandbox sender for now
      to,
      subject,
      text: plainText,
      html,
      attachments,
    });
    return true;
  } catch (error: any) {
    console.error("Email send failed:", error);
    return false;
  }
}
