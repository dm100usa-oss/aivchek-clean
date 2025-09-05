// app/preview/[mode]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "quick" | "pro";

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { mode: Mode };
  searchParams: Record<string, string | undefined>;
}) {
  const mode = (params.mode as Mode) || "quick";
  const url = (searchParams?.url || "").trim();
  const status = (searchParams?.status || "ok").toLowerCase(); // "ok" | "error"
  const paid = (searchParams?.paid || "") === "1";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const emailValid =
    mode === "pro"
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      : true;

  const pay = async () => {
    const resp = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, url, email }),
    });
    const json = await resp.json();
    if (json?.url) window.location.href = json.url as string;
  };

  const back = () => router.push("/");

  // Quick (5 factors)
  const quickItems = useMemo(
    () => [
      "Robots.txt — This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
      "Sitemap.xml — This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
      "X-Robots-Tag — If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
      "Meta robots — If meta tags block a page from search, it will not appear in results and will not be found.",
      "Canonical — If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
    ],
    []
  );

  // Pro (15 factors)
  const proItems = useMemo(
    () => [
      "Robots.txt — This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
      "Sitemap.xml — This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
      "X-Robots-Tag — If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
      "Meta robots — If meta tags block a page from search, it will not appear in results and will not be found.",
      "Canonical — If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
      "Title — If a page does not have a clear title, search shows random text and it is unclear why to visit the site.",
      "Meta description — If a page lacks a proper description, the site looks unattractive in search and drops lower in results.",
      "Open Graph — These tags make site links attractive in social media and AI answers. Without them, random text or cropped images are shown.",
      "H1 — If a page has no main heading, search engines and AI cannot understand its topic, and the site loses rankings.",
      "Structured Data — Without structured data, AI cannot understand the site precisely, reducing visibility.",
      "Mobile friendly — If a site is not mobile-friendly, AI considers it inconvenient and shows it less often.",
      "HTTPS — If a site works without HTTPS, AI and search engines consider it unsafe and show it less often.",
      "Alt texts — If images have no alt texts, AI does not understand them, and part of the site’s information is lost.",
      "Favicon — If a site has no icon, AI perceives it as incomplete and shows it less often.",
      "404 page — If the error page is misconfigured, the site loses trust and visibility.",
    ],
    []
  );

  // Pay button colors
  const payButton =
    mode === "quick"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-green-600 hover:bg-green-700 text-white";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-center text-2xl font-semibold">
            {status === "ok" ? "Your result is ready" : "Scan failed"}
          </h1>

          {url && status === "ok" && (
            <div className="mb-6 text-center text-sm text-neutral-600">
              Website: {url}
            </div>
          )}

          {status === "ok" ? (
            <>
              <div className="mb-6 text-center text-base font-medium text-neutral-800">
                {mode === "quick"
                  ? "We checked 5 key factors for your website’s AI visibility:"
                  : "We checked all 15 key factors for your website’s visibility in AI search results:"}
              </div>

              <ul className="mb-6 space-y-4">
                {(mode === "quick" ? quickItems : proItems).map((t, i) => (
                  <li key={i} className="flex items-start">
                    <span
                      className={`mr-3 inline-block size-3 flex-none rounded-full ${
                        mode === "quick" ? "bg-blue-600" : "bg-green-600"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] text-neutral-800">{t}</span>
                  </li>
                ))}
              </ul>

              {mode === "pro" && !paid && (
                <div className="mb-4">
                  <label htmlFor="email" className="mb-1 block text-sm text-neutral-700">
                    Your email to receive the PDF after payment
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={[
                      "w-full rounded-md border px-3 py-2 text-sm outline-none",
                      email || !emailValid
                        ? emailValid
                          ? "border-neutral-300 focus:ring-2 focus:ring-green-500"
                          : "border-rose-400 focus:ring-2 focus:ring-rose-300"
                        : "border-neutral-300 focus:ring-2 focus:ring-green-500",
                    ].join(" ")}
                  />
                  {!emailValid && (
                    <p className="mt-1 text-xs text-rose-600">Please enter a valid email.</p>
                  )}
                </div>
              )}

              {!paid ? (
                <button
                  onClick={pay}
                  disabled={!url || (mode === "pro" && !emailValid)}
                  className={[
                    "w-full rounded-md px-4 py-3 text-base font-medium transition-colors disabled:opacity-60",
                    payButton,
                  ].join(" ")}
                >
                  Pay & Get {mode === "pro" ? "Full Report" : "Results"}
                </button>
              ) : (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-800">
                  {mode === "pro"
                    ? "Payment confirmed. Your PDF report will be sent to your email."
                    : "Payment confirmed. Your results are now unlocked."}
                </div>
              )}

              <p className="mt-6 text-center text-xs text-neutral-500">
                <span className="opacity-60">
                  Visibility scores are estimated and based on publicly available data. Not legal advice.
                </span>
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm">
              <p className="mb-4 text-lg font-medium text-amber-700">
                We couldn’t complete the scan for this URL. Please check the address and try again.
              </p>
              <button
                onClick={back}
                className="rounded-2xl bg-amber-400 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-amber-500"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-xs text-neutral-500">
          © 2025 AI Visibility Pro. All rights reserved.
          <br />
          <span className="opacity-60">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </span>
        </footer>
      </div>
    </main>
  );
}
