"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 30,
    backgroundColor: "#ffffff",
    color: "#1f2937"
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    alignSelf: "center"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 15
  },
  section: {
    marginBottom: 15
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1f2937"
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    lineHeight: 1.4
  },
  factorTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#1f2937"
  },
  factorBlock: {
    border: "1px solid #f3f4f6",
    backgroundColor: "#f9fafb",
    padding: 8,
    marginBottom: 8
  },
  footer: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 20
  }
});

interface Factor {
  title: string;
  description: string;
}

export interface ReportPDFProps {
  logoSrc: string;
  websiteUrl: string;
  date: string;
  score: number;
  factors: Factor[];
  checklist: string; // full developer checklist text
}

const ReportPDF: React.FC<ReportPDFProps> = ({
  logoSrc,
  websiteUrl,
  date,
  score,
  factors,
  checklist
}) => {
  let conclusionText: string[] = [];
  if (score >= 80) {
    conclusionText = [
      "Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools.",
      "However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce your performance."
    ];
  } else if (score >= 40) {
    conclusionText = [
      "Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement.",
      "This situation is not critical. By carefully following the recommendations, visibility can be significantly improved."
    ];
  } else {
    conclusionText = [
      "At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely.",
      "A low visibility score indicates systemic issues. Fixing them requires a comprehensive approach."
    ];
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logoSrc} />
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>{websiteUrl}</Text>
        <Text style={styles.subtitle}>Date: {date}</Text>
        <Text style={[styles.subtitle, { marginBottom: 20 }]}>
          Visibility Score: {score}%
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Conclusion</Text>
          {conclusionText.map((p, i) => (
            <Text key={i} style={styles.text}>
              {p}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Key Factors Reviewed</Text>
          <Text style={styles.text}>
            We analyzed 15 key parameters that influence how AI platforms
            interpret your site. Below, you will find the status of each
            parameter and recommendations for improvement.
          </Text>
        </View>

        {factors.map((factor, idx) => (
          <View style={styles.factorBlock} key={idx}>
            <Text style={styles.factorTitle}>
              {idx + 1}. {factor.title}
            </Text>
            <Text style={styles.text}>{factor.description}</Text>
          </View>
        ))}

        <View style={styles.section}>
          <Text style={styles.heading}>Developer’s Checklist</Text>
          <Text style={styles.text}>{checklist}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Support</Text>
          <Text style={styles.text}>
            AI Signal Max Support. Contact: support@aisignalmax.com
          </Text>
        </View>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF;
