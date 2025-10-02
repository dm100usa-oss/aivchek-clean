// components/pdf/ReportPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import DonutPDF from "./DonutPDF"; // ✅ default import

interface ResultItem {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

interface ReportPDFProps {
  url: string;
  mode: string;
  score: number;
  date: string;
  results: ResultItem[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 12,
    backgroundColor: "#FFFFFF",
    padding: 40,
    color: "#111827",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0F172A",
    marginVertical: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.5,
  },
  summaryBox: {
    marginVertical: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    textAlign: "center",
  },
  factorBox: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    border: "1pt solid #E5E7EB",
  },
  fact
