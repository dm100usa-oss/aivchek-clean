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
The package includes an overview for the site owner and a detailed checklist for the developer.

Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin-bottom: 16px;">AI Website Visibility Report</h2>
      <p>Hello,</p>
      <p>Attached are your AI Website Visibility Reports for <strong>${url}</strong>.</p>
      <p>They include an <strong>overview for the site owner</strong> and a <strong>detailed checklist for the developer</strong>.</p>
      <p>Contact: <a href="mailto:support@aisignalmax.com">support@aisignalmax.com</a></p>
      <p style="margin-top: 24px;">Best regards,<br/>AI Signal Max</p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",   // sandbox sender
      to: ["dm100usa@gmail.com"],      // только твой адрес в тестовом режиме
      subject,
      text: plainText,
      html,
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
