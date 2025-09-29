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
      {
        name: "Meta robots",
        desc: "Page-level control of visibility in AI results.",
        status: "Moderate" as const,
      },
    ],
  };

  // create PDF element
  const element = React.createElement(ReportPDF, testData);

  // render to buffer
  const pdfBuffer = await renderToBuffer(element);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
