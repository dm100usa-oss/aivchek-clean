import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
}

const styles = StyleSheet.create({
  page: { padding: 40 },
  title: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 8 },
});

export default function ReportPDF({ url, mode, score }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.text}>URL: {url}</Text>
          <Text style={styles.text}>Mode: {mode}</Text>
          <Text style={styles.text}>Score: {score}%</Text>
        </View>
      </Page>
    </Document>
  );
}
