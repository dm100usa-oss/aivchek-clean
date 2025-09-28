import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 75,
    results: [
      { name: "robots.txt", status: "Passed" },
      { name: "sitemap.xml", status: "Failed", recommendation: "Add sitemap.xml" },
    ],
  };

  // Генерация PDF напрямую из компонента
  const pdfBuffer = await renderToBuffer(ReportPDF(testData));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
