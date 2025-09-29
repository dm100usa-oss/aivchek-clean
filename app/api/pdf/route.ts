import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
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

  // создаём React-элемент для PDF
  const element = React.createElement(ReportPDF, testData);

  // рендерим PDF в буфер
  const pdfBuffer = await renderToBuffer(element);

  // возвращаем PDF как ответ API
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
