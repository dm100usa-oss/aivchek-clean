import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Title page
    const page = pdfDoc.addPage([595, 842]); // A4
    const { height } = page.getSize();

    page.drawText("AI Signal Pro", {
      x: 220,
      y: height - 100,
      size: 24,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText("AI Website Visibility Report", {
      x: 150,
      y: height - 150,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    page.drawText(
      "This report shows how visible your website is for AI platforms.",
      {
        x: 80,
        y: height - 200,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );

    // Second page with factors
    const page2 = pdfDoc.addPage([595, 842]);
    let y = height - 80;

    const factors = [
      "1. robots.txt — Controls whether AI systems can access your site.",
      "2. sitemap.xml — Provides AI with a map of your site’s structure.",
      "3. X-Robots-Tag — Server headers controlling indexing.",
      "4. Meta robots — Page-level tags for AI visibility.",
      "5. Canonical — Prevents duplicate content issues.",
      "6. Title — Titles influence click-through and AI visibility.",
      "7. Meta description — Short description under title in results.",
      "8. Open Graph — Makes links attractive in AI and social platforms.",
      "9. H1 — Main heading of the page, essential for AI understanding.",
      "10. Structured Data — Schema that explains page content to AI.",
      "11. Mobile friendly — Determines if site is usable on phones.",
      "12. HTTPS — Secure connection, base trust signal for AI.",
      "13. Alt texts — Allow AI to understand images.",
      "14. Favicon — Small site icon, a completeness signal.",
      "15. 404 page — Correct error handling for non-existent pages."
    ];

    for (const factor of factors) {
      page2.drawText(factor, {
        x: 50,
        y,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    }

    // Conclusion
    const page3 = pdfDoc.addPage([595, 842]);
    page3.drawText("Conclusion", {
      x: 50,
      y: height - 80,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
    page3.drawText(
      "All listed factors directly affect your site’s visibility in AI platforms. The attached technical guidelines are advisory and should be applied with consideration of your website specifics.",
      {
        x: 50,
        y: height - 120,
        size: 12,
        font,
        color: rgb(0, 0, 0),
        lineHeight: 14,
      }
    );

    // Footer
    page3.drawText("AI Signal Pro is a product of Magic of Discoveries LLC", {
      x: 50,
      y: 30,
      size: 8,
      font,
      color: rgb(0.4, 0.4, 0.4),
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
