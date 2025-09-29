import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "../../../components/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    results: [
      { name: "robots.txt", status: "Passed" },
      { name: "sitemap.xml", status: "Failed", recommendation: "Add sitemap" },
    ],
  };

  // Create element without JSX
  const element = React.createElement(ReportPDF, testData);

  const buffer = await pdf(element).toBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
