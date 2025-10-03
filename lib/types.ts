// lib/types.ts

// Mode of analysis (Quick or Pro)
export type Mode = "quick" | "pro";

// One check result in the analysis
export interface CheckItem {
  key: string;
  name: string;
  passed: boolean | null; // true = passed, false = failed, null = partial/unknown
  description: string;
}

// Result of the whole site analysis
export interface AnalyzeResult {
  url: string;
  mode: Mode;
  items: CheckItem[];        // all performed checks
  score: number;             // visibility score (0–100)
  interpretation: string;    // "Poor" | "Moderate" | "Good" | "Excellent"
}

// Data passed to PDF templates
export interface PDFData {
  url: string;
  date: string;
  score: number;
  interpretation: string;
  items: CheckItem[];
}
