// lib/types.ts

export type Mode = "quick" | "pro";

export interface CheckResult {
  key: string;
  name: string;
  passed: boolean | null; // true = passed, false = failed, null = partial
  description: string;
}

export interface AnalyzeResult {
  url: string;
  mode: Mode;
  items: CheckResult[];
  score: number;
  interpretation: string;
}

export interface PDFData {
  url: string;
  date: string;
  score: number;
  interpretation: string;
  checks: CheckResult[];
}
