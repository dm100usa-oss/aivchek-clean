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

  const color =
    mode === "quick"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : "bg-green-600 hover:bg-green-700 text-white";
  const dot = mode === "quick" ? "bg-blue-600" : "bg-green-600";

  // Approved parameters
  const quickItems = [
    "Robots.txt — This file controls whether search engines and AI can see your site. If set incorrectly, the site may completely disappear from search and AI results.",
    "Sitemap.xml — A sitemap for search engines and AI. If missing or incomplete, some pages won’t appear in search or be visible to AI.",
    "X-Robots-Tag — If headers are set incorrectly and block indexing, the site won’t appear in search or AI results.",
    "Meta robots — If meta tags block a page from search, it won’t appear in results or be found.",
    "Canonical — If the main version of a page isn’t specified, AI may show duplicates or secondary pages, leading to inaccurate results.",
  ];

  const proItems = [
    ...quickItems,
    "Title — If a page lacks a clear title, search shows random text, and users don’t know why to visit.",
    "Meta description — Without a proper description, the site looks unattractive in search and ranks lower.",
    "Open Graph — These tags make links appealing in social media and AI results. Without them, random text or cut images are shown.",
    "H1 — If a page has no main heading, search engines and AI don’t understand its topic, lowering its rank.",
    "Structured Data — Without structured data, AI doesn’t understand the site precisely, reducing visibility.",
    "Mobile friendly — If the site isn’t mobile-friendly, AI considers it inconvenient and shows it less often.",
    "HTTPS — If the site isn’t secure (https), search engines and AI consider it unsafe and show it less often.",
    "Alt texts — Without image captions, AI can’t interpret them, and part of the site’s information is lost.",
    "Favicon — Without a favicon, AI sees the site as incomplete and ranks it lower.",
    "404 page — If the error page doesn’t work correctly, the site loses visibility in search and AI.",
  ];

  const items = useMemo(() => (mode === "quick" ? quickItems : proItems), [mode]);

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

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            {status === "ok" ? "Your result is ready" : "Scan failed"}
          </h1>

          <div className="mb-6 text-center text-sm text-neutral-600">
            {url ? <div className="truncate">Checked website: {url}</div> : <div>URL is missing</div>}
          </div>

          {status === "ok" ? (
            <>
              <ul className="mb-6 space-y-3">
                {items.map((t, i) => (
                  <li key={i} className="flex items-start">
                    <span
                      className={`mr-3 mt-1 inline-block h-3 w-3 rounded-full bg-neutral-400`}
                      aria-hidden="true"
                    />
                    <span className="text-[15px]">{t}</span>
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
                    <p className="mt-1 text-xs text-rose-600">
                      Please enter your email to continue.
                    </p>
                  )}
                </div>
              )}

              {!paid ? (
                <button
                  onClick={pay}
                  disabled={!url || (mode === "pro" && !emailValid)}
                  className={[
                    "w-full rounded-md px-4 py-3 text-base font-medium transition-colors disabled:opacity-60",
                    color,
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
            </>
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              We couldn’t analyze this website. Please check the address and try again.
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              onClick={back}
              className="rounded-md bg-amber-500 px-4 py-2 text-sm text-white hover:bg-amber-600"
            >
              Back to Home
            </button>
          </div>
        </div>

        <footer className="mt-8 text-center text-xs text-neutral-500">
          <span className="opacity-60">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </span>
        </footer>
      </div>
    </main>
  );
}
