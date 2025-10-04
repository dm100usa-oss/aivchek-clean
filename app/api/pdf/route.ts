// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { sendReportEmail } from "@/lib/email";
import { generateReports } from "@/lib/pdf";
import { analyze } from "@/lib/analyze";
import { PDFData } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // анализ сайта
    const analysis = await analyze(url, mode);

    // данные для PDF
    const pdfData: PDFData = {
      url,
      date: new Date().toISOString().split("T")[0],
      analysis,
    };

    // формируем оба PDF
    const { ownerBuffer, developerBuffer } = await generateReports(pdfData);

    // отправляем email
    await sendReportEmail({
      to,
      url,
      mode,
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
