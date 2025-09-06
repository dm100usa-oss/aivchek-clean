"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

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

  // Короткие выводы под кругом
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

  // Quick → 5 параметров
  const quickParams = [
    {
      name: "Robots.txt",
      desc: "This file controls whether search engines and AI can see your site.",
    },
    {
      name: "Sitemap.xml",
      desc: "This is a sitemap for search engines and AI.",
    },
    {
      name: "X-Robots-Tag",
      desc: "If headers are set incorrectly and block indexing, the site will not appear.",
    },
    {
      name: "Meta robots",
      desc: "If meta tags block a page from search, it will not appear in results.",
    },
    {
      name: "Canonical",
      desc: "If the main version is not specified, AI may show duplicates or secondary sections.",
    },
  ];

  // Pro → все 15 параметров
  const proParams = [
    ...quickParams,
    {
      name: "Title",
      desc: "If a page does not have a clear title, search shows random text.",
    },
    {
      name: "Meta description",
      desc: "If missing, the site looks unattractive in search and drops lower.",
    },
    {
      name: "Open Graph",
      desc: "These tags make site links attractive in social media and AI answers.",
    },
    {
      name: "H1",
      desc: "If a page has no main heading, AI cannot understand its topic.",
    },
    {
      name: "Structured Data",
      desc: "Without structured data, AI cannot understand the site precisely.",
    },
    {
      name: "Mobile friendly",
      desc: "If not mobile-friendly, AI shows the site less often.",
    },
    {
      name: "HTTPS",
      desc: "If a site works without HTTPS, it is considered unsafe.",
    },
    {
      name: "Alt texts",
      desc: "If images have no alt texts, AI does not understand them.",
    },
    {
      name: "Favicon",
      desc: "If no icon, AI perceives the site as incomplete.",
    },
    {
      name: "404 page",
      desc: "If misconfigured, the site loses trust and visibility.",
    },
  ];

  const paramsList = mode === "quick" ? quickParams : proParams;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      <Donut score={score} />

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
            The full website visibility audit with developer recommendations
            has been sent to your email.
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
        Visibility scores are estimated and based on publicly available
        data. Not legal advice.
      </p>
    </main>
  );
}
