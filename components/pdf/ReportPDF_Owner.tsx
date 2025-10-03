import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF";

interface ResultItem {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

export interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
  results: ResultItem[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },
  summaryBox: {
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
  },
  summaryText: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 1.4,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
    color: "#111827",
  },
  factorBox: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    border: "1pt solid #E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  factorDesc: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 1.3,
  },
  factorStatus: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 1.4,
  },
});

const getConclusion = (score: number) => {
  if (score >= 80) {
    return "High Visibility (≥80%): Your website is well-prepared for AI platforms.";
  } else if (score >= 40) {
    return "Moderate Visibility (40–79%): Your website is partially visible, some improvements required.";
  } else {
    return "Low Visibility (<40%): Your website has serious visibility limitations for AI platforms.";
  }
};

const getStatusColor = (status: string) => {
  if (status === "Good") return "#10B981";
  if (status === "Moderate") return "#F59E0B";
  return "#EF4444";
};

export default function ReportPDF_Owner({
  url,
  score,
  date,
  results,
}: ReportPDFProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          Website: {url} {"\n"} Date: {date}
        </Text>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <DonutPDF score={score} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{getConclusion(score)}</Text>
        </View>
      </Page>

      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
        {results.map((r, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{r.name}</Text>
            <Text style={styles.factorDesc}>{r.desc}</Text>
            <Text
              style={[styles.factorStatus, { color: getStatusColor(r.status) }]}
            >
              {r.status}
            </Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text>AI Signal Max is a product of Magic of Discoveries LLC.</Text>
          <Text style={{ marginTop: 6, opacity: 0.6 }}>
            Visibility scores are estimated and based on publicly available data.
            Not legal advice.
          </Text>
          <Text style={{ marginTop: 6 }}>Contact: support@aisignalmax.com</Text>
        </View>
      </Page>
    </Document>
  );
}
