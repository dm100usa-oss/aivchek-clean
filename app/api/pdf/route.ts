// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import ReportPDFTest from "@/components/pdf/ReportPDFTest";

export async function GET(req: NextRequest) {
  try {
    // Создаём PDF из тестового компонента (без пропсов)
    const element = React.createElement(ReportPDFTest);
    const stream = await renderToStream(element);

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }
    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=test-report.pdf",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
