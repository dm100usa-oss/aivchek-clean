// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";

// ВАЖНО: запрещаем статическую генерацию
export const dynamic = "force-dynamic";

export async function GET() {
  // тестовые данные, чтобы проверить PDF
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toLocaleDateString("en-US"),
    factors: [
      {
        name: "robots.txt",
        desc: "Controls whether AI and search engines can crawl your site",
        status: "Good" as const,
      },
      {
        name: "sitemap.xml",
        desc: "Helps AI discover and index your pages",
        status: "Poor" as const,
      },
    ],
  };

  // создаём React-элемент с правильными пропсами
  const element = React.createElement(ReportPDF, testData);

  // рендерим PDF и получаем буфер
  const instance: any = pdf(element as any);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
