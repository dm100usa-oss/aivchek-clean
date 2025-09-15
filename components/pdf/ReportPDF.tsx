"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  section: { marginBottom: 15 },
  heading: { fontSize: 14, marginBottom: 8, fontWeight: "bold" },
  text: { marginBottom: 4 },
  footer: { marginTop: 30, fontSize: 8, textAlign: "center", color: "grey" },
});

export default function ReportPDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Pro</Text>
        <View style={styles.section}>
          <Text style={styles.heading}>Введение</Text>
          <Text style={styles.text}>
            Этот отчёт показывает, насколько ваш сайт виден для ИИ-платформ.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Заключение</Text>
          <Text style={styles.text}>
            Все факторы напрямую влияют на видимость сайта. К отчёту приложено
            техническое задание для разработчика.
          </Text>
        </View>
        <Text style={styles.footer}>
          AI Signal Pro is a product of Magic of Discoveries LLC
        </Text>
      </Page>
    </Document>
  );
}
