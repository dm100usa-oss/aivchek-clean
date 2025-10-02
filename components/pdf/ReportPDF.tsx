// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { DonutPDF } from "./DonutPDF"; // наш статичный Donut для PDF

interface ResultItem {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

interface ReportPDFProps {
  url: string;
  mode: string;
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginVertical: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.5,
  },
  summaryBox: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    textAlign: "center",
  },
  factorBox: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    border: "1pt solid #E5E7EB",
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
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
    marginTop: 30,
    fontSize: 10,
    textAlign: "center",
    color: "#6B7280",
  },
});

export default function ReportPDF({
  url,
  mode,
  score,
  date,
  results,
}: ReportPDFProps) {
  const getConclusion = (score: number) => {
    if (score >= 80) {
      return "Your site is well visible for AI platforms. Most parameters are configured correctly.";
    } else if (score >= 40) {
      return "Your site is partially visible for AI platforms. Some parameters require improvement.";
    } else {
      return "Your site is poorly visible for AI platforms. Most parameters are misconfigured.";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Good") return "#10B981";
    if (status === "Moderate") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Document>
      {/* Title page */}
      <Page style={styles.page}>
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>
        <Text style={styles.text}>Website: {url}</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Mode: {mode}</Text>

        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <DonutPDF score={score} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={{ fontSize: 14, fontWeight: "medium", color: "#111827" }}>
            {getConclusion(score)}
          </Text>
        </View>
      </Page>

      {/* Results page */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Parameters checked</Text>
        {results.map((r, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{r.name}</Text>
            <Text style={styles.factorDesc}>{r.desc}</Text>
            <Text
              style={[
                styles.factorStatus,
                { color: getStatusColor(r.status) },
              ]}
            >
              {r.status}
            </Text>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.6 }}>
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
