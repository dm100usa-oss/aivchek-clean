import React from "react";
import { Document, Page, Text, StyleSheet, View, Image } from "@react-pdf/renderer";
import logo from "@/public/логотип.png";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#111",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  logo: {
    width: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
});

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo.src} style={styles.logo} />
        <Text style={styles.header}>AI Website Visibility Report</Text>
        <View style={styles.section}>
          <Text>Website: {url}</Text>
          <Text>Score: {score}%</Text>
          <Text>Date: {date}</Text>
        </View>
      </Page>
    </Document>
  );
}
