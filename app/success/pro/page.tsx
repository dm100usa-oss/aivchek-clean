"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessProPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const score = parseInt(searchParams.get("score") || "0", 10);

  let interpretation = "";
  if (score >= 80) interpretation = "Your site is well visible to AI platforms and most factors are set correctly.";
  else if (score >= 40) interpretation = "Your site is partially visible to AI platforms. Some factors need improvement.";
  else interpretation = "Your site is poorly visible to AI platforms. Most factors do not meet requirements.";

  const items = [
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
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Full website visibility audit
          </h1>

          {url && (
            <div className="mb-6 text-center text-sm text-neutral-600">
              Website: {url}
            </div>
          )}

          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-600 text-3xl font-bold text-neutral-800">
              {score}%
            </div>
            <p className="text-sm text-neutral-700">{interpretation}</p>
          </div>

          <div className="mb-6 text-center text-base font-medium text-neutral-800">
            We checked all 15 key factors for your website’s AI visibility:
          </div>

          <ul className="mb-6 space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-green-600" />
                <span>
                  <strong>{item.name}</strong> — {item.text}
                </span>
              </li>
            ))}
          </ul>

          <p className="mb-6 text-center text-sm text-neutral-700">
            The full website visibility audit with developer recommendations has been sent to your email.
          </p>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
