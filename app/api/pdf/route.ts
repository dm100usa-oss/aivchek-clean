import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "../../../components/pdf/ReportPDF";
import React from "react";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 72,
    results: [
      { name: "Robots.txt", status: "Good" },
      { name: "Sitemap.xml", status: "Moderate" },
      { name: "X-Robots-Tag", status: "Poor", recommendation: "Add correct headers" },
    ],
  };

  // оборачиваем в <ReportPDF /> и рендерим в PDF
  const element = <ReportPDF {...testData} />;
  const pdfBuffer = await renderToBuffer(element as React.ReactElement);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
