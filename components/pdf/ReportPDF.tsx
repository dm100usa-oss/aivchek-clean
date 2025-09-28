"use client";

import { Page, Text, View, Document, StyleSheet, Image, DocumentProps } from "@react-pdf/renderer";
import { ReactElement } from "react";

type ReportProps = {
  url: string;
  score: number;
  results: { name: string; status: string; recommendation?: string }[];
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  url: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 8,
  },
  table: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  factorStatus: {
    fontSize: 12,
  },
  recommendation: {
    fontSize: 11,
    color: "gray",
    marginLeft: 10,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 30,
    color: "gray",
  },
});

export default function ReportPDF({ url, score, results }: ReportProps): ReactElement<DocumentProps> {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/aisignalmax-logo.png" style={styles.logo} />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.url}>{url}</Text>
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.paragraph}>Visibility Score: {score}%</Text>
        <Text style={styles.paragraph}>
          This report summarizes the current visibility of your website in AI platforms. Below are the parameters we checked and their results.
        </Text>

        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        <View style={styles.table}>
          {results.map((r, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.factorName}>{r.name}</Text>
              <Text style={styles.factorStatus}>{r.status}</Text>
            </View>
          ))}
          {results.map(
            (r, i) =>
              r.recommendation && (
                <Text key={`rec-${i}`} style={styles.recommendation}>
                  {r.recommendation}
                </Text>
              )
          )}
        </View>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.{"\n"}
          Visibility scores are approximate and based on public data.
        </Text>
      </Page>
    </Document>
  );
}
