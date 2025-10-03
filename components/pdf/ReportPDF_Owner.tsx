// /components/pdf/ReportPDF_Owner.tsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF";

interface ReportPDFProps {
  url: string;
  date: string;
  score: number;
  interpretation: string;
  items: { name: string; status: string; description: string }[];
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 14, marginTop: 10, marginBottom: 10 },
  section: { marginTop: 20 },
  item: { marginBottom: 6 },
});

function ReportPDF_Owner({ url, date, score, interpretation, items }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report (Owner)</Text>
        <DonutPDF score={score} />
        <Text>URL: {url}</Text>
        <Text>Date: {date}</Text>
        <Text>Overall Score: {score}% ({interpretation})</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Summary of Factors:</Text>
          {items.map((item, i) => (
            <Text key={i} style={styles.item}>
              {item.name}: {item.status}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default ReportPDF_Owner;
