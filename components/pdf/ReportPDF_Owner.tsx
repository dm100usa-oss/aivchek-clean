// components/pdf/ReportPDF_Owner.tsx
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

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 20,
  },
  donutWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  summaryBox: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 6,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 12,
    color: "#111827",
  },
  section: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  factorItem: {
    marginBottom: 8,
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
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#6B7280",
  },
});

// Simple Lotus Logo
const Logo = () => (
  <Svg style={styles.logo} width="40" height="40" viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="28" fill="#0ea5e9" />
    <Circle cx="32" cy="32" r="16" fill="#10b981" />
  </Svg>
);

// Donut with centered percentage
const DonutPDF = ({ score }: { score: number }) => {
  const radius = 50;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <Svg width="150" height="150" viewBox="0 0 240 240">
      {/* Background circle */}
      <Circle
        cx="120"
        cy="120"
        r={radius.toString()}
        stroke="#E5E7EB"
        strokeWidth={stroke.toString()}
        fill="white"
      />
      {/* Progress circle */}
      <Circle
        cx="120"
        cy="120"
        r={radius.toString()}
        stroke="#10b981"
        strokeWidth={stroke.toString()}
        strokeLinecap="round"
        strokeDasharray={circumference.toString()}
        strokeDashoffset={(circumference - progress).toString()}
        fill="white"
        transform="rotate(-90 120 120)"
      />
      {/* Score text */}
      <Text
        x="120"
        y="125"
        fontSize="28"
        fill="#0F172A"
        textAnchor="middle"
      >
        {score}%
      </Text>
    </Svg>
  );
};

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const ReportPDF_Owner: React.FC<ReportPDFProps> = ({ url, score, date }) => {
  let conclusion = "";
  let boxColor = "#F9FAFB";
  if (score >= 80) {
    conclusion =
      "High Visibility: Your website is well-prepared for AI platforms. Most parameters are configured correctly.";
    boxColor = "#DCFCE7"; // light green
  } else if (score >= 40) {
    conclusion =
      "Moderate Visibility: Your website is partially visible for AI platforms. Some parameters require improvement.";
    boxColor = "#FEF9C3"; // light yellow
  } else {
    conclusion =
      "Low Visibility: Your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing.";
    boxColor = "#FEE2E2"; // light red
  }

  const factors = [
    {
      name: "Robots.txt",
      desc: "Controls whether AI can see your site. If misconfigured and blocking access, your entire website may disappear.",
      status: "Good",
    },
    {
      name: "Sitemap.xml",
      desc: "Tells AI which pages exist. If missing or broken, important sections remain invisible.",
      status: "Moderate",
    },
    {
      name: "X-Robots-Tag",
      desc: "Server-side headers that determine if pages can appear in AI results.",
      status: "Poor",
    },
    // ... остальные факторы (оставляем как было)
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Logo />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.subtitle}>AI Signal Max</Text>
          <Text style={styles.subtitle}>{url}</Text>
          <Text style={styles.subtitle}>{date}</Text>
        </View>

        {/* Donut */}
        <View style={styles.donutWrapper}>
          <DonutPDF score={score} />
        </View>

        {/* Conclusion */}
        <View style={[styles.summaryBox, { backgroundColor: boxColor }]}>
          <Text style={styles.summaryText}>{conclusion}</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text>
            This report provides an overview of your website’s visibility for AI
            platforms. It summarizes the current status, highlights areas for
            improvement, and explains which parameters affect performance.
          </Text>
        </View>

        {/* Factors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
          {factors.map((f, i) => (
            <View key={i} style={styles.factorItem}>
              <Text style={styles.factorName}>{f.name}</Text>
              <Text style={styles.factorDesc}>{f.desc}</Text>
              <Text
                style={[
                  styles.factorStatus,
                  {
                    color:
                      f.status === "Good"
                        ? "#10b981"
                        : f.status === "Moderate"
                        ? "#f59e0b"
                        : "#ef4444",
                  },
                ]}
              >
                {f.status}
              </Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. {"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF_Owner;
