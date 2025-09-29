import { NextResponse } from "next/server";
import { pdf, Document, Page, Text } from "@react-pdf/renderer";

export async function GET() {
  const element = (
    <Document>
      <Page>
        <Text>PDF is working!</Text>
      </Page>
    </Document>
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
