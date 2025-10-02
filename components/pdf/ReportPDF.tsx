// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Circle,
} from "@react-pdf/renderer";

interface Factor {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
  date: string;
  results: Factor[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 24,
  },
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  scoreText: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginVertical: 12,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 10,
    textAlign: "justify",
  },
  factorBox: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    border: "1pt solid #E5E7EB",
    backgroundColor: "#FAFAFA",
  },
  factorName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  factorDesc: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.4,
  },
  factorStatus: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 4,
  },
  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "center",
    color: "#9CA3AF",
  },
});

// статичный круг
function DonutPDF({ score }: { score: number }) {
  const radius = 80;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (v: number) => {
    if (v < 40) return "#EF4444"; // red
    if (v < 80) return "#F59E0B"; // yellow
    return "#10B981"; // green
  };

  return (
    <View style={styles.donutContainer}>
      <Svg width="200" height="200" viewBox="0 0 200 200">
        <Circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={radius}
          cx="100"
          cy="100"
        />
        <Circle
          stroke={getColor(score)}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx="100"
          cy="100"
          transform="rotate(-90 100 100)"
        />
      </Svg>
      <Text style={styles.scoreText}>{score}%</Text>
    </View>
  );
}

export default function ReportPDF({
  url,
  mode,
  score,
  date,
  results,
}: ReportPDFProps) {
  const getConclusion = (score: number) => {
    if (score >= 80) {
      return "Your website is already well-prepared for AI platforms. Most key parameters are configured correctly, ensuring a high probability of appearing in ChatGPT, Copilot, Gemini, and other tools. Regular monitoring is still important.";
    } else if (score >= 40) {
      return "Your website is generally visible to AI platforms, but some important parameters are misconfigured or missing. In this state, visibility is limited and competitors may outrank your site. Improvements can significantly raise performance.";
    } else {
      return "Your website has serious visibility limitations for AI platforms. Critical parameters are missing or misconfigured, keeping your site invisible in AI-driven results. Fixing them is essential to unlock growth and visibility.";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Good") return "#10B981";
    if (status === "Moderate") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <Document>
      {/* Cover */}
      <Page style={styles.page}>
        <Image style={styles.logo} src="/logo.png" />
        <Text style={styles.title}>AI Website Visibility Report</Text>
        <Text style={styles.subtitle}>
          This report shows how visible your website is across AI platforms
        </Text>

        <DonutPDF score={score} />

        <View style={{ marginTop: 20 }}>
          <Text style={styles.paragraph}>Website: {url}</Text>
          <Text style={styles.paragraph}>Date: {date}</Text>
          <Text style={styles.paragraph}>Mode: {mode}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.paragraph}>{getConclusion(score)}</Text>
        </View>
      </Page>

      {/* Intro */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Introduction</Text>
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

        <Text style={styles.sectionTitle}>Key Factors Reviewed</Text>
        <Text style={styles.paragraph}>
          To calculate your site’s visibility score, we analyzed 15 key
          parameters that influence how AI platforms and search engines
          interpret your site. These range from fundamental technical settings
          to user experience details. Below you will find the status of each
          parameter and recommendations for improvement.
        </Text>
      </Page>

      {/* Factors */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Parameters Checked</Text>
        {results.map((r, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{r.name}</Text>
            <Text style={styles.factorDesc}>{r.desc}</Text>
            <Text
              style={[styles.factorStatus, { color: getStatusColor(r.status) }]}
            >
              {r.status}
            </Text>
          </View>
        ))}
      </Page>

      {/* Developer Checklist */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Developer’s Checklist</Text>
        <Text style={styles.paragraph}>
          This checklist has been prepared based on the analysis of site
          parameters that affect visibility across AI platforms (ChatGPT,
          Microsoft Copilot, Gemini, Claude, and others). It outlines the
          factors that require verification and possible correction, and serves
          as a roadmap for implementing improvements aimed at strengthening
          stability and trust.
        </Text>
        <Text style={styles.paragraph}>
          All of the parameters listed contribute to better indexing and higher
          visibility. Proper configuration builds trust and helps unlock the
          full potential of your website.
        </Text>
        {results.map((r, i) => (
          <View key={i} style={styles.factorBox}>
            <Text style={styles.factorName}>{r.name}</Text>
            <Text style={styles.factorDesc}>
              Developer should verify and adjust this parameter according to
              best practices.
            </Text>
          </View>
        ))}
      </Page>

      {/* Footer */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>Support and Contact</Text>
        <Text style={styles.paragraph}>
          If you do not currently have access to a developer, our team can
          assist in quickly improving your website’s visibility across AI
          platforms.
        </Text>
        <Text style={styles.paragraph}>
          Contact: support@aisignalmax.com
        </Text>
        <View style={styles.footer}>
          <Text>© 2025 AI Signal Max. All rights reserved.</Text>
          <Text style={{ opacity: 0.6 }}>
            AI Signal Max is a product of Magic of Discoveries LLC.
          </Text>
          <Text style={{ opacity: 0.6, marginTop: 6 }}>
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
