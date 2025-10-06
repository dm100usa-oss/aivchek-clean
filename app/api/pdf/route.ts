import { NextResponse } from "next/server";
import { sendReportEmail } from "@/lib/email";
import { analyze } from "@/lib/analyze";
import { generatePDF } from "@/lib/generatePDF";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const analysis = await analyze(url, mode);
    const date = new Date().toISOString().split("T")[0];

    // Data passed into HTML templates
    const templateData = {
      url,
      date,
      mode,
      score: analysis?.score ?? 0,
      factors: Array.isArray(analysis?.factors) ? analysis.factors : [],
    };

    // Generate both PDFs via HTML2PDF.app
    const [ownerBuffer, developerBuffer] = await Promise.all([
      generatePDF({ type: "owner", data: templateData }),
      generatePDF({ type: "developer", data: templateData }),
    ]);

    // Send email with both attachments
    await sendReportEmail({
      to,
      url,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PDF route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
