"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Brand colors
const colors = {
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray800: "#1f2937",
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
  blue: "#2563eb",
};

// PDF styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    lineHeight: 1.5,
    color: colors.gray800,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  url: {
    fontSize: 12,
    textAlign: "center",
    color: colors.gray500,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: colors.gray800,
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    color: colors.gray600,
  },
  factorItem: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.gray50,
  },
  factorName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  factorDesc: {
    fontSize: 11,
    color: colors.gray600,
    marginBottom: 4,
  },
  factorStatus: {
    fontSize: 11,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    textAlign: "center",
    color: colors.gray500,
  },
});

// Status color mapping
const statusColors: Record<string, string> = {
  Good: colors.green,
  Moderate: colors.yellow,
  Poor: colors.red,
};

interface Factor {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
  factors: Factor[];
}

export default function ReportPDF({ url, score, date, factors }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image style={styles.logo} src="/aisignalmax-logo.png" />

        {/* Title */}
        <Text style={styles.header}>AI Website Visibility Report</Text>
        <Text style={styles.url}>{url}</Text>

        {/* Summary */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.text}>Visibility Score: {score}%</Text>
        <Text style={styles.text}>
          This report summarizes the current visibility of your website in AI
          platforms. Below are the parameters we checked and their results.
        </Text>

        {/* Parameters */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Parameters Checked
        </Text>
        {factors.map((factor, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorName}>{factor.name}</Text>
            <Text style={styles.factorDesc}>{factor.desc}</Text>
            <Text
              style={[
                styles.factorStatus,
                { color: statusColors[factor.status] },
              ]}
            >
              {factor.status}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.{"\n"}
          Visibility scores are approximate and based on public data. Not legal advice.
        </Text>
      </Page>
    </Document>
  );
}
