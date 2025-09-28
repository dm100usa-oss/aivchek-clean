import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 72,
    results: [
      { name: "robots.txt", status: "Passed" },
      { name: "sitemap.xml", status: "Missing", recommendation: "Add sitemap.xml" },
    ],
  };

  // ✅ Оборачиваем ReportPDF в <React.Fragment>, чтобы renderToBuffer видел <Document>
  const pdfBuffer = await renderToBuffer(
    <ReportPDF {...testData} />
  );

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
