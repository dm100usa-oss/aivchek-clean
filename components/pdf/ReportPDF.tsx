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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#374151",
    textAlign: "center",
    marginBottom: 20,
  },
  donutBox: {
    alignItems: "center",
    marginVertical: 16,
  },
  textSmall: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginTop: 20,
    marginBottom: 8,
    textAlign: "left",
  },
  paragraph: {
    fontSize: 11,
    marginBottom: 10,
    color: "#111827",
    lineHeight: 1.4,
  },
  factorBox: {
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
    border: "1pt solid #E5E7EB",
  },
  factorName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  factorDesc: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.3,
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    textAlign: "center",
    color: "#9CA3AF",
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
      return `High Visibility (≥80%)
Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. This means that search and AI systems recognize your site as a reliable and user-friendly source of information.

However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce your performance. That is why it is important to continue periodic checks—at least every few months—to preserve and strengthen your results.`;
    } else if (score >= 40) {
      return `Moderate Visibility (40–79%)
Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. In its current state, the site may appear in AI results, but with limited trust and often ranked below competitors. This reduces the number of visitors and lowers your share of visibility.

This situation is not critical. By carefully following the recommendations, visibility can be significantly improved. Many companies achieve their strongest growth in traffic and inquiries precisely at this stage, once corrections are made.`;
    } else {
      return `Low Visibility (<40%)
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
      {/* Cover page */}
      <Page style={styles.page}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>

        <View style={styles.donutBox}>
          <DonutPDF score={score} />
        </View>

        <Text style={styles.sectionTitle}>Conclusion</Text>
        <Text style={styles.paragraph}>{getConclusion(score)}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.textSmall}>Website: {url}</Text>
          <Text style={styles.textSmall}>Date: {date}</Text>
          <Text style={styles.textSmall}>Mode: {mode}</Text>
        </View>
      </Page>

      {/* Introduction */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact.
        </Text>
        <Text style={styles.paragraph}>
          The results are summarized first, followed by detailed explanations
          and recommendations. The final section of this report contains a
          developer’s checklist that can be handed over directly for
          implementation.
        </Text>

        <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
        <Text style={styles.paragraph}>
          To calculate your site’s visibility score, we analyzed 15 key
          parameters that influence how AI platforms and search engines
          interpret your site. These range from fundamental technical settings
          to user experience details. Below, you will find the status of each
          parameter and recommendations for improvement. Together, they form the
          foundation of your site’s final visibility percentage.
        </Text>
      </Page>

      {/* Results */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {results.map((r, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{r.name}</Text>
            <Text style={styles.factorDesc}>{r.desc}</Text>
            <Text
              style={[
                styles.factorName,
                { color: getStatusColor(r.status), marginTop: 4 },
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
          This checklist has been prepared based on the analysis of site
          parameters that affect visibility across AI platforms (ChatGPT,
          Microsoft Copilot, Gemini, Claude, and others). It outlines the
          factors that require verification and possible correction, and serves
          as a roadmap for implementing improvements aimed at strengthening
          stability and trust.
        </Text>
        <Text style={styles.paragraph}>
          All of the parameters listed contribute to better indexing and higher
          visibility. Proper configuration builds trust and helps unlock the
          full potential of your website. This checklist is advisory in nature
          and does not replace professional expertise.
        </Text>
      </Page>

      {/* Footer */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Support and Contact</Text>
        <Text style={styles.paragraph}>
          AI Signal Max Support. If you do not currently have access to a
          developer, our team can assist in quickly improving your website’s
          visibility across AI platforms.
        </Text>
        <Text style={styles.paragraph}>Contact: support@aisignalmax.com</Text>

        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
