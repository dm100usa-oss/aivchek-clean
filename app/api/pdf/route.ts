import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { sendReportEmail } from "@/lib/email";
import { PDFData } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const testData: PDFData = {
      url: "https://example.com",
      date: new Date().toISOString().slice(0, 10),
      score: 75,
      interpretation: "Moderate",
      checks: [
        { key: "robots_txt", name: "Robots.txt", passed: true, description: "OK" },
        { key: "sitemap_xml", name: "Sitemap.xml", passed: false, description: "Missing" },
      ],
    };

    const ownerElement = React.createElement(ReportPDF_Owner, testData);
    const developerElement = React.createElement(ReportPDF_Developer, testData);

    const ownerBuffer = await renderToBuffer(ownerElement as React.ReactElement);
    const developerBuffer = await renderToBuffer(developerElement as React.ReactElement);

    await sendReportEmail({
      url: testData.url,
      mode: "pro",
      ownerBuffer,
      developerBuffer,
    });

    return new NextResponse("PDFs generated and email sent", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDFs" }, { status: 500 });
  }
}
