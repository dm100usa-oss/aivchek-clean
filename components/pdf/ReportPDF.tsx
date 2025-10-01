"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
    fontSize: 14,
    fontFamily: "Helvetica",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
  },
});

const ReportPDF: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src="/aisignalmax-logo.png" style={styles.logo} />
      <Text style={styles.title}>AI Website Visibility Report</Text>
      <Text style={styles.subtitle}>This is a test PDF attachment</Text>
    </Page>
  </Document>
);

export default ReportPDF;
