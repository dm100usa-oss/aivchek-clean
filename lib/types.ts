// lib/types.ts

// Mode of analysis (Quick or Pro)
export type Mode = "quick" | "pro";

// One check result in the analysis
export interface CheckResult {
  name: string;          // name of the factor, e.g. "robots.txt"
  description: string;   // explanation of the factor
  passed: boolean | null; // true = passed, false = failed, null = partial/unknown
}

// Result of the whole site analysis
export interface AnalyzeResult {
  score: number;             // visibility score (0–100)
  checks: CheckResult[];     // all performed checks
  interpretation: string;    // "Poor" | "Moderate" | "Good" | "Excellent"
}

// Data passed to PDF templates
export interface PDFData extends AnalyzeResult {
  url: string;  // website address
  date: string; // date of the report
}
