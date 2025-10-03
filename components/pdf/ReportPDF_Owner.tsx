"use client";

import React from "react";
import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#111",
  },
  logo: {
    width: 120,
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 12,
  },
  text: {
    marginBottom: 6,
  },
});

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/aisignalmax-logo.png" style={styles.logo} />
        <Text style={styles.header}>AI Website Visibility Report</Text>
        <View style={styles.section}>
          <Text style={styles.text}>Website: {url}</Text>
          <Text style={styles.text}>Score: {score}%</Text>
          <Text style={styles.text}>Date: {date}</Text>
        </View>
      </Page>
    </Document>
  );
}
