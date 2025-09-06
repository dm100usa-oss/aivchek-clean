// app/success/[mode]/page.tsx
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type Mode = "quick" | "pro";

export default function SuccessPage({ params }: { params: { mode: Mode } }) {
  const { mode } = params;
  const searchParams = useSearchParams();
  const url = (searchParams.get("url") || "").trim();
  const score = parseInt(searchParams.get("score") || "73", 10); // временно фиксированный %
  
  // Quick (5 factors, short explanations)
  const quickItems = useMemo(
    () => [
      {
        name: "Robots.txt",
        text: "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
      },
      {
        name: "Sitemap.xml",
        text: "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
      },
      {
        name: "X-Robots-Tag",
        text: "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
      },
      {
        name: "Meta robots",
        text: "If meta tags block a page from search, it will not appear in results and will not be found.",
      },
      {
        name: "Canonical",
        text: "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
      },
    ],
    []
  );

  // Pro (15 factors, full explanations)
  const proItems = useMemo(
    () => [
      { name: "Robots.txt", text: "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results." },
      { name: "Sitemap.xml", text: "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible." },
      { name: "X-Robots-Tag", text: "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen." },
      { name: "Meta robots", text: "If meta tags block a page from search, it will not appear in results and will not be found." },
      { name: "Canonical", text: "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings." },
      { name: "Title", text: "If a page does not have a clear title, search shows random text and it is unclear why to visit the site." },
      { name: "Meta description", text: "If a page lacks a proper description, the site looks unattractive in search and drops lower in results." },
      { name: "Open Graph", text: "These tags make site links attractive in social media and AI answers. Without them, random text or cropped images are shown." },
      { name: "H1", text: "If a page has no main heading, search engines and AI cannot understand its topic, and the site loses rankings." },
      { name: "Structured Data", text: "Without structured data, AI cannot understand the site precisely, reducing visibility." },
      { name: "Mobile friendly", text: "If a site is not mobile-friendly, AI considers it inconvenient and shows it less often." },
      { name: "HTTPS", text: "If a site works without HTTPS, AI and search engines consider it unsafe and show it less often." },
      { name: "Alt texts", text: "If images have no alt texts, AI does not understand them, and part of the site’s information is lost." },
      { name: "Favicon", text: "If a site has no icon, AI perceives it as incomplete and shows it less often." },
      { name: "404 page", text: "If the error page is misconfigured, the site loses trust and visibility." },
    ],
    []
  );

  const items = mode === "quick" ? quickItems : proItems;

  const circleColor =
    score >= 80 ? "text-green-600" : score >= 40 ? "text-yellow-500" : "text-red-500";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="mb-4 text-center text-2xl font-semibold">
            Website visibility results
          </h1>

          {url && (
            <div className="mb-6 text-center text-sm text-neutral-600">
              Website: {url}
            </div>
          )}

          <div className="mb-6 text-center">
            <div
              className={`mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 ${circleColor}`}
            >
              <span className="text-3xl font-bold">{score}%</span>
            </div>
            <p className="text-base font-medium text-neutral-800">
              {mode === "quick"
                ? "We checked 5 key factors for your website’s AI visibility:"
                : "We checked all 15 key factors for your website’s AI visibility:"}
            </p>
          </div>

          <ul className="mb-6 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start">
                <span
                  className={`mr-3 mt-1 inline-block size-3 flex-none rounded-full ${
                    mode === "quick" ? "bg-blue-600" : "bg-green-600"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[15px] text-neutral-800">
                  <span className="font-semibold">{item.name}</span> — {item.text}
                </span>
              </li>
            ))}
          </ul>

          {mode === "pro" && (
            <div className="mt-6 text-center text-sm text-neutral-700">
              The full website visibility audit with developer recommendations has been
              sent to your email.
            </div>
          )}

          <p className="mt-6 text-center text-xs text-neutral-500">
            <span className="opacity-60">
              Visibility scores are estimated and based on publicly available data. Not legal advice.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
