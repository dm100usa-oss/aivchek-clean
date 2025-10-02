// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
} from "@react-pdf/renderer";

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
  date: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
    lineHeight: 1.5,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 12,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#374151",
    marginBottom: 20,
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  donut: {
    alignSelf: "center",
    marginVertical: 20,
  },
  conclusion: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 20,
    textAlign: "justify",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 14,
    textAlign: "center",
    color: "#111827",
  },
  factorBox: {
    marginBottom: 12,
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#0F172A",
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
    textAlign: "justify",
  },
  checklistTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    color: "#111827",
  },
  checklistText: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: "justify",
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    textAlign: "center",
    color: "#6B7280",
  },
});

function DonutPDF({ score }: { score: number }) {
  const radius = 50;
  const stroke = 8;
  return (
    <View style={styles.donut}>
      <Svg width="120" height="120" viewBox="0 0 120 120">
        <Circle stroke="#E5E7EB" fill="none" strokeWidth={stroke} r={radius} cx="60" cy="60" />
        <Circle stroke="#10B981" fill="none" strokeWidth={stroke} r={radius} cx="60" cy="60" />
      </Svg>
      <Text style={{ textAlign: "center", marginTop: -70, fontSize: 18, fontWeight: "bold" }}>
        {score}%
      </Text>
    </View>
  );
}

export default function ReportPDF({ url, mode, score, date }: ReportPDFProps) {
  const getConclusion = (score: number) => {
    if (score >= 80) {
      return `High Visibility (≥80%)
Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. This means that search and AI systems recognize your site as a reliable and user-friendly source of information.
However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce your performance. That is why it is important to continue periodic checks—at least every few months—to preserve and strengthen your results.`;
    } else if (score >= 40) {
      return `Moderate Visibility (40–79%)
Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. In its current state, the site may appear in AI results, but with limited trust and often ranked below competitors. This reduces the number of visitors and lowers your share of visibility.
This situation is not critical. By carefully following the recommendations, visibility can be significantly improved. Many companies achieve their strongest growth in traffic and inquiries precisely at this stage, once corrections are made.`;
    } else {
      return `Low Visibility (<40%)
At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely. This means your site remains invisible to ChatGPT, Copilot, Gemini, and other systems—potential customers simply do not find you where they are searching.
A low visibility score indicates systemic issues. Fixing them requires a comprehensive approach, but it also unlocks new opportunities to reach audiences and position your business in the digital environment. Without addressing these problems, your site will continue to lose ground to competitors.`;
    }
  };

  const factors = [
    {
      name: "robots.txt",
      desc: "This file determines whether AI systems can access your website. If it is misconfigured or blocks access, your entire site may disappear from AI-driven results. Even small mistakes can create major visibility issues.",
    },
    {
      name: "sitemap.xml",
      desc: "A sitemap tells AI which pages exist on your website and which are most important for indexing. Without it—or if it is incomplete or broken—large parts of your site may remain invisible. Customers may never discover your key products, services, or categories.",
    },
    {
      name: "X-Robots-Tag",
      desc: "These server-side headers signal whether AI can display your pages. If directives like noindex or nofollow are applied incorrectly, important sections of your site will not appear in results.",
    },
    {
      name: "Meta Robots",
      desc: "This is a meta tag placed in the page’s HTML that also controls whether AI can index it. If misconfigured, valuable pages will be excluded.",
    },
    {
      name: "Canonical Tags",
      desc: "A canonical tag tells AI which version of a page is the “master” copy. Without it, duplicate pages compete against each other, and AI may show the wrong version. Customers may land on outdated or less relevant pages.",
    },
    {
      name: "Title Tags",
      desc: "The page title is the first element both customers and AI systems see. It strongly influences whether users choose your site or a competitor’s.",
    },
    {
      name: "Meta Descriptions",
      desc: "A meta description provides a short preview of your page content beneath the title. When missing, duplicated, or too vague, AI generates random snippets that don’t represent your brand.",
    },
    {
      name: "Open Graph Tags",
      desc: "These tags control how your links appear in social media, messengers, and AI-generated answers. Without proper Open Graph settings, users see broken text, cropped or missing images.",
    },
    {
      name: "H1 Headings",
      desc: "The H1 tag is the main headline of a page. It communicates the core topic to both AI and customers. If H1 headings are missing or duplicated, AI cannot clearly identify what the page is about.",
    },
    {
      name: "Structured Data",
      desc: "Structured data markup helps AI understand exactly what is on your site—whether it’s a product, service, article, or company profile. With correct schema, your site can appear in rich results.",
    },
    {
      name: "Mobile-Friendliness",
      desc: "Most visitors access websites from mobile devices. If your site is not mobile-friendly, AI systems consider it unreliable and show it less frequently.",
    },
    {
      name: "HTTPS Security",
      desc: "A secure HTTPS connection is a basic trust signal. AI platforms and browsers both treat non-HTTPS sites as unsafe.",
    },
    {
      name: "Alt Texts",
      desc: "Alt texts are descriptions of images that allow AI systems to “see” visual content. Without them, your images remain invisible.",
    },
    {
      name: "Favicon",
      desc: "The favicon is the small icon displayed in browsers and results. While it may seem minor, for AI it is a signal of completeness and credibility.",
    },
    {
      name: "Custom 404 Page",
      desc: "A 404 error page tells AI and users that a page doesn’t exist. If it is missing or misconfigured, AI mistakes broken links for valid ones.",
    },
  ];

  return (
    <Document>
      {/* Title Page */}
      <Page style={styles.page}>
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.subtitle}>AI Website Visibility Report</Text>
        <DonutPDF score={score} />
        <Text style={styles.textCenter}>Website: {url}</Text>
        <Text style={styles.textCenter}>Date: {date}</Text>
        <Text style={styles.conclusion}>{getConclusion(score)}</Text>
      </Page>

      {/* Introduction */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.conclusion}>
          This report has been prepared for the website owner. It shows the
          current condition of your site in terms of visibility across AI
          platforms and explains which factors have the greatest impact. The
          results are summarized first, followed by detailed explanations and
          recommendations. The final section of this report contains a
          developer’s checklist that can be handed over directly for
          implementation.
        </Text>
      </Page>

      {/* Factors */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{f.name}</Text>
            <Text style={styles.factorDesc}>{f.desc}</Text>
          </View>
        ))}
      </Page>

      {/* Checklist */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Developer’s Checklist</Text>
        <Text style={styles.checklistText}>
          This checklist has been prepared based on the analysis of site
          parameters that affect visibility across AI platforms (ChatGPT,
          Microsoft Copilot, Gemini, Claude, and others). It outlines the
          factors that require verification and possible correction, and serves
          as a roadmap for implementing improvements aimed at strengthening
          stability and trust. All of the parameters listed contribute to better
          indexing and higher visibility.
        </Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.checklistTitle}>{f.name}</Text>
            <Text style={styles.checklistText}>What to check: …</Text>
            <Text style={styles.checklistText}>What to do: …</Text>
          </View>
        ))}
      </Page>

      {/* Footer */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Support & Contact</Text>
        <Text style={styles.textCenter}>
          If you do not currently have access to a developer, our team can
          assist in quickly improving your website’s visibility across AI
          platforms.
        </Text>
        <Text style={styles.textCenter}>Contact: support@aisignalmax.com</Text>
        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
