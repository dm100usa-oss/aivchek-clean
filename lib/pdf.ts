// lib/pdf.ts

import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDF_Owner from "@/components/pdf/ReportPDF_Owner";
import ReportPDF_Developer from "@/components/pdf/ReportPDF_Developer";
import { PDFData } from "@/lib/types";

export async function generateReports(pdfData: PDFData) {
  const ownerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Owner, pdfData)
  );

  const developerBuffer = await renderToBuffer(
    React.createElement(ReportPDF_Developer, pdfData)
  );

  return { ownerBuffer, developerBuffer };
}
