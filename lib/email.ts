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
  const text = `Hello,

Attached is your AI Website Visibility Report for ${url}.
It includes an overview for the site owner and a detailed checklist for the developer.

Best regards,
AI Signal Max`;

  await resend.emails.send({
    from: "AI Signal Max <reports@aisignalmax.com>",
    to,
    subject,
    text,
    attachments: [
      {
        filename: "Owner_Report.pdf",
        content: ownerBuffer.toString("base64"),
      },
      {
        filename: "Developer_Report.pdf",
        content: developerBuffer.toString("base64"),
      },
    ],
  });
}
