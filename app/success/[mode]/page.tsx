"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

type Mode = "quick" | "pro";

function Donut({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "#ef4444"; // красный
  if (score >= 80) color = "#22c55e"; // зелёный
  else if (score >= 40) color = "#eab308"; // жёлтый

  return (
    <svg width="180" height="180">
      <circle
        cx="90"
        cy="90"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="15"
        fill="none"
      />
      <circle
        cx="90"
        cy="90"
        r={radius}
        stroke={color}
        strokeWidth="15"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
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
  );
}

function ResultItem({
  title,
  text,
  dotColor,
}: {
  title: string;
  text: string;
  dotColor: string;
}) {
  return (
    <div className="p-4 border rounded-lg flex items-start space-x-3">
      <div className={`w-3 h-3 mt-2 rounded-full ${dotColor}`}></div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}

export default function SuccessPage({
  params,
}: {
  params: { mode: Mode };
}) {
  const mode = params.mode as Mode;
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 56);

  let summary = "";
  if (score >= 80) {
    summary =
      "Your website is well visible for AI platforms and appears in search results. Most key parameters are configured correctly.";
  } else if (score >= 40) {
    summary =
      "Your website is partially visible for AI platforms. Some parameters need improvement to increase overall visibility.";
  } else {
    summary =
      "Your website is poorly visible for AI platforms. Most parameters are misconfigured, which severely limits the site's visibility.";
  }

  const quickParams = [
    {
      name: "Robots.txt",
      desc: "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
    },
    {
      name: "Sitemap.xml",
      desc: "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
    },
    {
      name: "X-Robots-Tag",
      desc: "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
    },
    {
      name: "Meta robots",
      desc: "If meta tags block a page from search, it will not appear in results and will not be found.",
    },
    {
      name: "Canonical",
      desc: "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
    },
  ];

  const proParams = [
    ...quickParams,
    {
      name: "Title",
      desc: "If a page does not have a clear title, search shows random text and it is unclear why to visit the site.",
    },
    {
      name: "Meta description",
      desc: "If a page lacks a proper description, the site looks unattractive in search and drops lower in results.",
    },
    {
      name: "Open Graph",
      desc: "These tags make site links attractive in social media and AI answers. Without them, random text or cropped images are shown.",
    },
    {
      name: "H1",
      desc: "If a page has no main heading, search engines and AI cannot understand its topic, and the site loses rankings.",
    },
    {
      name: "Structured Data",
      desc: "Without structured data, AI cannot understand the site precisely, reducing visibility.",
    },
    {
      name: "Mobile friendly",
      desc: "If a site is not mobile-friendly, AI considers it inconvenient and shows it less often.",
    },
    {
      name: "HTTPS",
      desc: "If a site works without HTTPS, AI and search engines consider it unsafe and show it less often.",
    },
    {
      name: "Alt texts",
      desc: "If images have no alt texts, AI does not understand them, and part of the site's information is lost.",
    },
    {
      name: "Favicon",
      desc: "If a site has no icon, AI perceives it as incomplete and shows it less often.",
    },
    {
      name: "404 page",
      desc: "If the error page is misconfigured, the site loses trust and visibility.",
    },
  ];

  const paramsList = mode === "quick" ? quickParams : proParams;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-2">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        {mode === "quick"
          ? "Your website has been analyzed. Here are the key results."
          : "Your website has been analyzed. Here are the detailed results."}
      </p>

      <div className="flex justify-center">
        <Donut score={score} />
      </div>

      <p className="text-center text-gray-700 mt-4">{summary}</p>

      <div className="mt-8 space-y-4">
        {paramsList.map((p, i) => (
          <ResultItem
            key={i}
            title={p.name}
            text={p.desc}
            dotColor={dotColor}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        {mode === "quick" ? (
          <p className="text-gray-600">
            You can check other websites for AI visibility if you wish.
          </p>
        ) : (
          <p className="text-gray-600">
            The full website visibility audit with developer recommendations has been sent to your email.
          </p>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 rounded-2xl text-white"
          style={{
            background:
              "linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)",
          }}
        >
          Back to Home
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Visibility scores are estimated and based on publicly available data. Not legal advice.
      </p>
    </main>
  );
}
