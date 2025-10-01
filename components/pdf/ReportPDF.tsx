// components/pdf/ReportPDF.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  score: number;
}

export default function ReportPDF({ url, score }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.section}>Website: {url}</Text>
          <Text style={styles.section}>Score: {score}%</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 8,
  },
});

