import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#111827",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
});

export default function ReportPDF({ url, mode, score }: ReportPDFProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.text}>Website: {url}</Text>
          <Text style={styles.text}>Mode: {mode}</Text>
          <Text style={styles.text}>Visibility Score: {score}%</Text>
        </View>
      </Page>
    </Document>
  );
}
