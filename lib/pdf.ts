// /lib/pdf.ts
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { analyze } from "@/lib/analyze";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

export async function generateReports(url: string, mode: string) {
  // Запускаем анализ сайта
  const analysis = await analyze(url, mode);

  // Генерация PDF Owner
  const ownerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Owner, {
      url,
      date: new Date().toISOString().split("T")[0],
      ...analysis, // score, interpretation, items
    }) as React.ReactElement
  );

  // Генерация PDF Developer
  const developerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Developer, {
      url,
      date: new Date().toISOString().split("T")[0],
      ...analysis,
    }) as React.ReactElement
  );

  return { ownerBuffer, developerBuffer, analysis };
}
