import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "@/public/logo.png";

export interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#111827",
    backgroundColor: "#fff",
  },
  logo: { width: 64, height: 64, marginBottom: 20, alignSelf: "center" },
  header: { fontSize: 20, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  subheader: { fontSize: 12, textAlign: "center", marginBottom: 20, color: "#6B7280" },
  summary: { marginTop: 20, fontSize: 13, textAlign: "center" },
  footer: { marginTop: 40, fontSize: 9, textAlign: "center", color: "#6B7280" },
});

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo.src} style={styles.logo} />
        <Text style={styles.header}>AI Website Visibility Report</Text>
        <Text style={styles.subheader}>
          Website: {url} {"\n"} Date: {date}
        </Text>

        <View>
          <Text style={styles.summary}>
            Visibility Score: {score}%
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text>AI Signal Max is a product of Magic of Discoveries LLC.</Text>
        </View>
      </Page>
    </Document>
  );
}
