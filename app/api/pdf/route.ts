import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("AI Signal Pro", {
      x: 220,
      y: height - 100,
      size: 24,
      font,
    });

    page.drawText("AI Website Visibility Report", {
      x: 170,
      y: height - 150,
      size: 16,
      font,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=ai-signal-pro-report.pdf",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
