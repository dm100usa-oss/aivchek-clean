import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Image,
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
  coverLogo: {
    marginBottom: 20,
    alignSelf: "center",
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 20,
  },
  donutWrap: {
    alignItems: "center",
    marginVertical: 20,
  },
  summaryBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
  },
  summaryText: {
    fontSize: 13,
    textAlign: "center",
    color: "#111827",
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 18,
    textAlign: "center",
    color: "#111827",
  },
  factorBox: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
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

const getConclusion = (score: number): string => {
  if (score >= 80) {
    return `High Visibility (≥80%)
Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, ensuring a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. Regular monitoring is still recommended to maintain performance.`;
  } else if (score >= 40) {
    return `Moderate Visibility (40–79%)
Your website is generally visible to AI platforms, but some parameters are misconfigured or require improvement. In this state, your site may appear in AI results, but with limited trust. Fixing the issues can significantly improve visibility and traffic.`;
  } else {
    return `Low Visibility (<40%)
Your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing. Without corrections, your site remains invisible in AI-driven results and loses to competitors.`;
  }
};

const getStatusColor = (status: string) => {
  if (status === "Good") return "#10B981"; // green
  if (status === "Moderate") return "#F59E0B"; // orange
  return "#EF4444"; // red
};

export default function ReportPDF_Owner({
  url,
  score,
  date,
  results,
}: ReportPDFProps) {
  return (
    <Document>
      {/* COVER PAGE */}
      <Page style={styles.page}>
        <Image src="/mnt/data/логотип.png" style={styles.coverLogo} />
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          Website: {url} {"\n"} Date: {date}
        </Text>

        <View style={styles.donutWrap}>
          <DonutPDF score={score} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{getConclusion(score)}</Text>
        </View>
      </Page>

      {/* RESULTS PAGE */}
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
          <Text style={{ marginTop: 6 }}>
            Contact: support@aisignalmax.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}
