// app/preview/[mode]/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Mode = "quick" | "pro";

function Dots() {
  return (
    <span className="inline-flex w-[1.7ch] justify-start tabular-nums align-middle">
      <span className="dot">.</span>
      <span className="dot dot2">.</span>
      <span className="dot dot3">.</span>
      <style jsx>{`
        .dot {
          opacity: 0.2;
          animation: aiv-dots 1200ms infinite;
        }
        .dot2 {
          animation-delay: 200ms;
        }
        .dot3 {
          animation-delay: 400ms;
        }
        @keyframes aiv-dots {
          0% {
            opacity: 0.2;
          }
          30% {
            opacity: 1;
          }
          60% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </span>
  );
}

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
  const [loading, setLoading] = useState(false);

  const emailValid =
    mode === "pro"
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      : true;

  const pay = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, url, email }),
      });
      const json = await resp.json();
      if (json?.url) window.location.href = json.url as string;
    } finally {
      setLoading(false);
    }
  };

  // Redirect to /scan-failed if error
  useEffect(() => {
    if (status === "error") {
      router.push("/scan-failed");
    }
  }, [status, router]);

  // Quick (5 factors)
  const quickItems = useMemo(
    () => [
      {
        name: "Robots.txt",
        text: "Controls whether your site is visible to AI. If blocked, the site may disappear from AI results.",
      },
      {
        name: "Sitemap.xml",
        text: "The sitemap shows AI which pages exist. If missing or incomplete, some pages remain invisible.",
      },
      {
        name: "X-Robots-Tag",
        text: "If headers are misconfigured and block indexing, the site won’t appear in AI answers.",
      },
      {
        name: "Meta robots",
        text: "If meta tags block a page, it won’t be shown to users.",
      },
      {
        name: "Canonical",
        text: "Indicates which page is the main one. Without it, duplicates may be shown instead.",
      },
    ],
    []
  );

  // Pro (15 factors, includes all in correct order)
  const proItems = useMemo(
    () => [
      {
        name: "Robots.txt",
        text: "Controls whether your site is visible to AI. If blocked, the site may disappear from AI results.",
      },
      {
        name: "Sitemap.xml",
        text: "The sitemap shows AI which pages exist. If missing or incomplete, some pages remain invisible.",
      },
      {
        name: "X-Robots-Tag",
        text: "If headers are misconfigured and block indexing, the site won’t appear in AI answers.",
      },
      {
        name: "Meta robots",
        text: "If meta tags block a page, it won’t be shown to users.",
      },
      {
        name: "Canonical",
        text: "Indicates which page is the main one. Without it, duplicates may be shown instead.",
      },
      {
        name: "Title",
        text: "If a page has no clear title, AI shows random text and users don’t understand why they should click.",
      },
      {
        name: "Meta description",
        text: "Without a proper description, the site looks unattractive and loses clicks.",
      },
      {
        name: "Open Graph",
        text: "These tags make links to your site look good in social media and AI answers. Without them, random text or cropped images may appear.",
      },
      {
        name: "H1",
        text: "If there’s no main heading, AI doesn’t understand the page’s topic and the site loses visibility.",
      },
      {
        name: "Structured Data",
        text: "Special markup that explains what’s on your site. Without it, AI struggles to understand your content.",
      },
      {
        name: "Mobile friendly",
        text: "If the site isn’t adapted for phones, AI sees it as inconvenient and shows it less often.",
      },
      {
        name: "HTTPS",
        text: "If the site works without a secure protocol, AI sees it as unsafe and reduces its visibility.",
      },
      {
        name: "Alt texts",
        text: "If images don’t have captions, AI can’t understand them and part of the information is lost.",
      },
      {
        name: "Favicon",
        text: "Without a site icon, AI sees the site as unfinished and shows it less often.",
      },
      {
        name: "404 page",
        text: "If the error page is misconfigured, the site loses trust and visibility in AI answers.",
      },
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
            Your result is ready
          </h1>

          {url && status === "ok" && (
            <div className="mb-6 text-center text-sm text-neutral-600">
              Website: {url}
            </div>
          )}

          {status === "ok" && (
            <>
              <div className="mb-6 text-center text-base font-medium text-neutral-800">
                {mode === "quick"
                  ? "We checked 5 key factors for your website’s AI visibility:"
                  : "We checked all 15 key factors for your website’s visibility in AI results:"}
              </div>

              <ul className="mb-6 space-y-4">
                {(mode === "quick" ? quickItems : proItems).map((item, i) => (
                  <li key={i} className="flex items-center">
                    <span
                      className={`mr-3 inline-block size-3 flex-none rounded-full ${
                        mode === "quick" ? "bg-blue-600" : "bg-green-600"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-[15px] text-neutral-800">
                      <span className="font-semibold">{item.name}</span> —{" "}
                      {item.text}
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
                  disabled={!url || (mode === "pro" && !emailValid) || loading}
                  className={[
                    "w-full rounded-md px-4 py-3 text-base font-medium transition-colors disabled:opacity-60 flex items-center justify-center",
                    payButton,
                  ].join(" ")}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      Processing<Dots />
                    </span>
                  ) : mode === "pro" ? (
                    "Get Full Report"
                  ) : (
                    "Get Full Results"
                  )}
                </button>
              ) : (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-center text-sm text-emerald-800">
                  {mode === "pro"
                    ? "Payment confirmed. Your PDF report will be sent to your email."
                    : "Payment confirmed. Thank you for checking your website’s AI visibility with us."}
                </div>
              )}

              <p className="mt-6 text-center text-xs text-neutral-500">
                <span className="opacity-60">
                  Visibility scores are estimated and based on publicly
                  available data. Not legal advice.
                </span>
              </p>
            </>
          )}
        </div>

        <footer className="mt-8 text-center text-xs text-neutral-500">
          © 2025 AI Signal Max. All rights reserved.
          <br />
          <span className="opacity-60">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </span>
        </footer>
      </div>
    </main>
  );
}
