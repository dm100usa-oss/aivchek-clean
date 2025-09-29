import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
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

  const pdfBuffer = await pdf(<ReportPDF {...testData} />).toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
