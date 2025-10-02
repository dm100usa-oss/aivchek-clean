import { NextResponse } from "next/server";
import { renderToBuffer, Document } from "@react-pdf/renderer";
import React from "react";
import ReportPDF from "@/components/pdf/ReportPDF";
import { sendReportEmail } from "@/lib/email";

export async function GET() {
  try {
    const element = React.createElement(
      Document,
      null,
      React.createElement(ReportPDF, {
        url: "example.com",
        mode: "test",
        score: 75,
        date: new Date().toISOString().slice(0, 10),
        results: [],
      })
    );

    const pdfBuffer = await renderToBuffer(element);

    await sendReportEmail({
      to: "your-email@example.com",
      url: "example.com",
      mode: "test",
      pdfBuffer,
    });

    return new NextResponse("PDF generated and email sent", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
