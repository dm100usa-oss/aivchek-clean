import { NextResponse } from "next/server";
import { pdf, Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 12 },
  section: { fontSize: 12, marginBottom: 6 },
});

export async function GET() {
  // Test data — replace later with real values
  const testData = {
    url: "https://aivcheck.com",
    score: 73,
  };

  // Define PDF document inline
  const MyDoc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Pro — Visibility Report</Text>
        <Text style={styles.section}>Website: {testData.url}</Text>
        <Text style={styles.section}>Visibility: {testData.score}%</Text>
      </Page>
    </Document>
  );

  // Render PDF to buffer
  const buffer = await pdf(MyDoc).toBuffer();

  // Return PDF as file
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
