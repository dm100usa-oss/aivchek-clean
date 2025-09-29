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

// Styles for PDF
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

interface ReportPDFProps {
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
  // Determine which conclusion text to show
  let conclusionText: string[] = [];
  if (score >= 80) {
    conclusionText = [
      "Your website is already well-prepared for AI platforms. Most of the key parameters are configured correctly, which ensures a high probability of appearing in results from ChatGPT, Copilot, Gemini, and other tools. This means that search and AI systems recognize your site as a reliable and user-friendly source of information.",
      "However, even with high visibility, certain technical details require regular monitoring. Small errors or outdated settings can gradually reduce your performance. That is why it is important to continue periodic checks—at least every few months—to preserve and strengthen your results."
    ];
  } else if (score >= 40) {
    conclusionText = [
      "Your website is generally visible to AI platforms, but some important parameters are misconfigured or require improvement. In its current state, the site may appear in AI results, but with limited trust and often ranked below competitors. This reduces the number of visitors and lowers your share of visibility.",
      "This situation is not critical. By carefully following the recommendations, visibility can be significantly improved. Many companies achieve their strongest growth in traffic and inquiries precisely at this stage, once corrections are made."
    ];
  } else {
    conclusionText = [
      "At present, your website has serious visibility limitations for AI platforms. Several critical parameters are misconfigured or missing entirely. This means your site remains invisible to ChatGPT, Copilot, Gemini, and other systems—potential customers simply do not find you where they are searching.",
      "A low visibility score indicates systemic issues. Fixing them requires a comprehensive approach, but it also unlocks new opportunities to reach audiences and position your business in the digital environment. Without addressing these problems, your site will continue to lose ground to competitors."
    ];
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo and Title */}
        <Image style={styles.logo} src={logoSrc} />
        <Text style={styles.title}>AI Signal Max</Text>
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>{websiteUrl}</Text>
        <Text style={styles.subtitle}>Date: {date}</Text>
        <Text style={[styles.subtitle, { marginBottom: 20 }]}>
          Visibility Score: {score}%
        </Text>

        {/* Conclusion */}
        <View style={styles.section}>
          <Text style={styles.heading}>Conclusion</Text>
          {conclusionText.map((p, i) => (
            <Text key={i} style={styles.text}>
              {p}
            </Text>
          ))}
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.heading}>Introduction</Text>
          <Text style={styles.text}>
            This report has been prepared for the website owner. It shows the
            current condition of your site in terms of visibility across AI
            platforms and explains which factors have the greatest impact.
          </Text>
          <Text style={styles.text}>
            The results are summarized first, followed by detailed explanations
            and recommendations. The final section of this report contains a
            developer’s checklist that can be handed over directly for
            implementation.
          </Text>
        </View>

        {/* Key Factors */}
        <View style={styles.section}>
          <Text style={styles.heading}>Key Factors Reviewed</Text>
          <Text style={styles.text}>
            To calculate your site’s visibility score, we analyzed 15 key
            parameters that influence how AI platforms and search engines
            interpret your site. These range from fundamental technical settings
            to user experience details. Below, you will find the status of each
            parameter and recommendations for improvement. Together, they form
            the foundation of your site’s final visibility percentage. A
            developer’s checklist is attached at the end of this report.
          </Text>
        </View>

        {/* Factors */}
        {factors.map((factor, idx) => (
          <View style={styles.factorBlock} key={idx}>
            <Text style={styles.factorTitle}>
              {idx + 1}. {factor.title}
            </Text>
            <Text style={styles.text}>{factor.description}</Text>
          </View>
        ))}

        {/* Developer’s Checklist */}
        <View style={styles.section}>
          <Text style={styles.heading}>Developer’s Checklist</Text>
          <Text style={styles.text}>{checklist}</Text>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.heading}>Support</Text>
          <Text style={styles.text}>
            AI Signal Max Support. If you do not currently have access to a
            developer, our team can assist in quickly improving your website’s
            visibility across AI platforms.
          </Text>
          <Text style={styles.text}>Contact: support@aisignalmax.com</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © 2025 AI Signal Max. All rights reserved. AI Signal Max is a product
          of Magic of Discoveries LLC.
        </Text>
      </Page>
    </Document>
  );
};

export default ReportPDF;
