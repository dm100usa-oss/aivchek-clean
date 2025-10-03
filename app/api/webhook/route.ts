import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";
import { sendReportEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const url = body?.url as string;
    const mode = body?.mode as "quick" | "pro";

    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const pdfBuffer = await renderToBuffer(
      React.createElement(ReportPDF, { url, mode, score: 75 })
    );

    await sendReportEmail({
      to: body?.email ?? "test@example.com",
      url,
      mode,
      pdfBuffer
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
