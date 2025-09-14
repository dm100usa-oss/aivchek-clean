import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  try {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Размер A4
    const pageSize: [number, number] = [595, 842];
    const margin = 50;

    // -------------------
    // ТИТУЛЬНАЯ СТРАНИЦА
    // -------------------
    const titlePage = pdfDoc.addPage(pageSize);
    const { height } = titlePage.getSize();

    titlePage.drawText("AI Signal Pro", {
      x: 200,
      y: height - 150,
      size: 28,
      font: titleFont,
      color: rgb(0, 0, 0),
    });

    titlePage.drawText("Отчёт по видимости сайта для ИИ-платформ", {
      x: 100,
      y: height - 200,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    titlePage.drawText(
      "Этот отчёт показывает, насколько ваш сайт виден для ИИ-платформ.",
      {
        x: 80,
        y: height - 240,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
    );

    // -------------------
    // ВВЕДЕНИЕ
    // -------------------
    const introPage = pdfDoc.addPage(pageSize);

    introPage.drawText("Введение", {
      x: margin,
      y: height - 80,
      size: 16,
      font: titleFont,
    });

    const introText = [
      "Этот отчёт подготовлен для владельца сайта.",
      "Он показывает текущее состояние ресурса с точки зрения видимости в ИИ-платформах и объясняет, какие параметры на это влияют.",
      "Результаты собраны в сводке, а далее даны подробные объяснения и рекомендации.",
    ];

    let yIntro = height - 120;
    introText.forEach((line) => {
      introPage.drawText(line, {
        x: margin,
        y: yIntro,
        size: 12,
        font,
      });
      yIntro -= 20;
    });

    // -------------------
    // СВОДКА РЕЗУЛЬТАТОВ
    // -------------------
    const summaryPage = pdfDoc.addPage(pageSize);
    summaryPage.drawText("Сводка результатов", {
      x: margin,
      y: height - 80,
      size: 16,
      font: titleFont,
    });

    const summaryText = [
      "Высокая видимость (score ≥ 80%)",
      "Ваш сайт хорошо подготовлен для ИИ-платформ. Большинство ключевых параметров настроено корректно. Рекомендуется поддерживать текущее состояние и периодически повторять проверку.",
      "",
      "Средняя видимость (40% ≤ score < 80%)",
      "Ваш сайт в целом виден для ИИ-платформ, но часть параметров требует доработки. Исправление выявленных проблем позволит повысить доверие к ресурсу и укрепить его позиции.",
      "",
      "Низкая видимость (score < 40%)",
      "Ваш сайт имеет серьёзные ограничения видимости в ИИ-платформах. Несколько ключевых параметров настроены некорректно или отсутствуют. Рекомендуется внести изменения как можно скорее.",
    ];

    let ySum = height - 120;
    summaryText.forEach((line) => {
      summaryPage.drawText(line, {
        x: margin,
        y: ySum,
        size: 12,
        font,
      });
      ySum -= 20;
    });

    // -------------------
    // 15 ФАКТОРОВ
    // -------------------
    const factorsPage = pdfDoc.addPage(pageSize);
    factorsPage.drawText("Проверенные параметры", {
      x: margin,
      y: height - 80,
      size: 16,
      font: titleFont,
    });

    const factors = [
      "1. robots.txt — управляет тем, виден ли сайт для ИИ.",
      "2. sitemap.xml — карта сайта показывает ИИ важные страницы.",
      "3. X-Robots-Tag — настройка сервера, разрешающая или запрещающая показ.",
      "4. Meta robots — тег внутри страницы для управления показом в ИИ.",
      "5. Canonical — указывает, какая страница является главной.",
      "6. Title — заголовок страницы, первое что видит пользователь.",
      "7. Meta description — краткое описание под заголовком.",
      "8. Open Graph — теги для красивых ссылок в соцсетях и ответах ИИ.",
      "9. H1 — главный заголовок страницы.",
      "10. Structured Data — разметка, объясняющая ИИ, что есть на сайте.",
      "11. Mobile friendly — адаптивность сайта для телефонов.",
      "12. HTTPS — протокол безопасного соединения.",
      "13. Alt-тексты — подписи к изображениям.",
      "14. Favicon — иконка сайта.",
      "15. 404 page — страница ошибки для неверных ссылок.",
    ];

    let yFac = height - 120;
    factors.forEach((line) => {
      factorsPage.drawText(line, {
        x: margin,
        y: yFac,
        size: 12,
        font,
      });
      yFac -= 20;
    });

    // -------------------
    // ЗАКЛЮЧЕНИЕ
    // -------------------
    const conclPage = pdfDoc.addPage(pageSize);
    conclPage.drawText("Заключение", {
      x: margin,
      y: height - 80,
      size: 16,
      font: titleFont,
    });

    const conclText = [
      "Все перечисленные факторы напрямую влияют на то, насколько ваш сайт заметен в ИИ-платформах.",
      "Чтобы устранить выявленные проблемы и повысить видимость ресурса, к данному отчёту приложено техническое задание для разработчика.",
      "Оно носит рекомендательный характер и может использоваться для внедрения улучшений.",
    ];

    let yConcl = height - 120;
    conclText.forEach((line) => {
      conclPage.drawText(line, {
        x: margin,
        y: yConcl,
        size: 12,
        font,
      });
      yConcl -= 20;
    });

    // -------------------
    // ПОДДЕРЖКА
    // -------------------
    const supportPage = pdfDoc.addPage(pageSize);
    supportPage.drawText("Поддержка AI Signal Pro", {
      x: margin,
      y: height - 80,
      size: 16,
      font: titleFont,
    });

    const supportText = [
      "Если у вас сейчас нет связи с разработчиком, наша команда может помочь быстро улучшить видимость сайта в AI-инструментах.",
      "Контакт: support@aisignalpro.com",
    ];

    let ySup = height - 120;
    supportText.forEach((line) => {
      supportPage.drawText(line, {
        x: margin,
        y: ySup,
        size: 12,
        font,
      });
      ySup -= 20;
    });

    // -------------------
    // ФУТЕР
    // -------------------
    const lastPage = pdfDoc.addPage(pageSize);
    lastPage.drawText(
      "AI Signal Pro is a product of Magic of Discoveries LLC",
      {
        x: margin,
        y: 30,
        size: 10,
        font,
        color: rgb(0.4, 0.4, 0.4),
      }
    );

    // -------------------
    // СОХРАНЕНИЕ
    // -------------------
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
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
