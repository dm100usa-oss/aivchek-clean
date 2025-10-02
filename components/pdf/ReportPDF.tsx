import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ✅ Регистрируем шрифт Inter (TTF, поддерживается React PDF)
Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTcviYw.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 12,
    padding: 40,
    lineHeight: 1.6,
    color: "#111827",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "bold",
  },
});

// Описываем пропсы
export interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
}

export default function ReportPDF({ url, mode, score }: ReportPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report</Text>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Website: </Text>
            {url}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Mode: </Text>
            {mode}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Visibility Score: </Text>
            {score}%
          </Text>
        </View>
      </Page>
    </Document>
  );
}
