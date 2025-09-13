// app/preview/[mode]/page.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
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
        text: "This file controls whether your site is visible to AI. If access is blocked, the site may completely disappear from AI results.",
      },
      {
        name: "Sitemap.xml",
        text: "The site map for AI. If it’s missing or incomplete, some pages remain invisible to users.", // ✅ changed
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
        name: "Mobile friendly",
        text: "If the site isn’t adapted for phones, AI sees it as inconvenient and shows it less often.",
      },
    ],
    []
  );

  // Pro (15 factors, first 5 are the same as Quick)
  const proItems = useMemo(
    () => [
      {
        name: "Robots.txt",
        text: "This file controls whether your site is visible to AI. If access is blocked, the site may completely disappear from AI results.",
      },
      {
        name: "Sitemap.xml",
        text: "The site map for AI. If it’s missing or incomplete, some pages remain invisible to users.", // ✅ changed
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
        name: "Mobile friendly",
        text: "If the site isn’t adapted for phones, AI sees it as inconvenient and shows it less often.",
      },
      {
        name: "X-Robots-Tag",
        text: "If headers are misconfigured and block indexing, the site won’t appear in AI answers.",
      },
      {
        name: "Meta robots",
        text: "If meta tags block a page from AI, it won’t be shown to customers.",
      },
      {
        name: "Canonical",
        text: "A canonical link tells AI which page is the main one. If it’s missing or set incorrectly, duplicates or secondary pages may be shown instead. Customers see the wrong content, and the site loses positions.",
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
        text: "Without structured data, AI struggles to understand your site and it loses visibility.",
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
