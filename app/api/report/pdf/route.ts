import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    // Генерация PDF из компонента ReportPDF
    const stream = await renderToStream(<ReportPDF />);

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="report.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation failed:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
