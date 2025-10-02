// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import ReportPDFTest from "@/components/pdf/ReportPDFTest";
import { sendReportEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    // Generate PDF buffer
    const element = React.createElement(ReportPDFTest);
    const pdfBuffer = await renderToBuffer(element);

    // Send email with *two* attachments (test mode: both the same buffer)
    await sendReportEmail({
      to: "your-email@example.com", // replace with your real email
      url: "example.com",
      mode: "test",
      ownerBuffer: pdfBuffer,       // ✅ для владельца
      developerBuffer: pdfBuffer,   // ✅ для разработчика
    });

    return new NextResponse("PDF generated and email sent", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
