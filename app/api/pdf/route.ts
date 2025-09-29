import { NextResponse } from "next/server";
import { pdf, Document, Page, Text } from "@react-pdf/renderer";
import React from "react";

export async function GET() {
  const element = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      null,
      React.createElement(Text, null, "PDF is working!")
    )
  );

  const instance: any = pdf(element as any);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=test.pdf",
    },
  });
}
