"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

function ResultItem({
  title,
  text,
  dotColor,
  status,
}: {
  title: string;
  text: string;
  dotColor: string;
  status: "good" | "moderate" | "poor";
}) {
  const statusStyles = {
    good: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    poor: "bg-red-100 text-red-800",
  };

  const statusLabels = {
    good: "Good",
    moderate: "Moderate",
    poor: "Poor",
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      {/* Left side: dot and text */}
      <div className="flex items-start space-x-3">
        <div className={`w-3 h-3 mt-2 rounded-full ${dotColor}`}></div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>

      {/* Right side: status badge */}
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
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

  // Summary under the donut
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

  // Quick → 5 parameters
  const quickParams = [
    {
      name: "Robots.txt",
      desc: "This file controls whether search engines and AI can see your site.",
      status: "poor",
    },
    {
      name: "Sitemap.xml",
      desc: "This is a sitemap for search engines and AI.",
      status: "moderate",
    },
    {
      name: "X-Robots-Tag",
      desc: "If headers are set incorrectly and block indexing, the site will not appear.",
      status: "poor",
    },
    {
      name: "Meta robots",
      desc: "If meta tags block a page from search, it will not appear in results.",
      status: "good",
    },
    {
      name: "Canonical",
      desc: "If the main version is not specified, AI may show duplicates or secondary sections.",
      status: "moderate",
    },
  ];

  // Pro → all 15 parameters (example statuses for now)
  const proParams = [
    ...quickParams,
    { name: "Title", desc: "If a page does not have a clear title, search shows random text.", status: "good" },
    { name: "Meta description", desc: "If missing, the site looks unattractive in search and drops lower.", status: "moderate" },
    { name: "Open Graph", desc: "These tags make site links attractive in social media and AI answers.", status: "good" },
    { name: "H1", desc: "If a page has no main heading, AI cannot understand its topic.", status: "poor" },
    { name: "Structured Data", desc: "Without structured data, AI cannot understand the site precisely.", status: "moderate" },
    { name: "Mobile friendly", desc: "If not mobile-friendly, AI shows the site less often.", status: "good" },
    { name: "HTTPS", desc: "If a site works without HTTPS, it is considered unsafe.", status: "good" },
    { name: "Alt texts", desc: "If images have no alt texts, AI does not understand them.", status: "moderate" },
    { name: "Favicon", desc: "If no icon, AI perceives the site as incomplete.", status: "good" },
    { name: "404 page", desc: "If misconfigured, the site loses trust and visibility.", status: "good" },
  ];

  const paramsList = mode === "quick" ? quickParams : proParams;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      {/* Donut chart */}
      <div className="flex justify-center mb-6">
        <Donut score={score} />
      </div>

      <p className="text-center text-gray-700 mb-8">{summary}</p>

      <div className="space-y-4">
        {paramsList.map((p, i) => (
          <ResultItem
            key={i}
            title={p.name}
            text={p.desc}
            dotColor={dotColor}
            status={p.status as "good" | "moderate" | "poor"}
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        {mode === "quick" ? (
          <p className="text-gray-600">
            You can check other websites for AI visibility if you wish.
          </p>
        ) : (
          <p className="text-gray-600 italic">
            The full website visibility audit with developer recommendations
            has been sent to your email.
          </p>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-2 rounded-2xl text-white font-semibold"
          style={{
            background: "linear-gradient(90deg, #92400e 0%, #f59e0b 100%)",
          }}
        >
          Back to Home
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Visibility scores are estimated and based on publicly available
        data. Not legal advice.
      </p>
    </main>
  );
}
