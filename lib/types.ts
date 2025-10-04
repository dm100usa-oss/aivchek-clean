// lib/types.ts
import { AnalyzeResult } from "@/lib/analyze";

export interface PDFData {
  url: string;
  date: string;
  analysis: AnalyzeResult;
}
