// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDFTest from "@/components/pdf/ReportPDFTest";
import { sendReportEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  try {
    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(<ReportPDFTest />);

    // Send email with PDF attached
    await sendReportEmail({
      to: "your-email@example.com", // замени на свой email
      url: "example.com",
      mode: "test",
      pdfBuffer,
    });

    return new NextResponse("PDF generated and email sent", { status: 200 });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
