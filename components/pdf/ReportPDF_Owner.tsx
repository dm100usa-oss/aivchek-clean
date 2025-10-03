// /components/pdf/ReportPDF_Owner.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFData } from "@/lib/types";
import DonutPDF from "./DonutPDF";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  section: { marginTop: 20 },
});

function ReportPDF_Owner({ url, date, score, checks }: PDFData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Owner)</Text>
        <DonutPDF score={score} />
        <Text>URL: {url}</Text>
        <Text>Date: {date}</Text>
        <Text>Score: {score}%</Text>
        <View style={styles.section}>
          {checks.map((c, i) => (
            <Text key={i}>
              {c.name}: {c.passed ? "Good" : "Poor"}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF_Owner;
