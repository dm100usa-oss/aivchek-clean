import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  try {
    // Рендерим компонент ReportPDF в HTML
    const html = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ReportPDF)
    );

    // Запускаем headless-браузер Puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();

    // Загружаем HTML внутрь страницы
    await page.setContent(
      `<!DOCTYPE html>
       <html>
         <head>
           <meta charset="utf-8" />
           <title>AI Signal Pro PDF</title>
           <style>
             body { font-family: Arial, sans-serif; padding: 40px; }
           </style>
         </head>
         <body>${html}</body>
       </html>`,
      { waitUntil: "networkidle0" }
    );

    // Генерируем PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Отдаём PDF как ответ
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=report.pdf",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
