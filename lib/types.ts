export interface PDFData {
  url: string;
  date: string;
  score: number;
  interpretation: string;
  items: {
    name: string;
    description: string;
    status: "Passed" | "Failed";
  }[];
}
