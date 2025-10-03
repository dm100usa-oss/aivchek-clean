import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { AnalyzeResult } from "@/lib/analyze";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
  title: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  item: { marginBottom: 8 },
});

function ReportPDF_Developer({
  url,
  date,
  score,
  interpretation,
  items,
}: AnalyzeResult & { date: string }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Developer)</Text>
        <Text>URL: {url}</Text>
        <Text>Date: {date}</Text>
        <Text>Score: {score}% – {interpretation}</Text>
        <View>
          {items.map((c, i) => (
            <View key={i} style={styles.item}>
              <Text>{c.name}</Text>
              <Text>Status: {c.passed === true ? "Passed" : c.passed === false ? "Failed" : "Partial"}</Text>
              <Text>{c.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF_Developer;
