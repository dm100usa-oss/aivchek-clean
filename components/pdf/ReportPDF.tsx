"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../public/logo-pdf.png"; // твой логотип

// Стили для PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    margin: "0 auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  url: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  donutWrapper: {
    textAlign: "center",
    marginVertical: 20,
  },
  donut: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
  },
  conclusion: {
    marginVertical: 20,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#1f2937",
  },
  factorItem: {
    marginBottom: 8,
  },
  factorName: {
    fontWeight: "bold",
  },
  statusGood: { color: "#059669" },
  statusModerate: { color: "#d97706" },
  statusPoor: { color: "#dc2626" },
  footer: {
    marginTop: 40,
    fontSize: 10,
    textAlign: "center",
    color: "#6b7280",
  },
});

// Главный компонент PDF
export default function ReportPDF({
  score,
  url,
  factors,
}: {
  score: number;
  url: string;
  factors: {
    name: string;
    desc: string;
    status: "Good" | "Moderate" | "Poor";
  }[];
}) {
  // Определяем текст заключения
  let conclusionText = "";
  if (score >= 80) {
    conclusionText = "Ваш сайт уже хорошо подготовлен... (текст высокого уровня)";
  } else if (score >= 40) {
    conclusionText = "Ваш сайт в целом доступен... (текст среднего уровня)";
  } else {
    conclusionText = "Сейчас ваш сайт имеет серьёзные ограничения... (текст низкого уровня)";
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Обложка */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.url}>{url}</Text>
        </View>

        {/* Donut */}
        <View style={styles.donutWrapper}>
          <Text style={styles.donut}>{score}%</Text>
        </View>

        {/* Заключение */}
        <View style={styles.conclusion}>
          <Text>{conclusionText}</Text>
        </View>

        {/* Параметры */}
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorName}>{f.name}</Text>
            <Text>{f.desc}</Text>
            <Text
              style={
                f.status === "Good"
                  ? styles.statusGood
                  : f.status === "Moderate"
                  ? styles.statusModerate
                  : styles.statusPoor
              }
            >
              {f.status}
            </Text>
          </View>
        ))}

        {/* Футер */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. {"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC {"\n"}
          Visibility scores are estimated and based on publicly available data.
          Not legal advice.
        </Text>
      </Page>
    </Document>
  );
}
