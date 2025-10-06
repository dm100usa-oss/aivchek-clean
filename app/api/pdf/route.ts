// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "@/lib/generatePDF";
import { sendReportEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    const testData = {
      url: "example.com",
      date: new Date().toISOString().slice(0, 10),
      score: 75,
      mode: "test",
      factors: [
        { name: "robots.txt", desc: "Controls whether AI can access your site.", status: "Good" },
        { name: "sitemap.xml", desc: "Provides AI with page structure for indexing.", status: "Moderate" },
      ],
    };

    const ownerBuffer = await generatePDF({ type: "owner", data: testData });
    const developerBuffer = await generatePDF({ type: "developer", data: testData });

    await sendReportEmail({
      to: "your-email@example.com",
      url: testData.url,
      mode: testData.mode,
      ownerBuffer,
      developerBuffer,
    });

    return new NextResponse("PDFs generated and email sent successfully", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
