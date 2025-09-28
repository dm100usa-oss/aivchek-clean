// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    // Тестовые данные, позже заменим на реальные
    const testData = {
      url: "https://example.com",
      score: 72,
      summary: "Your site is partially visible for AI platforms. Some parameters require improvement.",
      factors: [
        { name: "Robots.txt", desc: "Controls access for AI.", status: "Good" },
        { name: "Sitemap.xml", desc: "Helps AI discover pages.", status: "Moderate" },
        { name: "X-Robots-Tag", desc: "Server-side rule for visibility.", status: "Poor" },
      ],
    };

    const pdfStream = await renderToStream(<ReportPDF {...testData} />);
    return new NextResponse(pdfStream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
