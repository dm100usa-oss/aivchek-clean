import { NextResponse } from "next/server";
import React from "react";
import { pdf } from "@react-pdf/renderer";
import ReportPDF from "@/components/pdf/ReportPDF";

export async function GET() {
  const testData = {
    url: "https://example.com",
    score: 85,
    date: new Date().toISOString(),
    factors: [
      {
        name: "Robots.txt",
        desc: "This file controls whether AI platforms can see your site. If misconfigured, your site may disappear from AI answers.",
        status: "Good" as const,
      },
      {
        name: "Sitemap.xml",
        desc: "The sitemap tells AI which pages exist and should be indexed. If it’s missing or broken, important pages remain invisible.",
        status: "Moderate" as const,
      },
      {
        name: "X-Robots-Tag",
        desc: "Server-side setting telling AI if your pages can appear in results. If disallowed, pages won’t show up.",
        status: "Poor" as const,
      },
      {
        name: "Meta robots",
        desc: "A tag inside the page that controls visibility. If misconfigured with a block, the page disappears from AI results.",
        status: "Good" as const,
      },
      {
        name: "Canonical",
        desc: "Tells AI which page is the main version. Without it, duplicates compete and the wrong one may show up.",
        status: "Moderate" as const,
      },
      {
        name: "Title",
        desc: "The page title is the first thing users see. Missing or duplicated titles reduce clarity and clicks.",
        status: "Good" as const,
      },
      {
        name: "Meta description",
        desc: "A short description explaining why to click. If missing or vague, AI inserts random text, reducing appeal.",
        status: "Moderate" as const,
      },
      {
        name: "Open Graph",
        desc: "Tags that make your site preview attractive in AI results and social media. Missing tags reduce trust.",
        status: "Poor" as const,
      },
      {
        name: "H1",
        desc: "The main heading shows AI and users the page topic. Missing or duplicate H1 reduces visibility.",
        status: "Good" as const,
      },
      {
        name: "Structured Data",
        desc: "JSON-LD markup tells AI if your site is about products, articles, or services. Missing data lowers visibility.",
        status: "Moderate" as const,
      },
      {
        name: "Mobile friendly",
        desc: "Most users visit on phones. If layout breaks, AI marks it as inconvenient and shows it less often.",
        status: "Moderate" as const,
      },
      {
        name: "HTTPS",
        desc: "Secure protocol. Sites without HTTPS are flagged unsafe and shown less often by AI.",
        status: "Good" as const,
      },
      {
        name: "Alt texts",
        desc: "Captions for images that help AI interpret visuals. Without them, part of your content is invisible.",
        status: "Poor" as const,
      },
      {
        name: "Favicon",
        desc: "A small site icon shown in browsers and AI previews. Without it, your site looks unfinished.",
        status: "Moderate" as const,
      },
      {
        name: "404 page",
        desc: "Custom error page tells AI a page doesn’t exist. Misconfigured 404s lower trust and visibility.",
        status: "Good" as const,
      },
    ],
  };

  // create element
  const element = React.createElement(ReportPDF, testData);

  // generate PDF buffer
  const instance: any = pdf(element as any);
  const pdfBuffer = await instance.toBuffer();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=report.pdf",
    },
  });
}
