import { NextResponse } from "next/server";
import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  // test data for preview at /api/pdf
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString(),
    factors: [
      { name: "Robots.txt", status: "Good", recommendation: "Configured correctly." },
      { name: "Sitemap.xml", status: "Moderate", recommendation: "Add missing pages to sitemap." },
      { name: "X-Robots-Tag", status: "Poor", recommendation: "Fix server header to allow crawling." },
      { name: "Meta robots", status: "Good", recommendation: "Tag present and configured correctly." },
      { name: "Canonical", status: "Moderate", recommendation: "Check duplicate pages and add canonical link." },
      { name: "Title", status: "Good", recommendation: "Well optimized." },
      { name: "Meta description", status: "Moderate", recommendation: "Improve clarity and uniqueness." },
      { name: "Open Graph", status: "Poor", recommendation: "Add OG tags for better previews." },
      { name: "H1", status: "Good", recommendation: "Main heading present." },
      { name: "Structured Data", status: "Moderate", recommendation: "Add JSON-LD schema for products or services." },
      { name: "Mobile friendly", status: "Moderate", recommendation: "Optimize layout for smaller screens." },
      { name: "HTTPS", status: "Good", recommendation: "Secure connection enabled." },
      { name: "Alt texts", status: "Poor", recommendation: "Add descriptive alt texts for images." },
      { name: "Favicon", status: "Moderate", recommendation: "Add or update favicon for brand consistency." },
      { name: "404 page", status: "Good", recommendation: "Custom error page works correctly." },
    ],
  };

  // create React element with correct props
  const element = React.createElement(ReportPDF, testData);

  // render PDF to buffer
  const pdfBuffer = await renderToBuffer(element);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
