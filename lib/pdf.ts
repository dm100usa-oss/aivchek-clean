import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";

export async function generateReports(
  url: string,
  date: string,
  analysis: any
) {
  const ownerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Owner, { url, date, ...analysis })
  );

  const developerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Developer, { url, date, ...analysis })
  );

  return { ownerBuffer, developerBuffer };
}
