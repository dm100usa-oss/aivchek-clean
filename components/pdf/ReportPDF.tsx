"use server";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateReportPDF(score: number, url: string) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // --- Титульная страница ---
  const cover = pdfDoc.addPage([595, 842]);
  const { height } = cover.getSize();

  cover.drawText("AI Signal Pro", {
    x: 200,
    y: height - 120,
    size: 28,
    font: boldFont,
    color: rgb(0, 0.5, 0.8),
  });

  cover.drawText("Отчёт по видимости сайта для AI", {
    x: 130,
    y: height - 180,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  cover.drawText(`Проверенный сайт: ${url}`, {
    x: 130,
    y: height - 220,
    size: 14,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });

  cover.drawText(
    `Общий показатель видимости: ${score.toFixed(0)}%`,
    {
      x: 130,
      y: height - 250,
      size: 14,
      font,
      color: rgb(0.1, 0.4, 0.1),
    }
  );

  // --- Введение ---
  const intro = pdfDoc.addPage([595, 842]);
  let y = height - 80;

  intro.drawText("Введение", {
    x: 50,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  y -= 40;

  const introText = [
    "Этот отчёт подготовлен для владельца сайта.",
    "Он показывает текущее состояние ресурса с точки зрения видимости в ИИ-платформах",
    "и объясняет, какие параметры на это влияют.",
    "Результаты собраны в сводке, а далее даны подробные объяснения и рекомендации."
  ];

  introText.forEach((line) => {
    intro.drawText(line, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
    y -= 20;
  });

  // --- Заключение ---
  const conclusion = pdfDoc.addPage([595, 842]);
  y = height - 80;

  conclusion.drawText("Заключение", {
    x: 50,
    y,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  y -= 40;

  conclusion.drawText(
    "Все перечисленные факторы напрямую влияют на то, насколько ваш сайт заметен в ИИ-платформах.",
    { x: 50, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) }
  );
  y -= 20;
  conclusion.drawText(
    "Чтобы устранить выявленные проблемы и повысить видимость ресурса,",
    { x: 50, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) }
  );
  y -= 20;
  conclusion.drawText(
    "к данному отчёту приложено техническое задание для разработчика.",
    { x: 50, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) }
  );
  y -= 20;
  conclusion.drawText(
    "Оно носит рекомендательный характер и может использоваться для внедрения улучшений.",
    { x: 50, y, size: 12, font, color: rgb(0.2, 0.2, 0.2) }
  );

  // --- Footer ---
  conclusion.drawText(
    "AI Signal Pro is a product of Magic of Discoveries LLC",
    { x: 50, y: 30, size: 8, font, color: rgb(0.5, 0.5, 0.5) }
  );

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
