import { Mode } from "./score";

export interface CheckItem {
  key: string;
  name: string;
  passed: boolean | null;
  description: string;
}

export interface PDFData {
  url: string;
  mode: Mode;
  date: string;
  score: number;
  interpretation: string;
  checks: CheckItem[]; // согласовано для PDF-шаблонов
}
