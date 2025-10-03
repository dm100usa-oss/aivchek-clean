// components/pdf/ReportPDF_Owner.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Circle,
} from "@react-pdf/renderer";

export interface ResultItem {
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

// ----------------- STYLES -----------------
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 6,
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 12,
  },
  donutWrapper: {
    alignItems: "center",
    marginVertical: 24,
  },
  summaryBox: {
    marginTop: 16,
    padding: 14,
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
    marginBottom: 10,
    borderRadius: 8,
    border: "1pt solid #E5E7EB",
    backgroundColor: "#F3F4F6",
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
  },
});

// ----------------- LOGO -----------------
const Logo = () => (
  <Svg width="50" height="50" viewBox="0 0 64 64">
    <Path
      d="M32 4C28 12 20 20 16 32c4 2 8 4 16 4s12-2 16-4c-4-12-12-20-16-28z"
      fill="#2563EB"
    />
    <Path
      d="M32 8c-2 6-6 12-8 20 2 1 4 2 8 2s6-1 8-2c-2-8-6-14-8-20z"
      fill="#10B981"
    />
  </Svg>
);

// ----------------- DONUT -----------------
const DonutPDF = ({ score }: { score: number }) => {
  const radius = 70; // уменьшенный на 35%
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = (value: number) => {
    if (value >= 80) return "#10B981";
    if (value >= 40) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Svg width="180" height="180" viewBox="0 0 240 240">
      <Circle
        cx="120"
        cy="120"
        r={radius.toString()}
        stroke="#E5E7EB"
        strokeWidth={stroke.toString()}
        fill="white"
      />
      <Circle
        cx="120"
        cy="120"
        r={radius.toString()}
        stroke={getColor(score)}
        strokeWidth={stroke.toString()}
        strokeLinecap="round"
        strokeDasharray={circumference.toString()}
        strokeDashoffset={(circumference - progress).toString()}
        fill="none"
        transform="rotate(-90 120 120)"
      />
      <Text
        x="120"
        y="125"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fill="#111827"
      >
        {score}%
      </Text>
    </Svg>
  );
};

// ----------------- COMPONENT -----------------
export default function ReportPDF_Owner({
  url,
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
      {/* COVER PAGE */}
      <Page style={styles.page}>
        <View style={styles.header}>
          <Logo />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.subtitle}>Website: {url}</Text>
          <Text style={styles.subtitle}>Date: {date}</Text>
        </View>

        <View style={styles.donutWrapper}>
          <DonutPDF score={score} />
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{getConclusion(score)}</Text>
        </View>
      </Page>

      {/* RESULTS PAGE */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
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
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
