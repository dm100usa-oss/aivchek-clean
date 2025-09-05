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
      ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md"
      : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-md";

  const dot = mode === "quick" ? "bg-blue-600" : "bg-green-600";

  const items = useMemo(
    () =>
      mode === "quick"
        ? [
            "Robots.txt — Controls if search engines and AI can access your site.",
            "Sitemap.xml — Shows search engines and AI which pages to index.",
            "X-Robots-Tag — Controls indexing via HTTP headers.",
            "Meta robots — Controls indexing via meta tags on each page.",
            "Canonical — Defines the main version of a page to avoid duplicates.",
          ]
        : [
            "Robots.txt — Controls if search engines and AI can access your site.",
            "Sitemap.xml — Shows search engines and AI which pages to index.",
            "X-Robots-Tag — Controls indexing via HTTP headers.",
            "Meta robots — Controls indexing via meta tags on each page.",
            "Canonical — Defines the main version of a page to avoid duplicates.",
            "Title — Defines the title users and AI see in results.",
            "Meta description — Provides a short description in search results.",
            "Open Graph — Controls how links appear in social media and AI.",
            "H1 — Defines the main heading of the page.",
            "Structured Data — Helps AI understand site content precisely.",
            "Mobile friendly — Ensures the site is usable on phones.",
            "HTTPS — Provides secure connection and trust.",
            "Alt texts — Describes images for AI and search engines.",
            "Favicon — Small icon that represents your site in results.",
            "404 page — Handles missing pages correctly for AI and search.",
          ],
    [mode]
  );

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
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-semibold text-neutral-800">
            {status === "ok" ? "Your result is ready" : "Scan failed"}
          </h1>

          <div className="mb-6 text-center text-sm text-neutral-600">
            {url ? (
              <div className="truncate">
                Checked website:{" "}
                <span className="font-medium text-neutral-800">{url}</span>
              </div>
            ) : (
              <div>URL is missing</div>
            )}
          </div>

          {status === "ok" ? (
            <>
              <ul className="mb-6 space-y-3">
                {items.map((t, i) => (
                  <li key={i} className="flex items-start">
                    <span
                      className={`mr-3 mt-1 inline-block h-3 w-3 rounded-full ${dot}`}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-snug text-neutral-700">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              {mode === "pro" && !paid && (
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-neutral-700"
                  >
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
                      Please enter a valid email.
                    </p>
                  )}
                </div>
              )}

              {!paid ? (
                <button
                  onClick={pay}
                  disabled={!url || (mode === "pro" && !emailValid)}
                  className={[
                    "w-full rounded-lg px-5 py-3 text-base font-medium transition-transform duration-150 ease-in-out disabled:opacity-60",
                    color,
                  ].join(" ")}
                >
                  {mode === "pro" ? "Pay & Get Full Report" : "Pay & Get Results"}
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
                  Visibility scores are estimated and based on publicly
                  available data. Not legal advice.
                </span>
              </p>
            </>
          ) : (
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
              We couldn’t analyze this website. Please check the address and try
              again.
            </div>
          )}

          {status === "error" && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={back}
                className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-2 text-sm font-medium text-white shadow-sm hover:from-amber-600 hover:to-amber-500"
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
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </span>
        </footer>
      </div>
    </main>
  );
}
