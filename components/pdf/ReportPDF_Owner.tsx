// components/pdf/ReportPDF_Owner.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 20,
  },
  donutWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  summaryBox: {
    marginVertical: 20,
    padding: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 6,
    textAlign: "center",
  },
  summaryText: {
    fontSize: 12,
    fontWeight: "medium",
    color: "#111827",
  },
  section: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  factorItem: {
    marginBottom: 8,
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#111827",
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#6B7280",
  },
});

// Simple Lotus Logo as SVG
const Logo = () => (
  <Svg style={styles.logo} width="60" height="60" viewBox="0 0 64 64">
    <Path
      d="M32 4C28 12 20 20 16 32c4 2 8 4 16 4s12-2 16-4c-4-12-12-20-16-28z"
      fill="#0ea5e9"
    />
    <Path
      d="M32 8c-2 6-6 12-8 20 2 1 4 2 8 2s6-1 8-2c-2-8-6-14-8-20z"
      fill="#10b981"
    />
  </Svg>
);

interface ReportPDFProps {
  url: string;
  score: number;
  date: string;
}

const ReportPDF_Owner: React.FC<ReportPDFProps> = ({ url, score, date }) => {
  const conclusion =
    score >= 80
      ? "High Visibility: Your website is well-prepared for AI platforms. Most parameters are configured correctly."
      : score >= 40
      ? "Moderate Visibility: Your website is partially visible for AI platforms. Some parameters require improvement."
      : "Low Visibility: Your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing.";

  const factors = [
    {
      name: "Robots.txt",
      desc: "Controls whether AI can see your site. If misconfigured and blocking access, your entire website may disappear.",
    },
    {
      name: "Sitemap.xml",
      desc: "Tells AI which pages exist. If missing or broken, important sections remain invisible.",
    },
    {
      name: "X-Robots-Tag",
      desc: "Server-side headers that determine if pages can appear in AI results.",
    },
    {
      name: "Meta robots",
      desc: "Meta tag in the page controlling visibility. Wrong settings can hide important pages.",
    },
    {
      name: "Canonical",
      desc: "Indicates the main version of a page. Without it, duplicates compete and confuse AI.",
    },
    {
      name: "Title",
      desc: "Page titles affect both AI and users. Missing or generic titles reduce visibility.",
    },
    {
      name: "Meta description",
      desc: "Provides a short preview in results. Missing or vague descriptions push visitors away.",
    },
    {
      name: "Open Graph",
      desc: "Defines how links appear when shared. Without it, previews look broken or random.",
    },
    {
      name: "H1",
      desc: "The main heading signals page content. Missing or duplicated H1 weakens visibility.",
    },
    {
      name: "Structured Data",
      desc: "Schema markup helps AI understand your content (products, articles, services).",
    },
    {
      name: "Mobile friendly",
      desc: "If your site isn’t optimized for phones, AI considers it inconvenient and ranks it lower.",
    },
    {
      name: "HTTPS",
      desc: "Secure connection builds trust. Sites without HTTPS are flagged unsafe.",
    },
    {
      name: "Alt texts",
      desc: "Captions for images help AI interpret visuals. Without them, images remain invisible.",
    },
    {
      name: "Favicon",
      desc: "Small site icon used in browsers and AI previews. Without it, the site looks unfinished.",
    },
    {
      name: "404 page",
      desc: "A proper 404 tells AI which pages don’t exist. Misconfigured errors confuse indexing.",
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Logo />
          <Text style={styles.title}>AI Website Visibility Report</Text>
          <Text style={styles.subtitle}>AI Signal Max</Text>
          <Text style={styles.subtitle}>{url}</Text>
          <Text style={styles.subtitle}>{date}</Text>
        </View>

        {/* Donut Placeholder */}
        <View style={styles.donutWrapper}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#0F172A" }}>
            Score: {score}%
          </Text>
        </View>

        {/* Conclusion */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>{conclusion}</Text>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text>
            This report provides an overview of your website’s visibility for AI
            platforms. It summarizes the current status, highlights areas for
            improvement, and explains which parameters affect performance.
          </Text>
        </View>

        {/* Factors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
          {factors.map((f, i) => (
            <View key={i} style={styles.factorItem}>
              <Text style={styles.factorName}>{f.name}</Text>
              <Text style={styles.factorDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. {"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF_Owner;
