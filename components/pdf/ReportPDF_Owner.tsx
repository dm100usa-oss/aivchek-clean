// components/pdf/ReportPDF_Owner.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF"; // статичный круг с процентами

// ---- СТИЛИ ----
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    padding: 40,
    lineHeight: 1.5,
    color: "#111827",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    color: "#374151",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
  },
  paragraph: {
    marginBottom: 10,
    textAlign: "justify",
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 20,
    color: "#6B7280",
  },
  logo: {
    width: 120,
    marginBottom: 20,
    alignSelf: "center",
  },
});

// ---- КОМПОНЕНТ ----
export default function ReportPDF_Owner({
  url,
  date,
  score,
}: {
  url: string;
  date: string;
  score: number;
}) {
  // Заключение
  let conclusion = "";
  if (score >= 80) {
    conclusion =
      "Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly...";
  } else if (score >= 40) {
    conclusion =
      "Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement...";
  } else {
    conclusion =
      "At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured...";
  }

  return (
    <Document>
      {/* --- Title Page --- */}
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>

        <View style={styles.section}>
          <Text>Website: {url}</Text>
          <Text>Date: {date}</Text>
        </View>

        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <DonutPDF score={score} />
        </View>

        <Text style={styles.heading}>Conclusion</Text>
        <Text style={styles.paragraph}>{conclusion}</Text>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>

      {/* --- Introduction --- */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact.
        </Text>
        <Text style={styles.paragraph}>
          The results are summarized first, followed by detailed explanations
          and recommendations. The final section of this report contains a
          developer’s checklist that can be handed over directly for
          implementation.
        </Text>
      </Page>

      {/* --- Parameters --- */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Key Factors Reviewed</Text>
        <Text style={styles.paragraph}>
          To calculate your site’s visibility score, we analyzed 15 key
          parameters that influence how AI platforms and search engines
          interpret your site. These range from fundamental technical settings
          to user experience details.
        </Text>
        <Text style={styles.paragraph}>
          Below, you will find the status of each parameter and recommendations
          for improvement. Together, they form the foundation of your site’s
          final visibility percentage.
        </Text>
      </Page>

      {/* --- Footer Page --- */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Support and Contact</Text>
        <Text style={styles.paragraph}>
          If you do not currently have access to a developer, our team can
          assist in quickly improving your website’s visibility across AI
          platforms.
        </Text>
        <Text style={styles.paragraph}>Contact: support@aisignalmax.com</Text>
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
}
