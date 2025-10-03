// components/pdf/ReportPDF_Owner.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF";
import { PDFData } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 12,
    color: "#111",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    color: "#555",
  },
  section: {
    marginTop: 30,
  },
  heading: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
  },
  item: {
    marginBottom: 6,
  },
  statusGood: { color: "green" },
  statusPoor: { color: "red" },
  statusModerate: { color: "orange" },
});

export default function ReportPDF_Owner({ url, date, score, checks }: PDFData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          Website: {url} | Date: {date}
        </Text>

        <DonutPDF score={score} />

        <View style={styles.section}>
          <Text style={styles.heading}>Key Results</Text>
          {checks.map((check, index) => (
            <Text
              key={index}
              style={[
                styles.item,
                check.passed
                  ? styles.statusGood
                  : check.passed === false
                  ? styles.statusPoor
                  : styles.statusModerate,
              ]}
            >
              {check.name}: {check.passed ? "Passed" : "Failed"}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
