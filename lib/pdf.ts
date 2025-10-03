import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { AnalyzeResult } from "@/lib/analyze";

interface GenerateReportsProps {
  url: string;
  date: string;
  analysis: AnalyzeResult;
}

export async function generateReports({ url, date, analysis }: GenerateReportsProps) {
  const ownerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Owner, { url, date, ...analysis })
  );

  const developerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Developer, { url, date, ...analysis })
  );

  return { ownerBuffer, developerBuffer };
}
