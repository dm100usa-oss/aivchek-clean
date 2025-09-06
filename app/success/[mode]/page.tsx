"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

interface Factor {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

// Quick → 5 утвержденных пунктов
const QUICK_FACTORS: Factor[] = [
  {
    name: "Robots.txt",
    desc: "Controls whether search engines and AI can see your site. Misconfiguration may hide the whole website.",
    status: "Good",
  },
  {
    name: "Sitemap.xml",
    desc: "A sitemap for search engines and AI. Missing or incomplete sitemaps reduce visibility.",
    status: "Moderate",
  },
  {
    name: "X-Robots-Tag",
    desc: "If headers are misconfigured, pages may be blocked from indexing.",
    status: "Poor",
  },
  {
    name: "Meta robots",
    desc: "Meta tags can block a page from appearing in search results.",
    status: "Good",
  },
  {
    name: "Canonical",
    desc: "Defines the main version of a page. Missing canonical may cause duplicates in results.",
    status: "Moderate",
  },
];

// Pro → все 15 утвержденных пунктов
const PRO_FACTORS: Factor[] = [
  {
    name: "Robots.txt",
    desc: "This file manages access for search engines and AI. If configured incorrectly, it may block the entire site from being indexed.",
    status: "Good",
  },
  {
    name: "Sitemap.xml",
    desc: "A sitemap shows search engines which pages exist. Missing or broken sitemap leaves parts of the site invisible.",
    status: "Good",
  },
  {
    name: "X-Robots-Tag",
    desc: "Server-side headers that tell search engines and AI if pages can be indexed. Incorrect headers may hide content.",
    status: "Moderate",
  },
  {
    name: "Meta robots",
    desc: "An HTML tag controlling search indexing. Wrong settings can remove key pages from results.",
    status: "Moderate",
  },
  {
    name: "Canonical",
    desc: "Defines the preferred version of a page. Without it, duplicates may compete in results.",
    status: "Good",
  },
  {
    name: "Title",
    desc: "The page title is the first thing users see. Weak or missing titles reduce click-through.",
    status: "Good",
  },
  {
    name: "Meta description",
    desc: "A short description under the title in search results. Missing descriptions look unattractive and harm visibility.",
    status: "Moderate",
  },
  {
    name: "Open Graph",
    desc: "Tags that make links look attractive in social media and AI responses. Missing tags reduce trust.",
    status: "Poor",
  },
  {
    name: "H1",
    desc: "The main heading of the page. Without it, search engines cannot clearly understand the topic.",
    status: "Good",
  },
  {
    name: "Structured Data",
    desc: "Special markup (JSON-LD) that helps AI and search engines understand content precisely.",
    status: "Moderate",
  },
  {
    name: "Mobile friendly",
    desc: "If the site is not optimized for mobile, AI considers it inconvenient and lowers ranking.",
    status: "Moderate",
  },
  {
    name: "HTTPS",
    desc: "Secure protocol required for trust. Sites without HTTPS are marked unsafe and rank lower.",
    status: "Good",
  },
  {
    name: "Alt texts",
    desc: "Alternative texts for images. Without them, AI cannot interpret visuals.",
    status: "Poor",
  },
  {
    name: "Favicon",
    desc: "A small site icon shown in browsers and search results. Without it, the site looks unfinished.",
    status: "Moderate",
  },
  {
    name: "404 page",
    desc: "Error page that signals a missing resource. If misconfigured, search engines may treat broken links as valid.",
    status: "Good",
  },
];

function StatusBadge({ status }: { status: "Good" | "Moderate" | "Poor" }) {
  const colors = {
    Good: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Poor: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function ResultItem({ factor, dotColor }: { factor: Factor; dotColor: string }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <div className={`w-3 h-3 mt-2 rounded-full ${dotColor}`} />
        <div>
          <p className="font-semibold">{factor.name}</p>
          <p className="text-sm text-gray-600">{factor.desc}</p>
        </div>
      </div>
      <StatusBadge status={factor.status} />
    </div>
  );
}

export default function SuccessPage({ params }: { params: { mode: Mode } }) {
  const mode = params.mode as Mode;
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 60);

  const summary =
    score >= 80
      ? "Your website is well visible for AI platforms. Most key parameters are configured correctly."
      : score >= 40
      ? "Your website is partially visible for AI platforms. Some parameters need improvement to increase overall visibility."
      : "Your website is poorly visible for AI platforms. Most parameters are misconfigured, which severely limits the site's visibility.";

  const factors = mode === "quick" ? QUICK_FACTORS : PRO_FACTORS;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      <div className="flex justify-center mb-6">
        <Donut score={score} />
      </div>

      <p className="text-center text-gray-700 mb-10">{summary}</p>

      <div className="space-y-4">
        {factors.map((f, i) => (
          <ResultItem key={i} factor={f} dotColor={dotColor} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 rounded-2xl text-white"
          style={{
            background: "linear-gradient(90deg, #b45309 0%, #f59e0b 100%)",
          }}
        >
          Back to Home
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Visibility scores are estimated and based on publicly available data.
        Not legal advice.
      </p>
    </main>
  );
}
