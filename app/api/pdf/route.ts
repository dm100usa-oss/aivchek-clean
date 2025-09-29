import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    results: [
      { name: "robots.txt", status: "Passed" },
      { name: "sitemap.xml", status: "Failed", recommendation: "Add sitemap" },
    ],
  };

  // create React element without JSX (server-safe)
  const element = React.createElement(ReportPDF, testData);

  // call pdf(...) with a cast to any to avoid TS DocumentProps mismatch,
  // then get buffer
  const instance: any = pdf(element as any);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
