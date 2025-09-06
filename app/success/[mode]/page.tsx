// app/success/[mode]/page.tsx
"use client";

import { useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

/**
 * Helper: map query param to normalized status.
 * Accepts: "good" | "moderate" | "poor" (case-insensitive). Fallback: "unknown" -> displayed as "—".
 */
function normalizeStatus(v: string | null): "Good" | "Moderate" | "Poor" | "—" {
  if (!v) return "—";
  const s = v.toLowerCase();
  if (s === "good") return "Good";
  if (s === "moderate") return "Moderate";
  if (s === "poor") return "Poor";
  return "—";
}

/**
 * Color thresholds by score.
 */
function colorForScore(score: number) {
  if (score >= 80) {
    return {
      key: "green",
      start: "#22c55e", // green-500
      end: "#16a34a",   // green-600
      text: "text-green-600",
      ringBg: "stroke-green-100",
    };
  }
  if (score >= 40) {
    return {
      key: "yellow",
      start: "#eab308", // yellow-500
      end: "#facc15",   // yellow-400
      text: "text-yellow-600",
      ringBg: "stroke-yellow-100",
    };
  }
  return {
    key: "red",
    start: "#ef4444", // red-500
    end: "#dc2626",   // red-600
    text: "text-red-600",
    ringBg: "stroke-red-100",
  };
}

/**
 * Donut with gradient arc. Center shows only the numeric percentage.
 */
function Donut({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const { key, start, end, text, ringBg } = colorForScore(clamped);

  // Circle geometry
  const size = 200;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const gradId = `grad-${key}`;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={start} />
            <stop offset="100%" stopColor={end} />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className={ringBg}
          fill="none"
        />

        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          stroke={`url(#${gradId})`}
          fill="none"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 600ms ease",
          }}
        />

        {/* Center value */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={`font-semibold ${text}`}
          style={{ fontSize: 28 }}
        >
          {clamped}%
        </text>
      </svg>
    </div>
  );
}

/**
 * Range-based conclusions (3 variants) shown under the donut.
 * Text is strictly the approved copy, in English.
 */
function RangeConclusion({ score, variant }: { score: number; variant: "quick" | "pro" }) {
  if (score >= 80) {
    return (
      <p className="text-gray-700">
        Your website is well visible to AI platforms and appears in search results. Most of the site’s information is accessible and correctly recognized.
      </p>
    );
  }
  if (score >= 40) {
    return (
      <p className="text-gray-700">
        Your website is partially visible to AI platforms, and part of the information does not appear in search results. Some data is unavailable to AI, which reduces the site’s overall visibility.
      </p>
    );
  }
  return (
    <p className="text-gray-700">
      Your website is poorly visible to AI platforms, and most data does not appear in search results. Key information is hidden from AI, which severely limits the site’s visibility.
    </p>
  );
}

/**
 * Approved subheadings under the H1.
 */
function Subheading({ mode }: { mode: "quick" | "pro" }) {
  if (mode === "quick") {
    return (
      <p className="text-gray-600">
        Your website has been analyzed. Here are the key results.
      </p>
    );
  }
  return (
    <p className="text-gray-600">
      Your website has been analyzed. Here are the detailed results.
    </p>
  );
}

/**
 * Approved factor texts
 * Quick uses short versions for 5 factors. Pro uses long versions for all 15.
 * Status values can be supplied via query params; sensible placeholders are used otherwise.
 */
const QUICK_FACTORS: Array<{ key: string; title: string; short: string; qp: string }> = [
  {
    key: "robots",
    title: "Robots.txt",
    qp: "rbt",
    short:
      "This file controls whether search engines and AI can see your site. If set incorrectly and access is blocked, the site may disappear from search and AI results.",
  },
  {
    key: "sitemap",
    title: "Sitemap.xml",
    qp: "smp",
    short:
      "This is a sitemap for search engines and AI. If missing or incomplete, some pages will not appear in search and will not be visible.",
  },
  {
    key: "xrobots",
    title: "X-Robots-Tag",
    qp: "xrt",
    short:
      "If headers are set incorrectly and block indexing, the site will not appear in search and will not be seen.",
  },
  {
    key: "metarobots",
    title: "Meta robots",
    qp: "mrb",
    short:
      "If meta tags block a page from search, it will not appear in results and will not be found.",
  },
  {
    key: "canonical",
    title: "Canonical",
    qp: "can",
    short:
      "If the main version of a page is not specified, AI may show duplicates or secondary sections. This leads to inaccurate results and lowers rankings.",
  },
];

