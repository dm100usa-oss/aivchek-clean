"use client";

import { useSearchParams } from "next/navigation";
import Donut from "../../../components/Donut";

type Mode = "quick" | "pro";

interface Factor {
  name: string;
  desc: string;
  status: "Good" | "Moderate" | "Poor";
}

// Factor item with colored status text
function ResultItem({ factor, dotColor }: { factor: Factor; dotColor: string }) {
  const statusColors = {
    Good: "text-green-600",
    Moderate: "text-yellow-600",
    Poor: "text-red-600",
  };
  return (
    <div className="p-4 bg-white rounded-xl shadow flex items-start justify-between">
      <div className="flex items-start space-x-3">
        <div className={`w-3 h-3 mt-2 rounded-full ${dotColor}`} />
        <div>
          <p className="font-semibold">{factor.name}</p>
          <p className="text-sm text-gray-600">{factor.desc}</p>
        </div>
      </div>
      <span className={`text-sm font-semibold ${statusColors[factor.status]}`}>
        {factor.status}
      </span>
    </div>
  );
}

export default function SuccessPage({ params }: { params: { mode: Mode } }) {
  const mode = params.mode as Mode;
  const searchParams = useSearchParams();
  const score = Number(searchParams.get("score") || 60);

  const summary =
    score >= 80
      ? "Your site is well visible to AI platforms. Most parameters are set correctly, and users can easily find your content in AI answers."
      : score >= 40
      ? "Your site is partially visible to AI platforms. Some parameters need improvement to increase overall visibility and attract more clients."
      : "Your site is poorly visible to AI platforms. Most parameters are not configured correctly, which seriously limits your presence in AI answers.";

  // Quick (5 key factors)
  const QUICK_FACTORS: Factor[] = [
    {
      name: "Robots.txt",
      desc: "This file controls whether your site is visible to AI. If access is blocked, the site may completely disappear from AI results.",
      status: "Good",
    },
    {
      name: "Sitemap.xml",
      desc: "The site map for AI. If it’s missing or incomplete, some pages remain invisible to customers.",
      status: "Moderate",
    },
    {
      name: "Title",
      desc: "The page title is the first thing users and AI see. If it is missing, duplicated, or too generic, AI shows random text and users may not understand why to visit your site.",
      status: "Poor",
    },
    {
      name: "Meta description",
      desc: "A short description under the title that AI shows in answers. Without it, or if it’s weak, your site looks unattractive and loses clicks.",
      status: "Good",
    },
    {
      name: "Mobile friendly",
      desc: "If the site isn’t adapted for phones, AI considers it inconvenient and shows it less often.",
      status: "Moderate",
    },
  ];

  // Pro (15 factors, first 5 are the same as Quick)
  const PRO_FACTORS: Factor[] = [
    ...QUICK_FACTORS,
    {
      name: "X-Robots-Tag",
      desc: "Server headers that tell AI whether pages can be shown. If misconfigured and blocking, pages simply do not appear in AI answers.",
      status: "Poor",
    },
    {
      name: "Meta robots",
      desc: "A special tag inside the page that tells AI whether it can be shown. If misconfigured with a block, the page disappears from AI results.",
      status: "Good",
    },
    {
      name: "Canonical",
      desc: "A canonical link tells AI which page is the main one. If missing or incorrect, duplicates or secondary pages may be shown instead. Customers see the wrong content, and the site loses positions.",
      status: "Moderate",
    },
    {
      name: "Open Graph",
      desc: "Special tags that make links to your site look good in social media and AI answers. Without them, random text or cropped images may appear, reducing trust.",
      status: "Poor",
    },
    {
      name: "H1",
      desc: "The main heading of a page shows AI and users what it is about. Without it, or if duplicated, the system does not understand the topic clearly.",
      status: "Good",
    },
    {
      name: "Structured Data",
      desc: "Special markup (JSON-LD) that explains to AI what is on the page: product, service, article, or company. Without it, AI cannot fully understand the content.",
      status: "Moderate",
    },
    {
      name: "HTTPS",
      desc: "A secure protocol that AI sees as a trust factor. If your site works without HTTPS, it is considered unsafe and less visible.",
      status: "Good",
    },
    {
      name: "Alt texts",
      desc: "Captions for images that help AI interpret them. If missing, images are ignored and important content is lost.",
      status: "Poor",
    },
    {
      name: "Favicon",
      desc: "A small site icon that AI perceives as a sign of completeness. Without it, your site looks unfinished and gets less visibility.",
      status: "Moderate",
    },
    {
      name: "404 page",
      desc: "A proper error page tells AI that a resource does not exist. If misconfigured, broken links may look valid and reduce trust in your site.",
      status: "Good",
    },
  ];

  const factors = mode === "quick" ? QUICK_FACTORS : PRO_FACTORS;
  const dotColor = mode === "quick" ? "bg-blue-500" : "bg-green-500";

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {mode === "quick"
          ? "Website visibility results"
          : "Full website visibility audit"}
      </h1>

      <div className="flex justify-center mb-6">
        <Donut score={score} />
      </div>

      {/* Summary card */}
      <div className="max-w-xl mx-auto bg-gray-50 rounded-xl shadow-md p-6 text-center mb-10">
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* Factors */}
      <div className="space-y-4">
        {factors.map((f, i) => (
          <ResultItem key={i} factor={f} dotColor={dotColor} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-10 text-center text-sm text-gray-600">
        {mode === "quick"
          ? "You can check another website."
          : "We have sent the full report and developer checklist to your email."}
      </div>

      <p className="text-xs text-gray-400 text-center mt-6">
        Visibility scores are estimated and based on publicly available data.
        Not legal advice.
      </p>
    </main>
  );
}
