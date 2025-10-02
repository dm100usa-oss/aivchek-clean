// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
} from "@react-pdf/renderer";

interface ResultItem {
  name: string;
  description: string;
  status: "Passed" | "Failed";
}

interface ReportPDFProps {
  url: string;
  date: string;
  score: number;
  results: ResultItem[];
  mode: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
    color: "#6B7280",
  },
  section: {
    marginBottom: 16,
  },
  text: {
    marginBottom: 6,
    lineHeight: 1.4,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  passed: {
    color: "#10B981",
  },
  failed: {
    color: "#EF4444",
  },
  footer: {
    fontSize: 10,
    marginTop: 40,
    textAlign: "center",
    color: "#6B7280",
  },
});

function getConclusion(score: number): string {
  if (score >= 80) {
    return "High Visibility (≥80%). Your website is already well-prepared for AI platforms...";
  } else if (score >= 40) {
    return "Moderate Visibility (40–79%). Your website is generally visible but requires improvements...";
  } else {
    return "Low Visibility (<40%). Your website has serious visibility limitations for AI platforms...";
  }
}

export default function ReportPDF({
  url,
  date,
  score,
  results,
  mode,
}: ReportPDFProps) {
  return (
    <Document>
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>
        <View style={styles.section}>
          <Text style={styles.text}>Website: {url}</Text>
          <Text style={styles.text}>Date of Assessment: {date}</Text>
          <Text style={styles.text}>Mode: {mode}</Text>
        </View>
        <View style={styles.section}>
          <Svg height="120" width="120">
            <Circle
              cx="60"
              cy="60"
              r="50"
              stroke="#10B981"
              strokeWidth="10"
              fill="none"
            />
          </Svg>
          <Text style={{ fontSize: 20, marginTop: 10, textAlign: "center" }}>
            {score}%
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Conclusion</Text>
          <Text style={styles.text}>{getConclusion(score)}</Text>
        </View>
      </Page>

      {/* Introduction */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.text}>
          This report shows the current condition of your site in terms of
          visibility across AI platforms and explains which factors have the
          greatest impact.
        </Text>
        <Text style={styles.text}>
          The results are summarized first, followed by detailed explanations and
          recommendations. The final section of this report contains a
          developer’s checklist that can be handed over directly for
          implementation.
        </Text>
      </Page>

      {/* Key Factors */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Key Factors Reviewed</Text>
        {results.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.text}>
              {index + 1}. {item.name}
            </Text>
            <Text style={styles.text}>{item.description}</Text>
            <Text
              style={[
                styles.text,
                item.status === "Passed" ? styles.passed : styles.failed,
              ]}
            >
              {item.status}
            </Text>
          </View>
        ))}
      </Page>

      {/* Developer Checklist */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Developer’s Checklist</Text>
        <Text style={styles.text}>
          A full technical checklist will be included here, based on the key
          parameters. This section can be handed over directly to developers.
        </Text>
      </Page>

      {/* Support */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Support and Contact</Text>
        <Text style={styles.text}>
          If you do not currently have access to a developer, our team can assist
          in quickly improving your website’s visibility across AI platforms.
        </Text>
        <Text style={styles.text}>Contact: support@aisignalmax.com</Text>
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
}
