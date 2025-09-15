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

    page.drawText("Этот отчёт показывает, насколько сайт виден для AI-платформ.", {
      x: 80,
      y: height - 200,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // Factors page
    const page2 = pdfDoc.addPage([595, 842]);
    let y = height - 80;

    const factors = [
      "1. robots.txt — Управляет тем, виден ли сайт AI.",
      "2. sitemap.xml — Показывает AI структуру сайта.",
      "3. X-Robots-Tag — Управление индексированием через заголовки.",
      "4. Meta robots — Теги в <head>, влияющие на видимость.",
      "5. Canonical — Указывает, какая страница главная.",
      "6. Title — Заголовки страниц.",
      "7. Meta description — Краткие описания страниц.",
      "8. Open Graph — Корректное отображение ссылок.",
      "9. H1 — Основные заголовки страниц.",
      "10. Structured Data — Разметка schema.org.",
      "11. Mobile friendly — Адаптивность для телефонов.",
      "12. HTTPS — Безопасное соединение.",
      "13. Alt-тексты — Подписи к изображениям.",
      "14. Favicon — Иконка сайта.",
      "15. 404 page — Корректная страница ошибки.",
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

    // Conclusion page
    const page3 = pdfDoc.addPage([595, 842]);
    page3.drawText("Заключение", {
      x: 50,
      y: height - 80,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });

    page3.drawText(
      "Все перечисленные факторы напрямую влияют на то, насколько сайт заметен для AI-платформ. " +
        "Для устранения проблем и улучшения видимости приложено ТЗ для разработчика.",
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

    // Save PDF
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
