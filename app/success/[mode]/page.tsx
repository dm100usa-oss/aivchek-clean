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
  return <span className={`font-medium ${colors[status]}`}>{status}</span>;
}

function FactorItem({ factor }: { factor: Factor }) {
  const colors = {
    Good: "#10b981",
    Moderate: "#f59e0b",
    Poor: "#ef4444",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <div
          className="w-6 h-6 rounded-full drop-shadow"
          style={{ backgroundColor: colors[factor.status] }}
        />
        <div>
          <p className="font-semibold">{factor.name}</p>
          <p className="text-sm text-gray-600">{factor.desc}</p>
        </div>
      </div>
      <StatusText status={factor.status} />
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

  const factors: Factor[] =
    mode === "quick"
      ? [
          {
            name: "Robots.txt",
            desc: "This file controls if AI can see your site. If access is blocked, the site may disappear from answers.",
            status: "Good",
          },
          {
            name: "Sitemap.xml",
            desc: "A sitemap for AI. Missing or incomplete sitemaps make parts of the site invisible.",
            status: "Moderate",
          },
          {
            name: "X-Robots-Tag",
            desc: "If headers are misconfigured and block indexing, the site does not appear in AI answers.",
            status: "Poor",
          },
          {
            name: "Meta robots",
            desc: "If meta tags block a page, it will not show up in AI answers.",
            status: "Good",
          },
          {
            name: "Canonical",
            desc: "Without a proper canonical link, AI may show duplicates or secondary pages.",
            status: "Moderate",
          },
        ]
      : [
          {
            name: "Robots.txt",
            desc: "This file controls if AI can see your site. If access is blocked, the site may disappear from answers.",
            status: "Good",
          },
          {
            name: "Sitemap.xml",
            desc: "A sitemap for AI. Missing or incomplete sitemaps make parts of the site invisible.",
            status: "Moderate",
          },
          {
            name: "X-Robots-Tag",
            desc: "If headers are misconfigured and block indexing, the site does not appear in AI answers.",
            status: "Poor",
          },
          {
            name: "Meta robots",
            desc: "If meta tags block a page, it will not show up in AI answers.",
            status: "Good",
          },
          {
            name: "Canonical",
            desc: "Without a proper canonical link, AI may show duplicates or secondary pages.",
            status: "Moderate",
          },
          {
            name: "Title",
            desc: "If a page has no clear title, AI shows random text and users may ignore it.",
            status: "Good",
          },
          {
            name: "Meta description",
            desc: "If a page lacks a strong description, AI shows random or unattractive text, reducing clicks.",
            status: "Moderate",
          },
          {
            name: "Open Graph",
            desc: "These tags make links attractive in AI answers and social media. Without them, random text or cropped images appear.",
            status: "Poor",
          },
          {
            name: "H1",
            desc: "If there is no main heading, AI cannot understand the topic of the page.",
            status: "Good",
          },
          {
            name: "Structured Data",
            desc: "Without structured data, AI cannot interpret the site precisely, reducing visibility.",
            status: "Moderate",
          },
          {
            name: "Mobile friendly",
            desc: "If the site is not mobile-friendly, AI considers it inconvenient and shows it less often.",
            status: "Moderate",
          },
          {
            name: "HTTPS",
            desc: "Sites without HTTPS are considered unsafe by AI and shown less often.",
            status: "Good",
          },
          {
            name: "Alt texts",
            desc: "Without alt texts, AI does not understand images, and part of the information is lost.",
            status: "Poor",
          },
          {
            name: "Favicon",
            desc: "Without a favicon, AI sees the site as unfinished and reduces visibility.",
            status: "Moderate",
          },
          {
            name: "404 page",
            desc: "If the error page is misconfigured, AI may treat broken links as valid, reducing trust.",
            status: "Good",
          },
        ];

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
                background:
                  "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
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
                background:
                  "linear-gradient(90deg, #059669 0%, #10b981 100%)",
              }}
            >
              Back to Home
            </button>
            <p className="text-sm text-gray-600 mt-3">
              We have sent the full report and developer checklist to your
              email.
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
