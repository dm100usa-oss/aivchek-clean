import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";

export interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: { padding: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 10 },
});

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Owner)</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>URL: {url}</Text>
        <Text style={styles.text}>Overall Score: {score}%</Text>
        <Text style={styles.text}>
          This report is prepared for the website owner. It summarizes visibility
          status in AI platforms and search engines.
        </Text>
      </Page>
    </Document>
  );
}
