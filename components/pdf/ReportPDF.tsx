// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF";

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
  logo: {
    width: 40,
    height: 40,
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#374151",
    marginBottom: 20,
  },
  donutContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  summaryBox: {
    marginTop: 10,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    textAlign: "center",
  },
  summaryText: {
    fontSize: 13,
    color: "#111827",
    lineHeight: 1.5,
  },
  textSmall: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginVertical: 14,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 12,
    lineHeight: 1.5,
    textAlign: "justify",
  },
  factorBox: {
    padding: 12,
    marginBottom: 10,
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
    lineHeight: 1.4,
  },
  factorStatus: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  checklistItem: {
    marginBottom: 10,
  },
  checklistTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#111827",
  },
  checklistText: {
    fontSize: 11,
    color: "#6B7280",
    lineHeight: 1.4,
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
  },
  footerSmall: {
    marginTop: 4,
    fontSize: 8,
    textAlign: "center",
    color: "#6B7280",
    opacity: 0.6,
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
      return "High Visibility — Your website is well-prepared for AI platforms. Most key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and others. However, even with high visibility, regular monitoring is essential.";
    } else if (score >= 40) {
      return "Moderate Visibility — Your website is partially visible to AI platforms. Some parameters are misconfigured or missing. By following recommendations, visibility can be significantly improved.";
    } else {
      return "Low Visibility — Your website has serious visibility limitations for AI platforms. Several critical parameters are missing or misconfigured. Fixing them requires a comprehensive approach, but it unlocks new opportunities to reach audiences.";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Good") return "#10B981";
    if (status === "Moderate") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page style={styles.page}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          Results of website visibility audit
        </Text>

        <View style={styles.donutContainer}>
          <DonutPDF score={score} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{getConclusion(score)}</Text>
        </View>

        <Text style={styles.textSmall}>Website: {url}</Text>
        <Text style={styles.textSmall}>Date: {date}</Text>
        <Text style={styles.textSmall}>Mode: {mode}</Text>
      </Page>

      {/* Introduction + Factors */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report shows the current condition of your site in terms of
          visibility across AI platforms and explains which factors have the
          greatest impact. The results are summarized first, followed by detailed
          explanations and recommendations. The final section contains a
          developer’s checklist for implementation.
        </Text>

        <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
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
      </Page>

      {/* Developer’s Checklist */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Developer’s Checklist</Text>
        <Text style={styles.paragraph}>
          This checklist is based on the analysis of site parameters that affect
          visibility across AI platforms. It outlines the factors that require
          verification and possible correction, and serves as a roadmap for
          improvements aimed at strengthening stability and trust.
        </Text>

        {results.map((r, i) => (
          <View key={i} style={styles.checklistItem}>
            <Text style={styles.checklistTitle}>{i + 1}. {r.name}</Text>
            <Text style={styles.checklistText}>{r.desc}</Text>
          </View>
        ))}
      </Page>

      {/* Support + Footer */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Support and Contact</Text>
        <Text style={styles.paragraph}>
          If you do not currently have access to a developer, our team can
          assist in quickly improving your website’s visibility across AI
          platforms.
        </Text>
        <Text style={styles.paragraph}>Contact: support@aisignalmax.com</Text>

        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
        </View>
        <View style={styles.footerSmall}>
          <Text>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
          <Text>
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
