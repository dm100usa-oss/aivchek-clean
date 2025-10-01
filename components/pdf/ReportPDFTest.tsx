// components/pdf/ReportPDFTest.tsx
import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 14 },
  title: { fontSize: 20, marginBottom: 20 },
});

export default function ReportPDFTest() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Pro – Test PDF</Text>
        <Text>If you see this text, PDF generation works correctly.</Text>
      </Page>
    </Document>
  );
}
