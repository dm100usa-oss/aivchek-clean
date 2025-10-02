// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";
import { sendReportEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const element = React.createElement(ReportPDF, {
      url: "example.com",
      mode: "test",
      score: 75,
      date: new Date().toISOString().slice(0, 10),
      results: [
        { name: "robots.txt", desc: "Controls whether AI can access your site.", status: "Good" },
        { name: "sitemap.xml", desc: "Provides AI with page structure for indexing.", status: "Moderate" },
      ],
    });

    const pdfBuffer = await renderToBuffer(element as React.ReactElement);

    await sendReportEmail({
      to: "your-email@example.com",
      url: "example.com",
      mode: "test",
      ownerBuffer: pdfBuffer,
      developerBuffer: pdfBuffer,
    });

    return new NextResponse("PDF generated and email sent", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
