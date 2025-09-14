import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ===== Титульная страница =====
    const titlePage = pdfDoc.addPage([595, 842]); // A4
    const { height } = titlePage.getSize();

    titlePage.drawText("AI Signal Pro", {
      x: 200,
      y: height - 120,
      size: 28,
      font,
      color: rgb(0, 0, 0),
    });

    titlePage.drawText("AI Website Visibility Report", {
      x: 160,
      y: height - 160,
      size: 20,
      font,
      color: rgb(0, 0, 0),
    });

    titlePage.drawText(
      "Этот отчёт показывает, насколько ваш сайт виден для ИИ-платформ.",
      { x: 80, y: height - 200, size: 12, font, color: rgb(0, 0, 0) }
    );

    titlePage.drawText("Проверенный сайт: www.example.com", {
      x: 80,
      y: height - 240,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    titlePage.drawText("Дата проверки: 14 сентября 2025", {
      x: 80,
      y: height - 260,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // ===== Вторая страница: результат и круг =====
    const page2 = pdfDoc.addPage([595, 842]);
    const { width: w2, height: h2 } = page2.getSize();

    page2.drawText("Общая видимость сайта", {
      x: 200,
      y: h2 - 100,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    // Круг (фон)
    page2.drawCircle({
      x: w2 / 2,
      y: h2 - 250,
      size: 80,
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 14,
    });

    // Круг (прогресс — 73%)
    page2.drawCircle({
      x: w2 / 2,
      y: h2 - 250,
      size: 80,
      borderColor: rgb(0.2, 0.7, 0.3), // зелёный
      borderWidth: 14,
    });

    // Проценты
    page2.drawText("73%", {
      x: w2 / 2 - 20,
      y: h2 - 260,
      size: 32,
      font,
      color: rgb(0, 0, 0),
    });

    // Итоговый вывод
    page2.drawText(
      "Ваш сайт имеет СРЕДНЮЮ видимость для ИИ-платформ.",
      { x: 80, y: h2 - 400, size: 12, font, color: rgb(0, 0, 0) }
    );
    page2.drawText(
      "Большинство параметров работают корректно, но несколько требуют доработки.",
      { x: 80, y: h2 - 420, size: 12, font, color: rgb(0, 0, 0) }
    );

    // ===== Третья страница: факторы =====
    const page3 = pdfDoc.addPage([595, 842]);
    let y = h2 - 60;
    const factors = [
      "1. robots.txt — Это файл, который управляет тем, видят ли ИИ ваш сайт.",
      "2. sitemap.xml — Карта сайта показывает ИИ, какие страницы есть.",
      "3. X-Robots-Tag — Настройка на сервере, управляющая индексированием.",
      "4. Meta robots — Тег внутри страницы для управления показом.",
      "5. Canonical — Указывает ИИ главную страницу и предотвращает дубли.",
      "6. Title — Заголовок страницы влияет на клики и видимость.",
      "7. Meta description — Краткое описание под заголовком.",
      "8. Open Graph — Теги для привлекательных ссылок в соцсетях и AI.",
      "9. H1 — Главный заголовок страницы для AI и клиентов.",
      "10. Structured Data — Разметка, объясняющая контент сайта.",
      "11. Mobile friendly — Проверка удобства использования на телефоне.",
      "12. HTTPS — Протокол безопасности, обязательный для доверия.",
      "13. Alt-тексты — Подписи к изображениям для AI.",
      "14. Favicon — Маленькая иконка сайта.",
      "15. 404 page — Страница ошибки, важная для корректности."
    ];

    for (const factor of factors) {
      page3.drawText(factor, {
        x: 50,
        y,
        size: 11,
        font,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    }

    // ===== Четвёртая страница: заключение и поддержка =====
    const page4 = pdfDoc.addPage([595, 842]);

    page4.drawText("Заключение", {
      x: 50,
      y: h2 - 80,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });
    page4.drawText(
      "Все перечисленные факторы напрямую влияют на видимость сайта в ИИ-платформах.",
      { x: 50, y: h2 - 110, size: 12, font, color: rgb(0, 0, 0) }
    );
    page4.drawText(
      "К отчёту приложено техническое задание для разработчика.",
      { x: 50, y: h2 - 130, size: 12, font, color: rgb(0, 0, 0) }
    );

    page4.drawText("Поддержка AI Signal Pro", {
      x: 50,
      y: h2 - 180,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });
    page4.drawText(
      "Если у вас нет связи с разработчиком, наша команда может помочь.",
      { x: 50, y: h2 - 200, size: 12, font, color: rgb(0, 0, 0) }
    );
    page4.drawText("Контакт: support@aisignalpro.com", {
      x: 50,
      y: h2 - 220,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });

    // ===== Футер =====
    page4.drawText("AI Signal Pro is a product of Magic of Discoveries LLC", {
      x: 50,
      y: 30,
      size: 8,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });

    // ===== Сохраняем PDF =====
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
