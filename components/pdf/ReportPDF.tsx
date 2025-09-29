"use client";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Цвета из сайта
const colors = {
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray800: "#1f2937",
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
  blue: "#2563eb",
};

// Стили PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    padding: 40,
    lineHeight: 1.5,
    color: colors.gray800,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray800,
    marginTop: 20,
    marginBottom: 10,
  },
  section: {
    marginBottom: 14,
  },
  text: {
    fontSize: 12,
    color: colors.gray600,
    marginBottom: 6,
  },
  card: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: colors.gray50,
    borderRadius: 8,
  },
  factorItem: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
  },
  factorTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  factorDesc: {
    fontSize: 11,
    color: colors.gray600,
  },
  checklistItem: {
    marginBottom: 12,
  },
  footer: {
    fontSize: 9,
    textAlign: "center",
    marginTop: 30,
    color: colors.gray500,
  },
});

// Donut-плейсхолдер (вместо анимации просто круг с процентом)
function Donut({ score }: { score: number }) {
  let color = colors.red;
  if (score >= 80) color = colors.green;
  else if (score >= 40) color = colors.yellow;

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", color }}>{score}%</Text>
    </View>
  );
}

// Основной PDF
export default function ReportPDF({
  url,
  score,
  date,
}: {
  url: string;
  score: number;
  date: string;
}) {
  // Заключение
  let conclusion;
  if (score >= 80) {
    conclusion = `High Visibility — Your website is already well-prepared for AI platforms. Most parameters are configured correctly, ensuring a strong presence in ChatGPT, Copilot, Gemini, and others. Regular checks are still important to maintain results.`;
  } else if (score >= 40) {
    conclusion = `Moderate Visibility — Your website is partly visible to AI platforms, but some important parameters require improvements. With corrections, visibility can grow significantly.`;
  } else {
    conclusion = `Low Visibility — Your website has serious visibility limitations. Multiple critical parameters are misconfigured or missing, making your site invisible to AI platforms. A comprehensive fix is required to unlock visibility.`;
  }

  // 15 факторов (коротко для примера, должны быть полные тексты)
  const factors = [
    {
      name: "robots.txt",
      desc: "Controls whether AI can access your site. If blocking is misconfigured, the site may disappear entirely from AI answers.",
    },
    {
      name: "sitemap.xml",
      desc: "Tells AI which pages exist and should be indexed. Without it, key parts of your site remain invisible.",
    },
    {
      name: "X-Robots-Tag",
      desc: "Server-side headers that allow or block AI indexing. Misuse may hide important content.",
    },
    {
      name: "Meta robots",
      desc: "A tag inside page HTML that controls visibility. If set incorrectly, valuable pages are excluded.",
    },
    {
      name: "Canonical",
      desc: "Defines the master version of a page. Without it, duplicates compete and the wrong version may appear.",
    },
    {
      name: "Title",
      desc: "The main title shown in results. Missing or generic titles reduce visibility and confuse users.",
    },
    {
      name: "Meta description",
      desc: "A short preview under the title. Missing or vague descriptions reduce click-throughs.",
    },
    {
      name: "Open Graph",
      desc: "Controls how your site looks in social previews and AI answers. Missing tags lower trust and clicks.",
    },
    {
      name: "H1",
      desc: "Main headline on each page. Missing or duplicated H1 weakens clarity for both AI and users.",
    },
    {
      name: "Structured Data",
      desc: "Schema markup that explains your content. Without it, AI cannot fully understand your site.",
    },
    {
      name: "Mobile friendly",
      desc: "If your site breaks on mobile, AI lowers its visibility and trust.",
    },
    {
      name: "HTTPS",
      desc: "A secure connection is a basic trust signal. Without HTTPS, sites are flagged as unsafe.",
    },
    {
      name: "Alt texts",
      desc: "Captions for images that let AI interpret visuals. Missing alt texts weaken visibility.",
    },
    {
      name: "Favicon",
      desc: "A small site icon. Without it, the site looks unfinished and loses trust.",
    },
    {
      name: "404 page",
      desc: "A proper error page signals non-existing content. If misconfigured, AI misreads broken links.",
    },
  ];

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>AI Signal Max</Text>
        <Text style={{ textAlign: "center", marginBottom: 10 }}>
          AI Website Visibility Report
        </Text>

        <Text style={{ textAlign: "center", color: colors.gray600 }}>
          {url} — {date}
        </Text>

        <Donut score={score} />

        <View style={styles.card}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Conclusion</Text>
          <Text style={styles.text}>{conclusion}</Text>
        </View>

        <Text style={styles.subheader}>Introduction</Text>
        <Text style={styles.text}>
          This report highlights the current visibility of your website across AI
          platforms and explains which factors have the greatest impact.
        </Text>
        <Text style={styles.text}>
          The results are summarized first, followed by detailed explanations and
          a developer checklist for improvements.
        </Text>

        <Text style={styles.subheader}>15 Key Factors</Text>
        {factors.map((f, i) => (
          <View key={i} style={styles.factorItem}>
            <Text style={styles.factorTitle}>{f.name}</Text>
            <Text style={styles.factorDesc}>{f.desc}</Text>
          </View>
        ))}

        <Text style={styles.subheader}>Developer’s Checklist</Text>
        <Text style={styles.text}>
          This checklist is based on the 15 factors reviewed above and provides
          actionable steps to improve your website’s visibility.
        </Text>

        {/* Для примера выводим только 3 пункта, остальные нужно перенести полностью */}
        <View style={styles.checklistItem}>
          <Text style={styles.factorTitle}>1. robots.txt</Text>
          <Text style={styles.factorDesc}>
            Check availability at /robots.txt. Ensure only unnecessary sections
            are blocked. Verify sitemap link is correct.
          </Text>
        </View>
        <View style={styles.checklistItem}>
          <Text style={styles.factorTitle}>2. sitemap.xml</Text>
          <Text style={styles.factorDesc}>
            Check availability at /sitemap.xml. Include all important pages.
            Validate format and lastmod fields.
          </Text>
        </View>
        <View style={styles.checklistItem}>
          <Text style={styles.factorTitle}>3. X-Robots-Tag</Text>
          <Text style={styles.factorDesc}>
            Review HTTP headers. Remove unwanted noindex directives. Keep
            settings consistent.
          </Text>
        </View>

        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved.{"\n"}
          AI Signal Max is a product of Magic of Discoveries LLC.{"\n"}
          Visibility scores are estimated and based on publicly available data.
          Not legal advice.
        </Text>
      </Page>
    </Document>
  );
}
