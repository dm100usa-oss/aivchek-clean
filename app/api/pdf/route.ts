import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/ReportPDF";
import React from "react";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    results: [
      { name: "robots.txt", status: "Passed" },
      { name: "sitemap.xml", status: "Failed", recommendation: "Add sitemap" },
    ],
  };

  // Оборачиваем в React.createElement, чтобы типы совпали
  const element = React.createElement(ReportPDF, testData);

  const pdfBuffer = await renderToBuffer(element as React.ReactElement);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
