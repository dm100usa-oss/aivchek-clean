// app/api/pdf/route.ts
import { NextResponse } from "next/server";
import { renderToBuffer, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { sendReportEmail } from "@/lib/email";

// simple styles
const styles = StyleSheet.create({
  page: { padding: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 10 },
});

export async function GET() {
  try {
    // Build a minimal PDF Document
    const element = (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.text}>This is a test PDF generated on the server.</Text>
          <Text style={styles.text}>Later we will insert the full report content here.</Text>
        </Page>
      </Document>
    );

    const pdfBuffer = await renderToBuffer(element);

    // Send email with PDF attached
    await sendReportEmail({
      to: "your-email@example.com",
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
