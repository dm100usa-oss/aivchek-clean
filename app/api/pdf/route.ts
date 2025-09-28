import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    const testData = {
      url: "https://example.com",
      score: 82,
      results: [
        { name: "Robots.txt", status: "Passed" },
        { name: "Sitemap.xml", status: "Passed" },
        { name: "Meta tags", status: "Needs improvement", recommendation: "Add description meta tag" },
      ],
    };

    const pdfBuffer = await renderToBuffer(
      React.createElement(ReportPDF, testData)
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
