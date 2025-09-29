import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/pdf/ReportPDF";

export const dynamic = "force-dynamic";

export async function GET() {
  // тестовые данные; на продакшн ты будешь получать из запроса
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString().split("T")[0],
    factors: [
      {
        title: "robots.txt",
        description: "Controls whether AI platforms can see your site."
      },
      {
        title: "sitemap.xml",
        description: "Helps AI index important pages."
      },
      {
        title: "X-Robots-Tag",
        description: "Server-side header controlling indexing."
      }
    ]
  };

  const element = React.createElement(ReportPDF, {
    logoSrc: "/aisignalmax-logo.png",
    websiteUrl: testData.url,
    date: testData.date,
    score: testData.score,
    factors: testData.factors
  });

  const instance: any = pdf(element);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf"
    }
  });
}
