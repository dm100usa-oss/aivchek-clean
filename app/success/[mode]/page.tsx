"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

function ResultItem({
  title,
  text,
  dotColor,
  statusColor,
}: {
  title: string;
  text: string;
  dotColor: string;
  statusColor: string;
}) {
  return (
    <div className="p-4 border rounded-lg flex items-start space-x-3 shadow-sm bg-white">
      <div className={`w-3 h-3 mt-2 rounded-full ${dotColor}`}></div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-700 mt-1">{text}</p>
      </div>
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}
      >
        Status
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

  // Короткий вывод
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

  // Утверждённые тексты (короткие и длинные)
  const shortParams = [
    {
      name: "Robots.txt",
      desc: "This file controls whether search engines and AI can see your site. If misconfigured and access is blocked, the site may completely disappear from search and AI answers.",
    },
    {
      name: "Sitemap.xml",
      desc: "This is a sitemap for search engines and AI. Without it or if incomplete, some pages will not appear in search.",
    },
    {
      name: "X-Robots-Tag",
      desc: "If headers are set incorrectly and block indexing, the site will not appear in search and AI results.",
    },
    {
      name: "Meta robots",
      desc: "If meta tags block a page, it will not appear in search results.",
    },
    {
      name: "Canonical",
      desc: "If the main version is not specified, AI may show duplicates or secondary sections.",
    },
  ];

  const longParams = [
    {
      name: "Robots.txt",
      desc: "This file defines whether search engines and AI can index your site. If it is misconfigured and access is blocked, the site may completely disappear from search and AI answers. This is critical for indexing: even one mistake in configuration can lead to a full loss of visibility.",
    },
    {
      name: "Sitemap.xml",
      desc: "The sitemap shows search engines and AI which pages exist and what is important to index. Without it or if it is set up incorrectly, some pages remain invisible. As a result, clients cannot find important sections.",
    },
    // ...добавить все остальные длинные версии (Title, Meta description и т.д.)
  ];

  const paramsList = mode === "quick" ? shortParams : longParams;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      <Donut score={score} />

      <div className="bg-gray-50 p-4 rounded-lg mt-6 shadow-sm">
        <p className="text-center text-gray-800 font-medium">{summary}</p>
      </div>

      <div className="mt-8 space-y-4">
        {paramsList.map((p, i) => (
          <ResultItem
            key={i}
            title={p.name}
            text={p.desc}
            dotColor={dotColor}
            statusColor="bg-gray-200 text-gray-600"
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
            The full website visibility audit with developer recommendations
            has been sent to your email.
          </p>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 rounded-2xl text-white font-medium shadow-md transition"
          style={{
            background:
              mode === "quick"
                ? "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)"
                : "linear-gradient(90deg, #065f46 0%, #10b981 100%)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              mode === "quick"
                ? "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)"
                : "linear-gradient(90deg, #064e3b 0%, #059669 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              mode === "quick"
                ? "linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)"
                : "linear-gradient(90deg, #065f46 0%, #10b981 100%)")
          }
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
