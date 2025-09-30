import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
});

function SimpleReport({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Pro — Visibility Report</Text>
        <Text style={styles.section}>Website: {data.url}</Text>
        <Text style={styles.section}>Visibility: {data.score}%</Text>
        <Text style={styles.section}>Summary: {data.summary}</Text>
      </Page>
    </Document>
  );
}

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 73,
    summary: "Visibility is moderate. Some fixes recommended.",
  };

  const element = <SimpleReport data={testData} />;
  const pdfBuffer = await renderToBuffer(element);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=report.pdf",
    },
  });
}
