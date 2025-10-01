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

// Register basic font (fallback)
Font.register({
  family: "Helvetica",
  fonts: [{ src: "https://fonts.gstatic.com/s/helvetica.ttf" }],
});

interface ReportPDFProps {
  url: string;
  score: number;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
    padding: 40,
    color: "#111827",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#374151",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
    color: "#111827",
  },
  paragraph: {
    marginBottom: 10,
    fontSize: 12,
    color: "#374151",
  },
  factorItem: {
    marginBottom: 12,
  },
  factorTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 12,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 30,
    color: "#6b7280",
  },
});

const ReportPDF: React.FC<ReportPDFProps> = ({ url, score }) => {
  let conclusion = "";
  if (score >= 80) {
    conclusion =
      "High Visibility (≥80%): Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. However, even with high visibility, technical details require monitoring and periodic checks.";
  } else if (score >= 40) {
    conclusion =
      "Moderate Visibility (40–79%): Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. With corrections, visibility can be significantly improved and lead to stronger growth in traffic and inquiries.";
  } else {
    conclusion =
      "Low Visibility (<40%): At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely. This means your site remains invisible to ChatGPT, Copilot, Gemini, and other systems. Fixing these issues requires a comprehensive approach.";
  }

  const factors = [
    {
      name: "1. robots.txt",
      desc: "Determines whether AI systems can access your website. If misconfigured or blocks access, your entire site may disappear from AI-driven results.",
    },
    {
      name: "2. sitemap.xml",
      desc: "Tells AI which pages exist and which are important for indexing. Without it, large parts of your site may remain invisible.",
    },
    {
      name: "3. X-Robots-Tag",
      desc: "Server-side headers that control if AI can display your pages. Incorrect directives hide valuable content from AI.",
    },
    {
      name: "4. Meta Robots",
      desc: "Meta tag inside the HTML that controls if AI can index a page. Misconfiguration can exclude critical pages.",
    },
    {
      name: "5. Canonical Tags",
      desc: "Indicates the master version of a page. Without it, duplicates compete, and AI may show the wrong version.",
    },
    {
      name: "6. Title Tags",
      desc: "Page titles are the first element users and AI see. Missing or duplicated titles reduce clarity and visibility.",
    },
    {
      name: "7. Meta Descriptions",
      desc: "Short descriptions under titles in results. Missing or vague descriptions reduce clicks and clarity.",
    },
    {
      name: "8. Open Graph Tags",
      desc: "Control how links appear in social media and AI answers. Without them, previews look broken or unprofessional.",
    },
    {
      name: "9. H1 Headings",
      desc: "The main heading of a page. If missing or duplicated, AI cannot clearly identify the page’s topic.",
    },
    {
      name: "10. Structured Data",
      desc: "Schema markup (JSON-LD) helps AI understand your content. Missing markup reduces rich result opportunities.",
    },
    {
      name: "11. Mobile-Friendliness",
      desc: "If the site is not optimized for mobile, AI considers it unreliable and shows it less frequently.",
    },
    {
      name: "12. HTTPS Security",
      desc: "A secure connection is a basic trust signal. Non-HTTPS sites are flagged as unsafe and less visible.",
    },
    {
      name: "13. Alt Texts for Images",
      desc: "Descriptions of images allow AI to interpret them. Without alt texts, important visual content is ignored.",
    },
    {
      name: "14. Favicon",
      desc: "A small site icon in browsers and AI previews. Without it, the site looks incomplete and less credible.",
    },
    {
      name: "15. Custom 404 Page",
      desc: "A proper 404 page tells AI that a resource doesn’t exist. Misconfigured errors reduce trust and visibility.",
    },
  ];

  return (
    <Document>
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          This report shows how visible your website is across AI platforms.
        </Text>
        <Text style={styles.paragraph}>Website: {url}</Text>
        <Text style={styles.paragraph}>Visibility Score: {score}%</Text>
        <Text style={styles.sectionTitle}>Conclusion</Text>
        <Text style={styles.paragraph}>{conclusion}</Text>
      </Page>

      {/* Introduction & Factors */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact.
        </Text>
        <Text style={styles.paragraph}>
          Below are the 15 key parameters that influence how AI interprets your
          site. Together they form the basis of your final visibility score.
        </Text>

        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorTitle}>{f.name}</Text>
            <Text style={styles.paragraph}>{f.desc}</Text>
          </View>
        ))}
      </Page>

      {/* Developer Checklist */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Developer’s Checklist</Text>
        <Text style={styles.paragraph}>
          This checklist is based on the analysis of your site’s parameters that
          affect visibility across AI platforms. It outlines what to verify and
          correct to improve trust and stability.
        </Text>

        {factors.map((f, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorTitle}>{f.name}</Text>
            <Text style={styles.paragraph}>
              What to check: Ensure correct configuration and no conflicts.
            </Text>
            <Text style={styles.paragraph}>
              What to do: Apply best practices and fix issues if found.
            </Text>
          </View>
        ))}

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF;
