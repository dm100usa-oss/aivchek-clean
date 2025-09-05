"use client";

import { useState } from "react";
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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const emailValid =
    mode === "pro" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) : true;

  const pay = async () => {
    const resp = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, url, email }),
    });
    const json = await resp.json();
    if (json?.url) window.location.href = json.url as string;
  };

  const factorsQuick = [
    "Robots.txt",
    "Sitemap.xml",
    "X-Robots-Tag",
    "Meta robots",
    "Canonical",
  ];

  const factorsPro = [
    "Robots.txt",
    "Sitemap.xml",
    "X-Robots-Tag",
    "Meta robots",
    "Canonical",
    "Title",
    "Meta description",
    "Open Graph",
    "H1",
    "Structured Data",
    "Mobile friendly",
    "HTTPS",
    "Alt texts",
    "Favicon",
    "404 page",
  ];

  const color =
    mode === "quick"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";

  const dot =
    mode === "quick"
      ? "bg-blue-500"
      : "bg-green-500";

  const heading =
    "Your result is ready";

  const subheading =
    mode === "quick"
      ? "We checked 5 key factors for your website’s AI visibility:"
      : "We checked all 15 key factors for your website’s visibility in AI search results:";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-md">
          {/* Title */}
          <h1 className="mb-6 text-center text-2xl font-semibold text-neutral-900">
            {heading}
          </h1>

          {/* Website URL */}
          <div className="mb-6 text-center text-sm text-neutral-600">
            {url ? (
              <div className="truncate">Checked website: {url}</div>
            ) : (
              <div>No URL provided</div>
            )}
          </div>

          {/* Subheading */}
          <h2 className="mb-4 text-base font-medium text-neutral-800">
            {subheading}
          </h2>

          {/* List of factors */}
          <ul className="mb-8 space-y-3">
            {(mode === "quick" ? factorsQuick : factorsPro).map((item, i) => (
              <li key={i} className="flex items-center">
                <span
                  className={`mr-3 inline-block h-3 w-3 rounded-full ${dot}`}
                  aria-hidden="true"
                />
                <span className="text-sm text-neutral-800">{item}</span>
              </li>
            ))}
          </ul>

          {/* Email field for Pro */}
          {mode === "pro" && (
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-700"
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
                  email
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

          {/* Payment button */}
          <button
            onClick={pay}
            disabled={!url || (mode === "pro" && !emailValid)}
            className={[
              "w-full rounded-xl px-5 py-3 text-base font-medium text-white transition-colors disabled:opacity-60 shadow-md",
              color,
            ].join(" ")}
          >
            {mode === "pro" ? "Pay & Get Full Report" : "Pay & Get Results"}
          </button>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-xs text-neutral-500">
            Visibility scores are estimated and based on publicly available data.
            Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
