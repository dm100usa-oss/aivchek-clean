import { Mode } from "./score";
import { CheckItem } from "./analyze";

export interface PDFData {
  url: string;
  date: string;
  mode: Mode;
  score: number;
  interpretation: string;
  checks: CheckItem[];
}
