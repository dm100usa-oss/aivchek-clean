import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    // Вместо JSX напрямую — передаём функцию
    const pdfBuffer = await renderToBuffer(ReportPDF());

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
