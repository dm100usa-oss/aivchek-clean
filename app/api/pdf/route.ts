import { NextResponse } from "next/server";
import { analyzeSite } from "@/lib/analyze";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { PDFData } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Run real site analysis
    const analysis = await analyzeSite(url);
    const date = new Date().toISOString().split("T")[0];

    // Build pdfData strictly by type
    const pdfData: PDFData = {
      url,
      date,
      score: analysis.score,
      interpretation: analysis.interpretation,
      items: analysis.items,
    };

    // Generate two PDFs (Owner + Developer)
    const { ownerBuffer, developerBuffer } = await generateReports(pdfData);

    // Send Owner PDF by email (как раньше)
    await sendReportEmail({
      to,
      url,
      mode,
      pdfBuffer: ownerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PDF route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
