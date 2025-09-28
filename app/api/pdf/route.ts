import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";
import React from "react";

export async function GET() {
  try {
    // Test data
    const testData = {
      url: "https://example.com",
      score: 82,
      results: [
        { name: "Robots.txt", status: "Passed" },
        { name: "Sitemap.xml", status: "Passed" },
        { name: "Meta tags", status: "Needs improvement", recommendation: "Add description meta tag" },
      ],
    };

    // ✅ Use createElement instead of JSX
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
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
