// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  score: number;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.5,
  },
});

export default function ReportPDF({ url, score }: ReportPDFProps) {
  const date = new Date().toLocaleDateString("en-US");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>AI Signal Max</Text>
        <Text style={styles.header}>AI Website Visibility Report</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Website URL:</Text>
          <Text style={styles.text}>{url}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date of Assessment:</Text>
          <Text style={styles.text}>{date}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Visibility Score:</Text>
          <Text style={styles.text}>{score}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Conclusion:</Text>
          <Text style={styles.text}>
            {score >= 80
              ? "High Visibility: Your website is well-prepared for AI platforms."
              : score >= 40
              ? "Moderate Visibility: Your website is partially visible. Improvements are needed."
              : "Low Visibility: Critical misconfigurations limit AI visibility."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Introduction:</Text>
          <Text style={styles.text}>
            This report shows the current condition of your site in terms of
            visibility across AI platforms and explains which factors have the
            greatest impact. Results are summarized first, followed by detailed
            explanations and recommendations. The final section contains a
            developer’s checklist that can be handed over directly for
            implementation.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
