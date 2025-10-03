// app/api/webhook/route.ts
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { sendReportEmail } from "@/lib/email";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, mode, score, results } = body;
    const date = new Date().toISOString().split("T")[0];

    if (!url || !mode || !score) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (mode === "pro") {
      const ownerBuffer = await renderToBuffer(
        React.createElement(ReportPDF_Owner, { url, score, date, results })
      );
      const devBuffer = await renderToBuffer(
        React.createElement(ReportPDF_Developer, { url, score, date, results })
      );

      await sendReportEmail({
        to: "test@example.com",
        url,
        mode,
        pdfBuffer: ownerBuffer,
      });
      await sendReportEmail({
        to: "dev@example.com",
        url,
        mode,
        pdfBuffer: devBuffer,
      });
    } else {
      const quickBuffer = await renderToBuffer(
        React.createElement(ReportPDF_Owner, { url, score, date, results })
      );
      await sendReportEmail({
        to: "test@example.com",
        url,
        mode,
        pdfBuffer: quickBuffer,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
