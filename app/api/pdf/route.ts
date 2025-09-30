import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import getStream from "get-stream";

export async function GET() {
  const doc = new PDFDocument();
  const stream = doc.pipe(getStream.buffer());

  doc.fontSize(20).text("AI Signal Pro — Visibility Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text("Website: example.com");
  doc.text("Visibility: 85%");
  doc.text("Status: Good");

  doc.end();

  const pdfBuffer = await stream;

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
