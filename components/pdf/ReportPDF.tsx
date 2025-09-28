"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Стили для PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    lineHeight: 1.6,
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  url: {
    fontSize: 12,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 30,
    color: "gray",
  },
});

export default function ReportPDF({
  url,
  score,
  summary,
  factors,
}: {
  url: string;
  score: number;
  summary: string;
  factors: { name: string; status: string; recommendation: string }[];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Обложка */}
        <View style={styles.header}>
          <Image src="/aisignalmax-logo.png" style={styles.logo} />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.url}>{url}</Text>
        </View>

        {/* Итог */}
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>
          Visibility Score: {score}%
        </Text>
        <Text style={styles.paragraph}>{summary}</Text>

        {/* Проверенные параметры */}
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {factors.map((f, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <Text>
              • {f.name} — {f.status}
            </Text>
            <Text style={{ fontSize: 11, color: "gray" }}>
              {f.recommendation}
            </Text>
          </View>
        ))}

        {/* Футер */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.{"\n"}
          Visibility scores are approximate, based on public data.
        </Text>
      </Page>
    </Document>
  );
}
