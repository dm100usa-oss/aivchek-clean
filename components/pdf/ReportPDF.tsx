// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface Factor {
  name: string;
  desc: string;
}

interface ReportPDFProps {
  url: string;
  score: number;
  date?: string;
  factors?: Factor[];
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.4,
    color: "#111827",
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: "#374151",
  },
  smallCenter: {
    textAlign: "center",
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 8,
    color: "#111827",
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 11,
    color: "#374151",
  },
  factorBlock: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111827",
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
    marginBottom: 2,
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
  },
});

const defaultFactors: Factor[] = [
  {
    name: "Robots.txt",
    desc:
      "This file determines whether AI systems can access your website. If it is misconfigured or blocks access, your entire site may disappear from AI-driven results.",
  },
  {
    name: "Sitemap.xml",
    desc:
      "A sitemap tells AI which pages exist on your website and which are most important for indexing. Without it, large parts of your site may remain invisible.",
  },
  {
    name: "X-Robots-Tag",
    desc:
      "These server-side headers signal whether AI can display your pages. If directives like noindex or nofollow are applied incorrectly, important sections may be hidden.",
  },
  {
    name: "Meta robots",
    desc:
      "This meta tag in the page's HTML controls whether AI can index the page. Misconfiguration can unintentionally exclude important pages.",
  },
  {
    name: "Canonical Tags",
    desc:
      "A canonical tag tells AI which version of a page is the primary copy. Without it, duplicates compete and AI may show the wrong version.",
  },
  {
    name: "Title Tags",
    desc:
      "The page title is the first element both users and AI systems see. Missing or duplicate titles reduce clarity and visibility.",
  },
  {
    name: "Meta Descriptions",
    desc:
      "A meta description provides a short preview of page content. Missing or vague descriptions reduce click-through rates and clarity.",
  },
  {
    name: "Open Graph Tags",
    desc:
      "These tags control how links appear in social media and AI answers. Without proper Open Graph tags, previews can look broken or unprofessional.",
  },
  {
    name: "H1 Headings",
    desc:
      "The H1 tag is the main heading of a page. If missing or duplicated, AI cannot clearly identify the page's topic.",
  },
  {
    name: "Structured Data",
    desc:
      "Schema markup (JSON-LD) helps AI understand the type of content (product, article, organization). Missing or broken markup reduces rich result opportunities.",
  },
  {
    name: "Mobile-Friendliness",
    desc:
      "If the site is not optimized for mobile, AI considers it unreliable and may show it less frequently. Most users browse from mobile devices.",
  },
  {
    name: "HTTPS Security",
    desc:
      "A secure connection (HTTPS) is a basic trust signal. Sites without HTTPS are flagged as insecure and are shown less often by AI systems.",
  },
  {
    name: "Alt Texts for Images",
    desc:
      "Alt texts describe images and allow AI to interpret visual content. Without them, important information in images is ignored.",
  },
  {
    name: "Favicon",
    desc:
      "A favicon is the small icon shown in browsers and sometimes in previews. Missing favicon can make a site appear incomplete.",
  },
  {
    name: "Custom 404 Page",
    desc:
      "A proper 404 page signals that a resource does not exist. If misconfigured, AI may treat broken links as valid, reducing trust.",
  },
];

export default function ReportPDF({
  url,
  score,
  date,
  factors,
}: ReportPDFProps) {
  const usedFactors = factors && factors.length ? factors : defaultFactors;
  const assessmentDate = date || new Date().toLocaleDateString("en-US");

  let conclusionTitle = "";
  let conclusionText = "";

  if (score >= 80) {
    conclusionTitle = "High Visibility (≥80%)";
    conclusionText =
      "Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce performance. It is recommended to perform checks periodically to maintain results.";
  } else if (score >= 40) {
    conclusionTitle = "Moderate Visibility (40–79%)";
    conclusionText =
      "Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. In its current state the site may appear in AI results, but with limited trust and often ranked below competitors. By following the recommendations in this report, visibility can be significantly improved.";
  } else {
    conclusionTitle = "Low Visibility (<40%)";
    conclusionText =
      "At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely. This means the site remains largely invisible to ChatGPT, Copilot, Gemini, and other systems. Fixing these issues requires a comprehensive approach but opens access to new audiences once corrected.";
  }

  return (
    <Document>
      {/* Title page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>
        <Text style={styles.smallCenter}>
          This report shows how visible your website is across AI platforms.
        </Text>

        <View style={{ marginTop: 12, marginBottom: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>Website URL</Text>
          <Text style={styles.paragraph}>{url}</Text>

          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Date of Assessment
          </Text>
          <Text style={styles.paragraph}>{assessmentDate}</Text>

          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Visibility Score
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
            {score}%
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Conclusion</Text>
        <Text style={styles.paragraph}>{conclusionTitle}</Text>
        <Text style={styles.paragraph}>{conclusionText}</Text>
      </Page>

      {/* Introduction and factors */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact. The
          results are summarized first, followed by detailed explanations and
          recommendations. The final section contains a developer's checklist
          that can be handed over directly for implementation.
        </Text>

        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        <Text style={styles.paragraph}>
          To calculate your site's visibility score, we analyzed 15 key
          parameters. Each parameter affects visibility in AI platforms.
        </Text>

        {usedFactors.map((f, i) => (
          <View key={i} style={styles.factorBlock}>
            <Text style={styles.factorName}>{f.name}</Text>
            <Text style={styles.factorDesc}>{f.desc}</Text>
          </View>
        ))}
      </Page>

      {/* Developer checklist */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Developer's Checklist</Text>
        <Text style={styles.paragraph}>
          This checklist is based on the parameters that affect visibility
          across AI platforms. It outlines checks and recommended fixes for
          engineers.
        </Text>

        {usedFactors.map((f, i) => (
          <View key={i} style={styles.factorBlock}>
            <Text style={styles.factorName}>{f.name}</Text>
            <Text style={styles.factorDesc}>
              What to check: Verify accessibility and correct configuration.
            </Text>
            <Text style={styles.factorDesc}>
              What to do: Apply best practices and fix issues found.
            </Text>
          </View>
        ))}

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a
          product of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
}
