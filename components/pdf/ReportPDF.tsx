"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    margin: "0 auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  url: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  donutWrapper: {
    textAlign: "center",
    marginVertical: 20,
  },
  donut: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
  },
  conclusion: {
    marginVertical: 20,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1f2937",
  },
  factorItem: {
    marginBottom: 8,
  },
  factorName: {
    fontWeight: "bold",
  },
  statusGood: { color: "#059669" },
  statusModerate: { color: "#d97706" },
  statusPoor: { color: "#dc2626" },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#6b7280",
  },
});

// Main PDF component
export default function ReportPDF({
  score,
  url,
  factors,
}: {
  score: number;
  url: string;
  factors: {
    name: string;
    desc: string;
    status: "Good" | "Moderate" | "Poor";
  }[];
}) {
  // Conclusion text
  let conclusionText = "";
  if (score >= 80) {
    conclusionText =
      "Your website is well prepared for AI platforms. Most key parameters are configured correctly, which ensures high chances of being visible in ChatGPT, Copilot, Gemini and other systems.\n\nStill, even at this level, small issues or outdated settings can reduce performance over time. Regular checks every few months help keep your visibility strong.";
  } else if (score >= 40) {
    conclusionText =
      "Your website is partially visible to AI platforms. Some parameters are missing or misconfigured, which limits how often your site appears in results.\n\nThis is a manageable stage: by fixing the highlighted issues, visibility can improve significantly and bring measurable growth in traffic.";
  } else {
    conclusionText =
      "Your website currently has serious visibility issues. Several critical parameters are missing or misconfigured, which makes your site almost invisible to AI platforms.\n\nThese issues require a systematic fix, but resolving them opens access to new users and ensures your business can be found where people search.";
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src="/logo-pdf.png" style={styles.logo} />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.url}>{url}</Text>
        </View>

        {/* Donut (static number) */}
        <View style={styles.donutWrapper}>
          <Text style={styles.donut}>{score}%</Text>
        </View>

        {/* Conclusion */}
        <View style={styles.conclusion}>
          <Text>{conclusionText}</Text>
        </View>

        {/* Parameters */}
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorName}>{f.name}</Text>
            <Text>{f.desc}</Text>
            <Text
              style={
                f.status === "Good"
                  ? styles.statusGood
                  : f.status === "Moderate"
                  ? styles.statusModerate
                  : styles.statusPoor
              }
            >
              {f.status}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. {"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC {"\n"}
          Visibility scores are estimated and based on publicly available data.
          Not legal advice.
        </Text>
      </Page>
    </Document>
  );
}
