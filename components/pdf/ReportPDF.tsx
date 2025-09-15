"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 10 },
});

export default function ReportPDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Pro</Text>
        <Text style={styles.text}>
          Это тестовый PDF, сгенерированный через @react-pdf/renderer.
        </Text>
        <Text style={styles.text}>
          Здесь позже появится полный отчет в нашем стиле.
        </Text>
      </Page>
    </Document>
  );
}