const PRO_FACTORS: Array<{
  key: string;
  title: string;
  long: string;
  qp: string;
}> = [
  {
    key: "robots",
    title: "Robots.txt",
    qp: "rbt",
    long:
      "This file controls whether search engines and AI can see your site. If it is configured incorrectly and blocks access, the site may completely disappear from search and AI answers.",
  },
  {
    key: "sitemap",
    title: "Sitemap.xml",
    qp: "smp",
    long:
      "The sitemap shows search engines and AI which pages you have and what is important to index. If it is missing or set up incorrectly, part of the site remains invisible, and users cannot find needed pages.",
  },
  {
    key: "xrobots",
    title: "X-Robots-Tag",
    qp: "xrt",
    long:
      "This server-side header tells search engines and AI whether your pages may be shown. If a disallow directive is present, pages will not get into search.",
  },
  {
    key: "metarobots",
    title: "Meta robots",
    qp: "mrb",
    long:
      "A special tag inside the page that controls whether it may appear in search and AI. If set to disallow, the page disappears from search results.",
  },
  {
    key: "canonical",
    title: "Canonical",
    qp: "can",
    long:
      "This link tells search engines and AI which page version is primary. Without it, duplicates compete, and the system may show the wrong variant, losing relevant traffic.",
  },
  {
    key: "title",
    title: "Title",
    qp: "ttl",
    long:
      "The page title is the first thing users see in search. If it is missing, duplicated, or too generic, search may display random text and users will not understand why they should click.",
  },
  {
    key: "description",
    title: "Meta description",
    qp: "mds",
    long:
      "A short description under the title in search. If missing, duplicated, or too generic, search will pull random text, and users choose other results.",
  },
  {
    key: "opengraph",
    title: "Open Graph",
    qp: "og",
    long:
      "Special tags that make links to your site attractive in social media, messengers, and AI answers. If missing or wrong, users see random text or a cropped image, which reduces trust and clicks.",
  },
  {
    key: "h1",
    title: "H1",
    qp: "h1",
    long:
      "The main heading that tells search engines, AI, and users what the page is about. If missing or duplicated across pages, the system cannot determine what is important.",
  },
  {
    key: "structured",
    title: "Structured Data",
    qp: "sd",
    long:
      "JSON-LD markup that explains the page type (product, article, organization). It enables rich results. If missing or invalid, the system misunderstands the page and you lose visibility and clicks.",
  },
  {
    key: "mobile",
    title: "Mobile friendly",
    qp: "mob",
    long:
      "Responsive layout and usable UI on phones. If the layout breaks, text is tiny, or controls are hard to use, AI and search consider the site inconvenient and rank it lower.",
  },
  {
    key: "https",
    title: "HTTPS",
    qp: "ssl",
    long:
      "Secure protocol is a baseline trust signal. If the site lacks HTTPS or has certificate issues, it is flagged as unsafe and shown less often.",
  },
  {
    key: "alt",
    title: "Alt texts",
    qp: "alt",
    long:
      "Image alt attributes help search and AI understand images. Without them, important visual information is not accounted for.",
  },
  {
    key: "favicon",
    title: "Favicon",
    qp: "fav",
    long:
      "A small site icon used in browsers and sometimes in results. It signals completeness. If missing or broken, the site looks unfinished and visibility may decrease.",
  },
  {
    key: "page404",
    title: "404 page",
    qp: "p404",
    long:
      "A correct 404 response tells search and AI a page does not exist. If misconfigured (e.g., returns 200), the system gets confused and trusts the site less.",
  },
];

/**
 * Factor list renderer
 */
function Factors({
  items,
  mode,
  searchParams,
}: {
  items: Array<{ key: string; title: string; short?: string; long?: string; qp: string }>;
  mode: "quick" | "pro";
  searchParams: URLSearchParams;
}) {
  return (
    <div className="space-y-6">
      {items.map((f) => {
        const statusRaw = searchParams.get(f.qp);
        const status = normalizeStatus(statusRaw);
        return (
          <div key={f.key} className="border border-gray-200 rounded-xl p-5 bg-white">
            <div className="flex items-baseline justify-between">
              <h3 className="text-gray-900 font-semibold">{f.title}</h3>
              <span className="text-sm font-medium text-gray-700">
                {status === "—" ? "Status: —" : `Status: ${status}`}
              </span>
            </div>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {mode === "quick" ? f.short : f.long}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function SuccessPage() {
  const params = useParams<{ mode: "quick" | "pro" }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode: "quick" | "pro" = (params?.mode === "pro" ? "pro" : "quick");
  const score = useMemo(() => {
    const raw = Number(searchParams.get("score"));
    if (!Number.isFinite(raw)) return 72; // sensible default
    return Math.max(0, Math.min(100, Math.round(raw)));
  }, [searchParams]);

  const palette = colorForScore(score);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "quick" ? "Website visibility results" : "Full website visibility audit"}
        </h1>

        {/* Subheading */}
        <div className="mt-1">
          <Subheading mode={mode} />
        </div>

        {/* Donut */}
        <div className="mt-8">
          <Donut value={score} />
        </div>

        {/* Range-based conclusion */}
        <div className="mt-6">
          <RangeConclusion score={score} variant={mode} />
        </div>

        {/* Factors */}
        <div className="mt-10">
          {mode === "quick" ? (
            <Factors items={QUICK_FACTORS} mode="quick" searchParams={searchParams} />
          ) : (
            <Factors items={PRO_FACTORS} mode="pro" searchParams={searchParams} />
          )}
        </div>

        {/* Pro-only info about email */}
        {mode === "pro" && (
          <p className="mt-8 text-gray-700">
            The full website visibility audit with developer recommendations has been sent to your email.
          </p>
        )}

        {/* Navigation + helper line (Quick only helper line under the button) */}
        <div className="mt-10 flex flex-col items-start gap-2">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center rounded-2xl px-5 py-3 text-white shadow-sm transition
                       bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-600 hover:to-amber-400"
            aria-label="Back to Home"
          >
            Back to Home
          </button>

          {mode === "quick" && (
            <p className="text-sm text-gray-600 mt-1">
              You can check other websites for AI visibility if you wish.
            </p>
          )}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-500">
          Visibility scores are estimated and based on publicly available data. Not legal advice.
        </p>
      </div>
    </main>
  );
}
