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
  const status = (searchParams?.status || "ok").toLowerCase(); // "ok" | "error"
  const router = useRouter();

  const quickFactors = [
    {
      name: "Robots.txt",
      text: "This file controls whether search engines and AI can see your site. If set incorrectly, the site may disappear from results.",
    },
    {
      name: "Sitemap.xml",
      text: "A sitemap tells AI what pages exist. If missing or incomplete, some pages stay invisible.",
    },
    {
      name: "X-Robots-Tag",
      text: "HTTP headers can block indexing. If misconfigured, your site won’t appear.",
    },
    {
      name: "Meta robots",
      text: "Meta tags control indexing. Wrong settings hide pages from results.",
    },
    {
      name: "Canonical",
      text: "Defines the main version of a page. Without it, AI may show duplicates or wrong sections.",
    },
  ];

  const proFactors = [
    { name: "Robots.txt", text: "This file controls whether search engines and AI can see your site. If set incorrectly, the site may disappear from results." },
    { name: "Sitemap.xml", text: "A sitemap tells AI what pages exist. If missing or incomplete, some pages stay invisible." },
    { name: "X-Robots-Tag", text: "HTTP headers can block indexing. If misconfigured, your site won’t appear." },
    { name: "Meta robots", text: "Meta tags control indexing. Wrong settings hide pages from results." },
    { name: "Canonical", text: "Defines the main version of a page. Without it, AI may show duplicates or wrong sections." },
    { name: "Title", text: "The page title is what users and AI see first. If missing, results look random." },
    { name: "Meta description", text: "The short description shown under the title. If missing, your site looks unattractive in results." },
    { name: "Open Graph", text: "These tags make your site look good when shared. Without them, AI shows random text or images." },
    { name: "H1", text: "The main page heading tells AI what the page is about. Without it, relevance is lost." },
    { name: "Structured Data", text: "Explains your content to AI. Missing data = worse ranking and less visibility." },
    { name: "Mobile friendly", text: "If your site isn’t optimized for phones, AI considers it less useful." },
    { name: "HTTPS", text: "A secure connection builds trust. Without it, AI may rank your site lower." },
    { name: "Alt texts", text: "Descriptions for images. Without them, AI can’t understand your visuals." },
    { name: "Favicon", text: "A small site icon. Without it, AI sees the site as incomplete." },
    { name: "404 page", text: "A proper error page tells AI missing pages are handled. Without it, trust is reduced." },
  ];

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

  const back = () => router.push("/");

  if (status === "error") {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto w-full max-w-xl">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-md text-center">
            <h1 className="mb-4 text-2xl font-semibold text-amber-800">
              Scan failed
            </h1>
            <p className="mb-6 text-sm text-amber-700">
              We couldn’t complete the scan for this URL. Please check the
              address and try again.
            </p>
            <button
              onClick={back}
              className="rounded-xl bg-amber-500 px-5 py-3 text-base font-medium text-white shadow-md hover:bg-amber-600"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-neutral-900">
            Your result is ready
          </h1>

          <div className="mb-6 text-center text-sm text-neutral-600">
            {url ? (
              <div className="truncate">Checked website: {url}</div>
            ) : (
              <div>No URL provided</div>
            )}
          </div>

          <h2 className="mb-4 text-base font-medium text-neutral-800">
            {mode === "quick"
              ? "We checked 5 key factors for your website’s AI visibility:"
              : "We checked all 15 key factors for your website’s AI visibility:"}
          </h2>

          <ul className="mb-8 space-y-5">
            {(mode === "quick" ? quickFactors : proFactors).map((f, i) => (
              <li key={i}>
                <div className="flex items-center mb-1">
                  <span
                    className={`mr-3 inline-block h-3 w-3 rounded-full ${
                      mode === "quick" ? "bg-blue-600" : "bg-green-600"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-sm text-neutral-900">
                    {f.name}
                  </span>
                </div>
                <p className="pl-6 text-sm text-neutral-700">{f.text}</p>
              </li>
            ))}
          </ul>

          {mode === "pro" && (
            <div className="mb-6">
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

          <button
            onClick={pay}
            disabled={!url || (mode === "pro" && !emailValid)}
            className={[
              "w-full rounded-xl px-5 py-3 text-base font-medium text-white shadow-md transition-colors disabled:opacity-60",
              mode === "quick"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700",
            ].join(" ")}
          >
            {mode === "pro" ? "Pay & Get Full Report" : "Pay & Get Results"}
          </button>

          <p className="mt-8 text-center text-xs text-neutral-500">
            Visibility scores are estimated and based on publicly available
            data. Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
