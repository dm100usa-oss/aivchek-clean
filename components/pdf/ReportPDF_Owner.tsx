import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF";
import { AnalyzeResult } from "@/lib/analyze";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  section: { marginTop: 20 },
});

function ReportPDF_Owner({
  url,
  date,
  score,
  interpretation,
  items,
}: AnalyzeResult & { date: string }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Owner)</Text>
        <DonutPDF score={score} />
        <Text>URL: {url}</Text>
        <Text>Date: {date}</Text>
        <Text>Score: {score}% – {interpretation}</Text>
        <View style={styles.section}>
          {items.map((c, i) => (
            <Text key={i}>
              {c.name}: {c.passed === true ? "Good" : c.passed === false ? "Poor" : "Partial"}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF_Owner;
