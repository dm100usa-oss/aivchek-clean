import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ---------- Title Page ----------
    const page1 = pdfDoc.addPage([595, 842]); // A4
    const { height } = page1.getSize();

    page1.drawText("AI Signal Pro", {
      x: 200,
      y: height - 120,
      size: 32,
      font: fontTitle,
      color: rgb(0, 0, 0),
    });

    page1.drawText("AI Website Visibility Report", {
      x: 150,
      y: height - 160,
      size: 20,
      font: fontBody,
      color: rgb(0.2, 0.2, 0.2),
    });

    page1.drawText(
      "Этот отчёт показывает, насколько ваш сайт виден для ИИ-платформ.",
      {
        x: 70,
        y: height - 200,
        size: 12,
        font: fontBody,
        color: rgb(0.2, 0.2, 0.2),
      }
    );

    // ---------- Introduction ----------
    const page2 = pdfDoc.addPage([595, 842]);
    let y = height - 80;

    page2.drawText("Введение", {
      x: 50,
      y,
      size: 18,
      font: fontTitle,
    });
    y -= 30;

    const intro = [
      "Этот отчёт подготовлен для владельца сайта.",
      "Он показывает текущее состояние ресурса с точки зрения видимости",
      "в ИИ-платформах и объясняет, какие параметры на это влияют.",
      "Результаты собраны в сводке, а далее даны подробные объяснения и рекомендации.",
    ];
    intro.forEach((line) => {
      page2.drawText(line, { x: 50, y, size: 12, font: fontBody });
      y -= 18;
    });

    // ---------- Summary ----------
    y -= 30;
    page2.drawText("Сводка результатов", {
      x: 50,
      y,
      size: 18,
      font: fontTitle,
    });
    y -= 30;

    const summary = [
      "Высокая видимость (score ≥ 80%) — сайт хорошо подготовлен.",
      "Средняя видимость (40% ≤ score < 80%) — видимость частичная, нужны улучшения.",
      "Низкая видимость (score < 40%) — серьёзные проблемы, исправить как можно скорее.",
    ];
    summary.forEach((line) => {
      page2.drawText(line, { x: 50, y, size: 12, font: fontBody });
      y -= 18;
    });

    // ---------- Parameters ----------
    const page3 = pdfDoc.addPage([595, 842]);
    y = height - 80;
    page3.drawText("Проверенные параметры", {
      x: 50,
      y,
      size: 18,
      font: fontTitle,
    });
    y -= 30;

    const factors = [
      "1. robots.txt — Управляет доступом ИИ к сайту.",
      "2. sitemap.xml — Показывает ИИ структуру страниц.",
      "3. X-Robots-Tag — Заголовки сервера для индексации.",
      "4. Meta robots — Теги в коде страниц.",
      "5. Canonical — Указывает главную версию страницы.",
      "6. Title — Заголовки страниц.",
      "7. Meta description — Описание страниц.",
      "8. Open Graph — Отображение ссылок в соцсетях и AI.",
      "9. H1 — Главные заголовки страниц.",
      "10. Structured Data — JSON-LD разметка.",
      "11. Mobile friendly — Адаптивность сайта.",
      "12. HTTPS — Безопасное соединение.",
      "13. Alt-тексты — Подписи к изображениям.",
      "14. Favicon — Иконка сайта.",
      "15. 404 page — Корректная обработка ошибок.",
    ];
    factors.forEach((line) => {
      page3.drawText(line, { x: 50, y, size: 12, font: fontBody });
      y -= 18;
    });

    // ---------- Conclusion ----------
    const page4 = pdfDoc.addPage([595, 842]);
    y = height - 80;
    page4.drawText("Заключение", { x: 50, y, size: 18, font: fontTitle });
    y -= 30;
    const conclusion =
      "Все перечисленные факторы напрямую влияют на видимость сайта. " +
      "Для устранения выявленных проблем к данному отчёту приложено ТЗ для разработчика. " +
      "Оно носит рекомендательный характер.";
    page4.drawText(conclusion, {
      x: 50,
      y,
      size: 12,
      font: fontBody,
      lineHeight: 14,
    });

    // ---------- Support ----------
    y -= 60;
    page4.drawText("Поддержка AI Signal Pro", {
      x: 50,
      y,
      size: 16,
      font: fontTitle,
    });
    y -= 30;
    page4.drawText(
      "Если у вас нет связи с разработчиком, команда AI Signal Pro может помочь.",
      { x: 50, y, size: 12, font: fontBody }
    );
    y -= 18;
    page4.drawText("Контакт: support@aisignalpro.com", {
      x: 50,
      y,
      size: 12,
      font: fontBody,
    });

    // ---------- Footer ----------
    page4.drawText("AI Signal Pro is a product of Magic of Discoveries LLC", {
      x: 50,
      y: 30,
      size: 8,
      font: fontBody,
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
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
