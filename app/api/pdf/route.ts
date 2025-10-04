// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { analyze } from "@/lib/analyze";
import { sendReportEmail } from "@/lib/email";
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

    // Реальный анализ сайта
    const analysis = await analyze(url, mode);
    const date = new Date().toISOString().split("T")[0];

    // Генерация PDF отчётов
    const { ownerBuffer, developerBuffer } = await generateReports(
      url,
      date,
      analysis
    );

    // Отправка письма с двумя PDF вложениями
    await sendReportEmail({
      to,
      url,
      mode,
      attachments: [
        { filename: "Owner_Report.pdf", content: ownerBuffer },
        { filename: "Developer_Report.pdf", content: developerBuffer },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PDF route error:", err);
    return NextResponse.json(
      { error: "Failed to generate and send report" },
      { status: 500 }
    );
  }
}
