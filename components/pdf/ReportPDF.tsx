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
  date: string;
  score: number;
  factors: { name: string; desc: string; status: "Good" | "Moderate" | "Poor" }[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111827", // neutral-900
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
    color: "#4b5563", // neutral-600
  },
  section: {
    marginBottom: 20,
  },
  factorBox: {
    border: "1pt solid #e5e7eb", // gray-200
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  factorDesc: {
    fontSize: 11,
    color: "#4b5563",
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 30,
    color: "#6b7280", // neutral-500
  },
});

export default function ReportPDF({ url, date, score, factors }: ReportPDFProps) {
  return (
    <Document>
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>AI Signal Max</Text>
          <Text style={styles.subtitle}>AI Website Visibility Report</Text>
          <Text style={styles.subtitle}>Website: {url}</Text>
          <Text style={styles.subtitle}>Date: {date}</Text>
          {/* TODO: Insert static Donut here */}
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 18 }}>
            Score: {score}%
          </Text>
        </View>
      </Page>

      {/* Results & Factors */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Audit Results</Text>
          {/* TODO: Insert Conclusion text */}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Parameters checked</Text>
          {factors.map((f, i) => (
            <View key={i} style={styles.factorBox}>
              <Text style={styles.factorName}>{f.name}</Text>
              <Text style={styles.factorDesc}>{f.desc}</Text>
              <Text>Status: {f.status}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
}
