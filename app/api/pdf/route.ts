// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { sendReportEmail } from "@/lib/email";

export async function POST() {
  try {
    const testData = {
      url: "https://example.com",
      score: 85,
    };

    const ownerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Owner, {
        url: testData.url,
        score: testData.score,
        date: new Date().toISOString().split("T")[0],
      }) as React.ReactElement
    );

    const developerBuffer = await renderToBuffer(
      React.createElement(ReportPDF_Developer, {
        url: testData.url,
        score: testData.score,
        date: new Date().toISOString().split("T")[0],
      }) as React.ReactElement
    );

    await sendReportEmail({
      url: testData.url,
      mode: "pro",
      ownerBuffer,
      developerBuffer,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PDF API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
