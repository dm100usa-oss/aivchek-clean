// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    const testData = {
      url: "https://example.com",
      score: 72,
      results: [
        { name: "Robots.txt", status: "Good", recommendation: "Keep it updated." },
        { name: "Sitemap.xml", status: "Moderate", recommendation: "Fix missing entries." },
        { name: "X-Robots-Tag", status: "Poor", recommendation: "Remove disallow rules." },
      ],
    };

    const pdfBuffer = await renderToBuffer(<ReportPDF {...testData} />);

    return new NextResponse(pdfBuffer, {
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
