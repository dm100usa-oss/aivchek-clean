import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import React from "react";
import ReportPDF, { ReportPDFProps } from "@/components/pdf/ReportPDF";

export const dynamic = "force-dynamic";

export async function GET() {
  const testData: ReportPDFProps = {
    logoSrc: "/aisignalmax-logo.png",
    websiteUrl: "https://example.com",
    date: new Date().toISOString().split("T")[0],
    score: 85,
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
    ],
    checklist:
      "Developer checklist placeholder text. Replace this with the full technical task."
  };

  // Use React.createElement in API route (JSX is not supported here)
  const element = React.createElement(ReportPDF, testData);

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
