// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  to: string;
  url: string;
  mode: "quick" | "pro";
  ownerBuffer: Buffer;
  developerBuffer: Buffer;
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

- Owner Report: summary for business owner
- Developer Report: checklist for implementation

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2>AI Website Visibility Report</h2>
      <p>Website: <strong>${url}</strong></p>
      <p>Mode: <strong>${mode}</strong></p>
      <p>Attached are two reports:</p>
      <ul>
        <li><strong>Owner Report</strong> – summary for business owner</li>
        <li><strong>Developer Report</strong> – checklist for implementation</li>
      </ul>
      <p style="margin-top:20px;">Best regards,<br/>AI Signal Max</p>
    </div>
  `;

  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject,
    text: plainText,
    html,
    attachments: [
      {
        filename: "Owner_Report.pdf",
        content: ownerBuffer.toString("base64"),
        encoding: "base64",
      },
      {
        filename: "Developer_Report.pdf",
        content: developerBuffer.toString("base64"),
        encoding: "base64",
      },
    ],
  });
}
