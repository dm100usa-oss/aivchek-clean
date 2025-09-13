"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

interface Factor {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

function StatusText({ status }: { status: Factor["status"] }) {
  const colors = {
    Good: "text-green-600",
    Moderate: "text-yellow-600",
    Poor: "text-red-600",
  };
  return (
    <span className={`text-base font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}

function FactorItem({ factor }: { factor: Factor }) {
  const borderColors = {
    Good: "border-green-500",
    Moderate: "border-yellow-500",
    Poor: "border-red-500",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex items-center">
      <div className="flex items-start space-x-4 flex-1">
        <div
          className={`w-5 h-5 flex-shrink-0 rounded-full border-2 ${borderColors[factor.status]}`}
        />
        <div>
          <p className="font-semibold">{factor.name}</p>
          <p className="text-sm text-gray-600">{factor.desc}</p>
        </div>
      </div>
      <div className="w-24 text-right">
        <StatusText status={factor.status} />
      </div>
    </div>
  );
}

export default function SuccessPage({ params }: { params: { mode: Mode } }) {
  const mode = params.mode as Mode;
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 0);

  const summary =
    score >= 80
      ? "Your site is well visible for AI platforms. Most parameters are configured correctly."
      : score >= 40
      ? "Your site is partially visible for AI platforms. Some parameters require improvement."
      : "Your site is poorly visible for AI platforms. Most parameters are misconfigured, which limits visibility.";

  const allFactors: Factor[] = [
    {
      name: "Robots.txt",
      desc: "This file controls whether AI platforms can see your site. If misconfigured and blocking access, your entire website may disappear from AI answers.",
      status: "Good",
    },
    {
      name: "Sitemap.xml",
      desc: "The sitemap tells AI which pages exist and should be indexed. If it’s missing or set up incorrectly, important parts of your site remain invisible, and customers can’t find what they need.",
      status: "Moderate",
    },
    {
      name: "X-Robots-Tag",
      desc: "A server-side setting that tells AI whether your pages can appear in results. If set to disallow, those pages will not show up in AI answers.",
      status: "Poor",
    },
    {
      name: "Meta robots",
      desc: "A special tag inside the page that controls whether AI can display it. If the tag is misconfigured with a block, the page disappears from AI results.",
      status: "Good",
    },
    {
      name: "Canonical",
      desc: "A link that tells AI which page is the main version. Without it, duplicate pages compete, and AI may show the wrong one. Customers may land on secondary or outdated pages instead of the main one.",
      status: "Moderate",
    },
    {
      name: "Title",
      desc: "The title is the first thing users see in results. If it’s missing, duplicated, or too generic, AI may show random text. Customers then don’t understand what’s on the page and leave.",
      status: "Good",
    },
    {
      name: "Meta description",
      desc: "A short description under the title that explains why users should click. If missing, duplicated, or too vague, AI inserts random text, making your site look less appealing and reducing clicks.",
      status: "Moderate",
    },
    {
      name: "Open Graph",
      desc: "Special tags that make your site links look good in AI answers and social media. Without them, users see random text or cropped images, lowering trust and clicks.",
      status: "Poor",
    },
    {
      name: "H1",
      desc: "The main heading of a page tells AI and visitors what it’s about. If it’s missing or duplicated, AI cannot clearly understand the content, reducing visibility.",
      status: "Good",
    },
    {
      name: "Structured Data",
      desc: "Special markup (JSON-LD) that explains what’s on your site: product, service, article, or company. Without it, AI doesn’t fully understand your content and visibility drops.",
      status: "Moderate",
    },
    {
      name: "Mobile friendly",
      desc: "Most users visit sites on phones. If the design breaks, text is too small, or buttons don’t work, AI considers it inconvenient and shows it less often.",
      status: "Moderate",
    },
    {
      name: "HTTPS",
      desc: "A secure protocol that ensures safe connections. Sites without HTTPS are flagged as unsafe and shown less often by AI.",
      status: "Good",
    },
    {
      name: "Alt texts",
      desc: "Captions for images that help AI interpret visuals. Without alt texts, images remain invisible and part of your content is lost.",
      status: "Poor",
    },
    {
      name: "Favicon",
      desc: "A small site icon shown in browsers and sometimes in AI previews. Without it, your site looks unfinished and loses visibility.",
      status: "Moderate",
    },
    {
      name: "404 page",
      desc: "An error page that tells AI a resource doesn’t exist. If misconfigured, AI may treat broken links as valid, reducing trust and visibility.",
      status: "Good",
    },
  ];

  const factors = mode === "quick" ? allFactors.slice(0, 5) : allFactors;

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

      <div className="max-w-xl mx-auto bg-gray-50 rounded-xl shadow-sm p-6 text-center mb-10">
        <p className="text-lg font-medium text-gray-800">{summary}</p>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 text-center mt-8 mb-6">
        Parameters checked
      </h2>
      <div className="space-y-4">
        {factors.map((f, i) => (
          <FactorItem key={i} factor={f} />
        ))}
      </div>

      <div className="mt-10 text-center">
        {mode === "quick" ? (
          <>
            <p className="text-xl font-semibold text-gray-700 mb-3">
              You can check another website.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 rounded-2xl text-white"
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
              }}
            >
              Back to Home
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-2 rounded-2xl text-white"
              style={{
                background: "linear-gradient(90deg, #059669 0%, #10b981 100%)",
              }}
            >
              Back to Home
            </button>
            <p className="text-sm text-gray-600 mt-3">
              We have sent the full report and developer checklist to your email.
            </p>
          </>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Visibility scores are estimated and based on publicly available data.
        Not legal advice.
      </p>
    </main>
  );
}
