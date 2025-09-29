import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString().split("T")[0],
    factors: [
      {
        name: "Robots.txt",
        desc: "This file controls whether AI platforms can see your site.",
        status: "Good" as const,
      },
      {
        name: "Sitemap.xml",
        desc: "The sitemap tells AI which pages exist and should be indexed.",
        status: "Moderate" as const,
      },
      {
        name: "X-Robots-Tag",
        desc: "A server-side setting that tells AI whether your pages can appear in results.",
        status: "Poor" as const,
      },
    ],
  };

  const element = React.createElement(ReportPDF, testData);
  const pdfBuffer = await renderToBuffer(element);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
