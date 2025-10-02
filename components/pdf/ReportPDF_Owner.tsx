import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Base64 logo (замени строку на свой полный base64 из logoBase64)
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

export interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
  },
  footer: {
    marginTop: 40,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
  },
});

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <Image style={styles.logo} src={logoBase64} />
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          Website: {url} {"\n"} Date: {date}
        </Text>
        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text style={{ opacity: 0.7 }}>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
