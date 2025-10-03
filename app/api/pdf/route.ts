import { NextResponse } from "next/server";
import { analyze } from "@/lib/analyze";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const analysis = await analyze(url, mode);
    const date = new Date().toISOString().split("T")[0];

    const { ownerBuffer, developerBuffer } = await generateReports(url, date, analysis);

    await sendReportEmail({
      to,
      url,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
