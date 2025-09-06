"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessQuickPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const score = parseInt(searchParams.get("score") || "0", 10);

  let interpretation = "";
  if (score >= 80) interpretation = "Your site is well visible to AI platforms and appears in search results.";
  else if (score >= 40) interpretation = "Your site is partially visible to AI platforms. Some data is missing in search results.";
  else interpretation = "Your site is poorly visible to AI platforms. Most key information is hidden from search.";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Website visibility results
          </h1>

          {url && (
            <div className="mb-6 text-center text-sm text-neutral-600">
              Website: {url}
            </div>
          )}

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-blue-600 text-3xl font-bold text-neutral-800">
              {score}%
            </div>
            <p className="text-sm text-neutral-700">{interpretation}</p>
          </div>

          <div className="mb-6 text-center text-base font-medium text-neutral-800">
            We checked 5 key factors for your website’s AI visibility:
          </div>

          <ul className="mb-6 space-y-4">
            <li className="flex items-start">
              <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600" />
              <span>
                <strong>Robots.txt</strong> — This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600" />
              <span>
                <strong>Sitemap.xml</strong> — This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600" />
              <span>
                <strong>X-Robots-Tag</strong> — If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600" />
              <span>
                <strong>Meta robots</strong> — If meta tags block a page from search, it will not appear in results and will not be found.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-blue-600" />
              <span>
                <strong>Canonical</strong> — If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.
              </span>
            </li>
          </ul>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
