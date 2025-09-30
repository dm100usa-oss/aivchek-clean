// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import getStream from "get-stream";

export async function GET() {
  // Test data (заменишь потом на реальные значения)
  const testData = {
    url: "https://example.com",
    score: 82,
    date: new Date().toISOString().split("T")[0],
  };

  // Создаем PDF-документ
  const doc = new PDFDocument();
  const stream = doc.pipe(getStream.buffer());

  doc.fontSize(20).text("AI Signal Pro — Visibility Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Website: ${testData.url}`);
  doc.text(`Score: ${testData.score}%`);
  doc.text(`Date: ${testData.date}`);

  doc.end();

  const pdfBuffer = await stream;

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
