import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
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
  logo: {
    marginBottom: 14,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 6,
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
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    textAlign: "center",
  },
  summaryText: {
    fontSize: 13,
    color: "#111827",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginVertical: 16,
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
    marginBottom: 4,
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
  },
});

const Logo = () => (
  <Svg style={styles.logo} width="48" height="48" viewBox="0 0 64 64">
    <Path
      d="M32 4C28 12 20 20 16 32c4 2 8 4 16 4s12-2 16-4c-4-12-12-20-16-28z"
      fill="#0ea5e9"
    />
    <Path
      d="M32 8c-2 6-6 12-8 20 2 1 4 2 8 2s6-1 8-2c-2-8-6-14-8-20z"
      fill="#10b981"
    />
  </Svg>
);

export default function ReportPDF_Owner({
  url,
  score,
  date,
  results,
}: ReportPDFProps) {
  const getConclusion = (score: number) => {
    if (score >= 80) {
      return "High Visibility: Your website is well-prepared for AI platforms. Most parameters are configured correctly.";
    } else if (score >= 40) {
      return "Moderate Visibility: Your website is partially visible for AI platforms. Some parameters require improvement.";
    } else {
      return "Low Visibility: Your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing.";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Good") return "#10B981";
    if (status === "Moderate") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Document>
      <Page style={styles.page}>
        <Logo />
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
        <Text style={styles.sectionTitle}>Results of website audit</Text>
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
          <Text style={{ opacity: 0.7 }}>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.6 }}>
            Visibility scores are estimated and based on publicly available data.
            Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
