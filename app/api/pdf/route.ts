import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  try {
    // Create new PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleFontSize = 20;
    const textFontSize = 12;

    let y = height - 60;

    // === Logo / Brand ===
    page.drawText("AI Signal Pro", {
      x: 200,
      y,
      size: titleFontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 40;

    // === Title ===
    page.drawText("AI Website Visibility Report", {
      x: 150,
      y,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 40;

    // === Intro ===
    const intro = `This report shows how visible your website is for AI platforms.
It highlights 15 key factors that directly influence AI visibility.`;
    page.drawText(intro, {
      x: 50,
      y,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
      lineHeight: 14,
    });
    y -= 80;

    // === Example factors ===
    const factors = [
      "1. robots.txt — Controls whether AI systems can access your site.",
      "2. sitemap.xml — Provides AI with a map of your site’s structure.",
      "3. X-Robots-Tag — Server headers controlling indexing.",
      "4. Meta robots — Page-level tags for AI visibility.",
      "5. Canonical — Prevents duplicate content issues.",
    ];

    factors.forEach((factor) => {
      page.drawText(factor, {
        x: 50,
        y,
        size: textFontSize,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    });

    // === Conclusion ===
    const conclusion = `All listed factors directly affect your site’s visibility in AI platforms.
The attached technical guidelines are advisory and can be used to implement improvements.`;
    page.drawText(conclusion, {
      x: 50,
      y: y - 40,
      size: textFontSize,
      font,
      color: rgb(0, 0, 0),
      lineHeight: 14,
    });

    // === Footer ===
    page.drawText("AI Signal Pro is a product of Magic of Discoveries LLC", {
      x: 50,
      y: 30,
      size: 8,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Finalize PDF
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
