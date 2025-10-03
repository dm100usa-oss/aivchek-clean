// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { sendReportEmail } from "@/lib/email";
import { analyzeSite } from "@/lib/analyze";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

export async function POST(req: Request) {
  try {
    const { url, mode, to } = await req.json();

    if (!url || !mode || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Реальный анализ сайта
    const analysis = await analyzeSite(url);

    // Owner PDF
    const ownerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Owner, {
        url,
        date: new Date().toISOString().split("T")[0],
        ...analysis, // score, checks, interpretation
      })
    );

    // Developer PDF
    const developerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Developer, {
        url,
        date: new Date().toISOString().split("T")[0],
        ...analysis,
      })
    );

    // Отправка письма
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
