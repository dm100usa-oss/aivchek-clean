import { NextResponse } from "next/server";
import { pdf } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export const dynamic = "force-dynamic";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString().split("T")[0],
    factors: [
      { name: "robots.txt", desc: "Controls whether AI platforms can see your site.", status: "Good" as const },
      { name: "sitemap.xml", desc: "Helps AI index important pages.", status: "Moderate" as const },
      { name: "X-Robots-Tag", desc: "Server-side header controlling indexing.", status: "Poor" as const },
    ],
  };

  // ← ключевая правка: вызываем ReportPDF(), а не createElement
  const element = ReportPDF(testData);

  const instance: any = pdf(element);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
