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
It includes:
- An overview for the site owner
- A detailed checklist for the developer

If you are not currently working with a developer, AI Signal Max can help improve your site’s visibility. Contact: support@aisignalmax.com

Best regards,
AI Signal Max`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2>AI Website Visibility Report</h2>
      <p>Attached are your reports for <strong>${url}</strong>.</p>
      <ul>
        <li>Owner Report: Overview of visibility</li>
        <li>Developer Report: Detailed checklist</li>
      </ul>
      <p>If you are not currently working with a developer, AI Signal Max can help improve your site’s visibility.<br/>
      Contact: <a href="mailto:support@aisignalmax.com">support@aisignalmax.com</a></p>
    </div>
  `;

  const attachments: { filename: string; content: Buffer }[] = [];
  if (ownerBuffer) attachments.push({ filename: "OwnerReport.pdf", content: ownerBuffer });
  if (developerBuffer) attachments.push({ filename: "DeveloperReport.pdf", content: developerBuffer });

  await resend.emails.send({
    from: "AI Signal Max <noreply@aisignalmax.com>",
    to,
    subject,
    text: plainText,
    html,
    attachments,
  });
}
