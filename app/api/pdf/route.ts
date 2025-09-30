import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export const dynamic = "force-dynamic";

export async function GET() {
  const testData = {
    logoSrc: "/aisignalmax-logo.png",
    websiteUrl: "https://example.com",
    date: new Date().toISOString().split("T")[0],
    score: 85,
    factors: [
      { title: "robots.txt", description: "Controls whether AI platforms can see your site." },
      { title: "sitemap.xml", description: "Helps AI index important pages." },
      { title: "X-Robots-Tag", description: "Server-side header controlling indexing." }
    ],
    checklist: `1. Ensure robots.txt is not blocking important pages.
2. Verify sitemap.xml is valid.
3. Add proper X-Robots-Tag headers.`,
  };

  const element = <ReportPDF {...testData} />;
  const pdfBuffer = await renderToBuffer(element);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
