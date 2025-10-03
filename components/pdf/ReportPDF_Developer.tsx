// /components/pdf/ReportPDF_Developer.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFData } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 20 },
  section: { marginBottom: 10 },
});

function ReportPDF_Developer({ url, date, score, checks }: PDFData) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Developer)</Text>
        <Text>URL: {url}</Text>
        <Text>Date: {date}</Text>
        <Text>Score: {score}%</Text>
        <View style={styles.section}>
          {checks.map((c, i) => (
            <Text key={i}>
              {c.name}: {c.passed ? "✔ Fix not needed" : "✘ Needs fixing"}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF_Developer;
