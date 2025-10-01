// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Font
Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff", fontWeight: 600 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 1.5,
    padding: 40,
    color: "#111827",
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    marginBottom: 8,
  },
  factorBlock: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  factorTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 4,
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 4,
  },
  statusGood: { color: "#059669", fontWeight: 600 },
  statusModerate: { color: "#d97706", fontWeight: 600 },
  statusPoor: { color: "#dc2626", fontWeight: 600 },
  footer: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "center",
    color: "#6b7280",
  },
});

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
}

const allFactors = [
  {
    name: "Robots.txt",
    desc: "Controls whether AI platforms can see your site. Misconfiguration can hide your entire site.",
    status: "Good",
  },
  {
    name: "Sitemap.xml",
    desc: "Tells AI which pages exist and should be indexed. Missing or incorrect sitemap leaves important parts invisible.",
    status: "Moderate",
  },
  {
    name: "X-Robots-Tag",
    desc: "Server setting that decides if pages appear in results. If set to disallow, pages disappear from AI answers.",
    status: "Poor",
  },
  {
    name: "Meta robots",
    desc: "HTML tag controlling whether AI can display the page. If blocked, the page disappears from results.",
    status: "Good",
  },
  {
    name: "Canonical",
    desc: "Tells AI which page is the main version. Without it, duplicates compete and the wrong one may show.",
    status: "Moderate",
  },
  {
    name: "Title",
    desc: "The first thing users see. If missing, duplicated, or too generic, AI may show random text.",
    status: "Good",
  },
  {
    name: "Meta description",
    desc: "Short explanation under the title. If missing or vague, AI inserts random text, lowering clicks.",
    status: "Moderate",
  },
  {
    name: "Open Graph",
    desc: "Tags that make your site look good in AI answers/social media. Without them, previews are broken.",
    status: "Poor",
  },
  {
    name: "H1",
    desc: "Main page heading. If missing or duplicated, AI cannot clearly understand the content.",
    status: "Good",
  },
  {
    name: "Structured Data",
    desc: "JSON-LD markup explaining site content (product, article, company). Without it, visibility drops.",
    status: "Moderate",
  },
  {
    name: "Mobile friendly",
    desc: "If the site is broken on phones, AI reduces its visibility. Most traffic comes from mobile.",
    status: "Moderate",
  },
  {
    name: "HTTPS",
    desc: "Secure protocol. Without it, sites are flagged unsafe and shown less often.",
    status: "Good",
  },
  {
    name: "Alt texts",
    desc: "Captions for images help AI interpret visuals. Without them, part of the content is invisible.",
    status: "Poor",
  },
  {
    name: "Favicon",
    desc: "Small site icon. Without it, the site looks unfinished and loses trust.",
    status: "Moderate",
  },
  {
    name: "404 page",
    desc: "Error page that tells AI a resource doesn’t exist. If missing, AI treats broken links as valid.",
    status: "Good",
  },
];

const ReportPDF: React.FC<ReportPDFProps> = ({ url, mode, score }) => {
  const factors = mode === "quick" ? allFactors.slice(0, 5) : allFactors;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Website:</Text>
          <Text style={styles.value}>{url}</Text>
          <Text style={styles.label}>Mode:</Text>
          <Text style={styles.value}>{mode}</Text>
          <Text style={styles.label}>Visibility Score:</Text>
          <Text style={styles.value}>{score}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Parameters checked:</Text>
          {factors.map((f, i) => (
            <View key={i} style={styles.factorBlock}>
              <Text style={styles.factorTitle}>{f.name}</Text>
              <Text style={styles.factorDesc}>{f.desc}</Text>
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
        </View>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          Visibility scores are estimated from public data. Not legal advice.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF;
