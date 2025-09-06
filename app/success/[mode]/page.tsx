"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

export default function SuccessPage({ params }: { params: { mode: Mode } }) {
  const mode = (params.mode as Mode) || "quick";
  const searchParams = useSearchParams();
  const url = (searchParams.get("url") || "").trim();
  const score = Number(searchParams.get("score") || 0);

  // Текстовый вывод под кольцом
  let summary = "";
  if (score >= 80) {
    summary =
      "Your website is well visible to AI platforms and appears in search results. Most key parameters are configured correctly.";
  } else if (score >= 40) {
    summary =
      "Your website is partially visible to AI platforms. Some parameters need improvements to increase overall visibility.";
  } else {
    summary =
      "Your website is poorly visible to AI platforms. Most parameters are misconfigured, which severely limits the site's visibility.";
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      <Donut score={score} mode={mode} />

      <p className="text-center text-gray-700 mt-4">{summary}</p>

      <div className="mt-8 space-y-4">
        {mode === "quick" ? (
          <>
            <ResultItem
              title="Robots.txt"
              text="This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results."
            />
            <ResultItem
              title="Sitemap.xml"
              text="This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible."
            />
            <ResultItem
              title="X-Robots-Tag"
              text="If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen."
            />
            <ResultItem
              title="Meta robots"
              text="If meta tags block a page from search, it will not appear in results and will not be found."
            />
            <ResultItem
              title="Canonical"
              text="If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings."
            />
          </>
        ) : (
          <>
            <ResultItem
              title="Robots.txt"
              text="This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results."
            />
            <ResultItem
              title="Sitemap.xml"
              text="This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible."
            />
            <ResultItem
              title="X-Robots-Tag"
              text="If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen."
            />
            <ResultItem
              title="Meta robots"
              text="If meta tags block a page from search, it will not appear in results and will not be found."
            />
            <ResultItem
              title="Canonical"
              text="If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings."
            />
            <ResultItem
              title="Title"
              text="If a page does not have a clear title, search shows random text and it is unclear why to visit the site."
            />
            <ResultItem
              title="Meta description"
              text="If a page lacks a proper description, the site looks unattractive in search and drops lower in results."
            />
            <ResultItem
              title="Open Graph"
              text="These tags make site links attractive in social media and AI answers. Without them, random text or cropped images are shown."
            />
            <ResultItem
              title="H1"
              text="If a page has no main heading, search engines and AI cannot understand its topic, and the site loses rankings."
            />
            <ResultItem
              title="Structured Data"
              text="Without structured data, AI cannot understand the site precisely, reducing visibility."
            />
            <ResultItem
              title="Mobile friendly"
              text="If a site is not mobile-friendly, AI considers it inconvenient and shows it less often."
            />
            <ResultItem
              title="HTTPS"
              text="If a site works without HTTPS, AI and search engines consider it unsafe and show it less often."
            />
            <ResultItem
              title="Alt texts"
              text="If images have no alt texts, AI does not understand them, and part of the site's information is lost."
            />
            <ResultItem
              title="Favicon"
              text="If a site has no icon, AI perceives it as incomplete and shows it less often."
            />
            <ResultItem
              title="404 page"
              text="If the error page is misconfigured, the site loses trust and visibility."
            />
          </>
        )}
      </div>

      <div className="mt-10 text-center">
        {mode === "quick" ? (
          <p className="text-gray-600">
            You can check other websites for AI visibility if you wish.
          </p>
        ) : (
          <p className="text-gray-600">
            The full website visibility audit with developer recommendations has
            been sent to your email.
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

      <p className="text-xs text-gray-400 text-center mt-4">
        Visibility scores are estimated and based on publicly available data.
        Not legal advice.
      </p>
    </div>
  );
}

function ResultItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
