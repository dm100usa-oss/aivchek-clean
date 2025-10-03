import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  logo: { width: 100, marginBottom: 20 },
  header: { fontSize: 20, marginBottom: 10 },
  section: { marginBottom: 15 },
});

export default function ReportPDF_Owner({ url, score, date }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/aisignalmax-logo.png" style={styles.logo} />
        <Text style={styles.header}>AI Website Visibility Report</Text>
        <View style={styles.section}>
          <Text>Website: {url}</Text>
          <Text>Score: {score}%</Text>
          <Text>Date: {date}</Text>
        </View>
        <View>
          <Text>
            This report shows how visible your website is for AI platforms.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
