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
    fontSize: 11,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
    lineHeight: 1.5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 12,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 10,
    textAlign: "justify",
  },
  factorBox: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 6,
    border: "1pt solid #E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#111827",
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
  },
  factorStatus: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
    opacity: 0.7,
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
      return `High Visibility
Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. This means that search and AI systems recognize your site as a reliable and user-friendly source of information.

However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce your performance. That is why it is important to continue periodic checks—at least every few months—to preserve and strengthen your results.`;
    } else if (score >= 40) {
      return `Moderate Visibility
Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. In its current state, the site may appear in AI results, but with limited trust and often ranked below competitors. This reduces the number of visitors and lowers your share of visibility.

This situation is not critical. By carefully following the recommendations, visibility can be significantly improved. Many companies achieve their strongest growth in traffic and inquiries precisely at this stage, once corrections are made.`;
    } else {
      return `Low Visibility
At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely. This means your site remains invisible to ChatGPT, Copilot, Gemini, and other systems—potential customers simply do not find you where they are searching.

A low visibility score indicates systemic issues. Fixing them requires a comprehensive approach, but it also unlocks new opportunities to reach audiences and position your business in the digital environment. Without addressing these problems, your site will continue to lose ground to competitors.`;
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
          This report shows how visible your website is across AI platforms.
        </Text>

        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <DonutPDF score={score} />
        </View>

        <Text style={styles.paragraph}>Website: {url}</Text>
        <Text style={styles.paragraph}>Date: {date}</Text>
        <Text style={styles.paragraph}>Mode: {mode}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>{getConclusion(score)}</Text>
        </View>
      </Page>

      {/* Results Page */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact. The
          results are summarized first, followed by detailed explanations and
          recommendations. The final section of this report contains a
          developer’s checklist that can be handed over directly for
          implementation.
        </Text>

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
          <Text style={{ marginTop: 6 }}>
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
