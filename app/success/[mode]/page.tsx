// app/success/[mode]/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

type Mode = "quick" | "pro";

const shortTexts: Record<string, string> = {
  robots: "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
  sitemap: "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
  xrobots: "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
  metarobots: "If meta tags block a page from search, it will not appear in results and will not be found.",
  canonical: "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
};

const longTexts: Record<string, string> = {
  robots: "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
  sitemap: "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
  xrobots: "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
  metarobots: "If meta tags block a page from search, it will not appear in results and will not be found.",
  canonical: "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
  title: "If a page does not have a clear title, search shows random text and it is unclear why to visit the site.",
  metadesc: "If a page lacks a proper description, the site looks unattractive in search and drops lower in results.",
  opengraph: "These tags make site links attractive in social media and AI answers. Without them, random text or cropped images are shown.",
  h1: "If a page has no main heading, search engines and AI cannot understand its topic, and the site loses rankings.",
  structured: "Without structured data, AI cannot understand the site precisely, reducing visibility.",
  mobile: "If a site is not mobile-friendly, AI considers it inconvenient and shows it less often.",
  https: "If a site works without HTTPS, AI and search engines consider it unsafe and show it less often.",
  alt: "If images have no alt texts, AI does not understand them, and part of the site's information is lost.",
  favicon: "If a site has no icon, AI perceives it as incomplete and shows it less often.",
  page404: "If the error page is misconfigured, the site loses trust and visibility.",
};

function getColor(score: number) {
  if (score >= 80) return { start: "#22c55e", end: "#16a34a" }; // green
  if (score >= 40) return { start: "#facc15", end: "#eab308" }; // yellow
  return { start: "#ef4444", end: "#dc2626" }; // red
}

function getSummary(score: number) {
  if (score >= 80)
    return "Your website is highly visible to AI platforms and appears in search results. Most key parameters are configured correctly.";
  if (score >= 40)
    return "Your website is partially visible to AI platforms. Some parameters need improvement to increase overall visibility.";
  return "Your website is poorly visible to AI platforms. Most parameters are misconfigured, which severely limits the site's visibility.";
}

export default function SuccessPage({
  params,
}: {
  params: { mode: Mode };
}) {
  const searchParams = useSearchParams();
  const mode = params.mode as Mode;
  const score = Number(searchParams.get("score") || 0);

  const color = getColor(score);

  const factors =
    mode === "quick"
      ? [
          { key: "robots", label: "Robots.txt" },
          { key: "sitemap", label: "Sitemap.xml" },
          { key: "xrobots", label: "X-Robots-Tag" },
          { key: "metarobots", label: "Meta robots" },
          { key: "canonical", label: "Canonical" },
        ]
      : [
          { key: "robots", label: "Robots.txt" },
          { key: "sitemap", label: "Sitemap.xml" },
          { key: "xrobots", label: "X-Robots-Tag" },
          { key: "metarobots", label: "Meta robots" },
          { key: "canonical", label: "Canonical" },
          { key: "title", label: "Title" },
          { key: "metadesc", label: "Meta description" },
          { key: "opengraph", label: "Open Graph" },
          { key: "h1", label: "H1" },
          { key: "structured", label: "Structured Data" },
          { key: "mobile", label: "Mobile friendly" },
          { key: "https", label: "HTTPS" },
          { key: "alt", label: "Alt texts" },
          { key: "favicon", label: "Favicon" },
          { key: "page404", label: "404 page" },
        ];

  const bulletColor =
    mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <div className="min-h-screen bg-white py-10 px-4 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-2">
          {mode === "quick"
            ? "Website visibility results"
            : "Full website visibility audit"}
        </h1>
        <p className="text-gray-600 mb-8">
          {mode === "quick"
            ? "Your website has been analyzed. Here are the key results."
            : "Your website has been analyzed. Here are the detailed results."}
        </p>

        {/* Donut */}
        <div className="flex flex-col items-center mb-6">
          <svg className="w-40 h-40">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color.start} />
                <stop offset="100%" stopColor={color.end} />
              </linearGradient>
            </defs>
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="15"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#grad)"
              strokeWidth="15"
              fill="none"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={
                2 * Math.PI * 70 * (1 - score / 100)
              }
              strokeLinecap="round"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy=".3em"
              className="text-3xl font-bold fill-gray-800"
            >
              {score}%
            </text>
          </svg>
          <p className="mt-4 text-center text-gray-700 max-w-xl">
            {getSummary(score)}
          </p>
        </div>

        {/* Factors */}
        <div className="space-y-4 mb-8">
          {factors.map((f) => (
            <div
              key={f.key}
              className="p-4 border rounded-lg shadow-sm flex"
            >
              <div
                className={`w-3 h-3 rounded-full mt-2 mr-3 ${bulletColor}`}
              ></div>
              <div>
                <p className="font-semibold">
                  {f.label}
                </p>
                <p className="text-gray-700 text-sm">
                  {mode === "quick"
                    ? shortTexts[f.key]
                    : longTexts[f.key]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra note */}
        <p className="text-gray-700 mb-6">
          {mode === "quick"
            ? "You can check other websites for AI visibility if you wish."
            : "The full website visibility audit with developer recommendations has been sent to your email."}
        </p>

        {/* Back button */}
        <button className="bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold px-6 py-3 rounded-2xl shadow hover:from-amber-600 hover:to-amber-500">
          Back to Home
        </button>

        {/* Disclaimer */}
        <p className="text-gray-500 text-xs mt-6">
          Visibility scores are estimated and based on publicly
          available data. Not legal advice.
        </p>
      </div>
    </div>
  );
}
