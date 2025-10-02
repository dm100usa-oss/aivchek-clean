import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Types
interface ResultItem {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
  results: ResultItem[];
}

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    marginBottom: 20,
  },
  textSmall: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 4,
  },
  donutBox: {
    marginVertical: 20,
    alignItems: "center",
  },
  conclusion: {
    fontSize: 13,
    color: "#111827",
    textAlign: "center",
    marginVertical: 16,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
    marginVertical: 12,
    textAlign: "center",
  },
  factorBox: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
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
    color: "#374151",
    lineHeight: 1.3,
  },
  factorStatus: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
  },
});

// Helpers
const getConclusion = (score: number) => {
  if (score >= 80) {
    return "Your website is already well-prepared for AI platforms. Most key parameters are configured correctly, ensuring a high probability of appearing in results from ChatGPT, Copilot, Gemini, and others.";
  } else if (score >= 40) {
    return "Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. Visibility can be significantly improved with adjustments.";
  } else {
    return "Your website currently has serious visibility limitations for AI platforms. Several critical parameters are missing or misconfigured, preventing your site from being properly represented.";
  }
};

const getStatusColor = (status: string) => {
  if (status === "Good") return "#10B981";
  if (status === "Moderate") return "#F59E0B";
  return "#EF4444";
};

// Component
export default function ReportPDF_Owner({
  url,
  score,
  date,
  results,
}: ReportPDFProps) {
  return (
    <Document>
      {/* Cover + summary */}
      <Page style={styles.page}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>AI Signal Max</Text>

        <View style={{ marginVertical: 20 }}>
          <Text style={styles.textSmall}>Website: {url}</Text>
          <Text style={styles.textSmall}>Date: {date}</Text>
          <Text style={styles.textSmall}>Visibility Score: {score}%</Text>
        </View>

        <View style={styles.donutBox}>
          {/* Placeholder donut */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 8,
              borderColor:
                score >= 80 ? "#10B981" : score >= 40 ? "#F59E0B" : "#EF4444",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#111827" }}>
              {score}%
            </Text>
          </View>
        </View>

        <Text style={styles.conclusion}>{getConclusion(score)}</Text>
      </Page>

      {/* Results */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Parameters checked</Text>
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
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
