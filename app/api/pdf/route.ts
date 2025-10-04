// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { analyze } from "@/lib/analyze";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { PDFData } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // анализ сайта
    const analysis = await analyze(url, mode);

    const date = new Date().toISOString().split("T")[0];

    const pdfData: PDFData = {
      url,
      date,
      analysis,
    };

    // генерируем Owner + Developer PDF
    const { ownerBuffer, developerBuffer } = await generateReports(pdfData);

    // отправляем email с вложениями
    await sendReportEmail({
      to,
      url,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
