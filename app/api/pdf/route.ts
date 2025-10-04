import { NextResponse } from "next/server";
import { sendReportEmail } from "@/lib/email";
import { analyze } from "@/lib/analyze";
import { generateReports } from "@/lib/pdf";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Анализ сайта
    const analysis = await analyze(url, mode);
    const date = new Date().toISOString().split("T")[0];

    // Генерация PDF
    const { ownerBuffer, developerBuffer } = await generateReports(url, date, analysis);

    // Отправка email с Owner PDF
    await sendReportEmail({
      to,
      url,
      mode,
      pdfBuffer: ownerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PDF Route Error:", err);
    return NextResponse.json(
      { error: "Failed to generate or send PDF" },
      { status: 500 }
    );
  }
}
