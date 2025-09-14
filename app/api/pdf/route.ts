import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET() {
  try {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    // Будем собирать PDF в буфер
    const chunks: Buffer[] = [];

    // Собираем данные по мере генерации
    doc.on("data", (chunk) => chunks.push(chunk));
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // === Логотип ===
      doc.fontSize(20).text("AI Signal Pro", { align: "center" }).moveDown();

      // === Титульная страница ===
      doc
        .fontSize(28)
        .text("AI Website Visibility Report", { align: "center" })
        .moveDown(2);

      doc
        .fontSize(14)
        .text("This report shows how visible your website is for AI platforms.", {
          align: "center",
        });

      doc.addPage();

      // === Пример раздела (Factor 1) ===
      doc.fontSize(18).text("1. robots.txt", { underline: true }).moveDown(0.5);
      doc.fontSize(12).text(
        "This file controls whether AI systems can access your site. If misconfigured, your site may disappear from AI responses."
      );

      // === Заключение ===
      doc.addPage();
      doc.fontSize(16).text("Conclusion", { underline: true }).moveDown(1);
      doc.fontSize(12).text(
        "All recommendations are provided to improve AI visibility. The attached technical guidelines are advisory and should be applied with consideration of your website specifics."
      );

      doc.end();
    });

    return new NextResponse(pdfBuffer, {
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
