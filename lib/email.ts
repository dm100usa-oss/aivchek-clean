import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

interface SendReportEmailProps {
  to: string;
  url: string;
  mode: string;
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
  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2>AI Website Visibility Report</h2>
      <p>Website: <b>${url}</b></p>
      <p>Mode: <b>${mode}</b></p>
      <p>Attached are two reports: one for the site owner and one for the developer.</p>
    </div>
  `;

  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject,
    html,
    attachments: [
      { filename: "Owner_Report.pdf", content: ownerBuffer.toString("base64"), type: "application/pdf" },
      { filename: "Developer_Report.pdf", content: developerBuffer.toString("base64"), type: "application/pdf" },
    ],
  });
}
