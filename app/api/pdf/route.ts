import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString(),
    factors: [
      {
        name: "robots.txt",
        desc: "Controls whether AI platforms can see your site.",
        status: "Good" as const,
      },
      {
        name: "sitemap.xml",
        desc: "Helps AI index all important pages.",
        status: "Poor" as const,
      },
    ],
  };

  // Create React element safely (no JSX in route.ts)
  const element = React.createElement(ReportPDF, testData);

  // Render to PDF buffer
  const pdfBuffer = await renderToBuffer(element as any);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
