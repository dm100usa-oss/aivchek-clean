"use client";

import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 20, marginBottom: 12 },
  text: { fontSize: 12, marginBottom: 8 },
});

interface ReportPDFDevProps {
  url: string;
  mode: string;
}

export default function ReportPDFDev({ url, mode }: ReportPDFDevProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Developer Checklist</Text>
        <Text style={styles.text}>URL: {url}</Text>
        <Text style={styles.text}>Mode: {mode}</Text>
        <Text style={styles.text}>
          This is the developer-focused version of the report.
        </Text>
      </Page>
    </Document>
  );
}
