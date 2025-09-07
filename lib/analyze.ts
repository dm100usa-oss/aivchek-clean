// lib/analyze.ts
import {
  QUICK_KEYS,
  PRO_KEYS,
  weightOf,
  nameOf,
  interpret,
  CheckKey,
  Mode,
} from "./score";
import { getFactorColor } from "./colors";

export interface CheckItem {
  key: CheckKey;
  name: string;
  passed: boolean;
  description: string;
  color: "red" | "yellow" | "green";
}

export interface AnalyzeResult {
  url: string;
  mode: Mode;
  items: CheckItem[];
  score: number;
  interpretation: ReturnType<typeof interpret>;
}

const DEFAULT_UA =
  "Mozilla/5.0 (compatible; AIVCheckBot/1.0; +https://aivcheck.com)";

/* ---------------- Helpers ---------------- */
async function fetchWithTimeout(
  resource: string,
  opts: RequestInit & { timeoutMs?: number } = {}
) {
  const { timeoutMs = 12000, ...rest } = opts;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(resource, {
      ...rest,
      redirect: "follow",
      headers: { "user-agent": DEFAULT_UA, ...(rest.headers || {}) },
      signal: controller.signal,
      cache: "no-store",
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

function textMatch(html: string | null, re: RegExp) {
  if (!html) return null;
  const m = html.match(re);
  return m ? m[1] || m[0] : null;
}

function stripTags(s: string) {
  return s.replace(/<[^>]*>/g, "").trim();
}

function item(
  key: CheckKey,
  passed: boolean,
  description: string
): CheckItem {
  return {
    key,
    name: nameOf(key),
    passed,
    description,
    color: getFactorColor(key, passed, description),
  };
}

/* ---------------- Main analysis ---------------- */
export async function analyze(
  rawUrl: string,
  mode: Mode
): Promise<AnalyzeResult> {
  let url = rawUrl.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;
  const urlObj = new URL(url);
  const origin = urlObj.origin;

  const res = await fetchWithTimeout(url);
  const html = res.ok ? await res.text() : null;
  const headers = res.headers;
  const schemeOk = url.startsWith("https://") && res.ok;

  const all: Record<CheckKey, CheckItem> = {
    robots_txt: await (async () => {
      try {
        const r = await fetchWithTimeout(origin + "/robots.txt", { method: "GET" });
        if (!r.ok) return item("robots_txt", false, "robots.txt not found");
        const txt = await r.text();
        const blocksAll =
          /Disallow:\s*\/\s*$/im.test(txt) ||
          /User-agent:\s*\*\s*[\r\n]+Disallow:\s*\/\s*$/im.test(txt);
        return item(
          "robots_txt",
          !blocksAll,
          blocksAll ? "robots.txt blocks all" : "robots.txt present"
        );
      } catch {
        return item("robots_txt", false, "robots.txt not accessible");
      }
    })(),
    sitemap_xml: await (async () => {
      try {
        const r = await fetchWithTimeout(origin + "/sitemap.xml", { method: "GET" });
        return item("sitemap_xml", r.ok, r.ok ? "sitemap.xml found" : "sitemap.xml not found");
      } catch {
        return item("sitemap_xml", false, "sitemap.xml not accessible");
      }
    })(),
    x_robots_tag: (() => {
      const v = headers.get("x-robots-tag") || "";
      const blocked = /\bnoindex\b|\bnone\b/i.test(v);
      return item("x_robots_tag", !blocked, v ? `X-Robots-Tag: ${v}` : "No X-Robots-Tag");
    })(),
    meta_robots: (() => {
      const content =
        textMatch(
          html,
          /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i
        ) || "";
      const blocked = /\bnoindex\b|\bnone\b/i.test(content);
      return item("meta_robots", !blocked, content ? `meta robots: ${content}` : "No meta robots");
    })(),
    canonical: (() => {
      const href =
        textMatch(
          html,
          /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i
        ) || "";
      const ok = !!href && /^https?:\/\//i.test(href);
      return item("canonical", ok, href ? `canonical: ${href}` : "No canonical link");
    })(),
    title_tag: (() => {
      const t = stripTags(
        textMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || ""
      );
      return item("title_tag", t.length > 0, t ? `Title: ${t}` : "Missing <title>");
    })(),
    meta_description: (() => {
      const d =
        textMatch(
          html,
          /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
        ) || "";
      return item(
        "meta_description",
        d.trim().length > 0,
        d ? `Meta description: ${d}` : "Missing meta description"
      );
    })(),
    open_graph: (() => {
      const t =
        textMatch(
          html,
          /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i
        ) || "";
      const d =
        textMatch(
          html,
          /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i
        ) || "";
      const ok = !!t && !!d;
      return item("open_graph", ok, ok ? "OG tags present" : "Missing Open Graph tags");
    })(),
    h1_present: (() => {
      const h1 = stripTags(textMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i) || "");
      return item("h1_present", h1.length > 0, h1 ? `H1: ${h1}` : "Missing H1");
    })(),
    structured_data: (() => {
      if (!html) return item("structured_data", false, "No HTML");
      const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let ok = false;
      let m: RegExpExecArray | null;
      while ((m = re.exec(html)) !== null) {
        try {
          const json = JSON.parse(m[1]);
          if (json) { ok = true; break; }
        } catch {}
      }
      return item("structured_data", ok, ok ? "JSON-LD present" : "No JSON-LD");
    })(),
    mobile_friendly: (() => {
      const v =
        textMatch(
          html,
          /<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["'][^>]*>/i
        ) || "";
      const ok = /width\s*=\s*device-width/i.test(v);
      return item("mobile_friendly", ok, ok ? "Viewport OK" : "Missing/invalid viewport");
    })(),
    https: item("https", schemeOk, schemeOk ? "HTTPS detected" : "No HTTPS"),
    alt_attributes: (() => {
      if (!html) return item("alt_attributes", false, "No HTML");
      const imgTags = html.match(/<img\b[^>]*>/gi) || [];
      if (!imgTags.length) return item("alt_attributes", true, "No images");
      let withAlt = 0;
      for (const tag of imgTags) {
        const alt =
          (tag.match(/alt\s*=\s*["']([^"']*)["']/i) || [,""])[1].trim();
        if (alt.length > 0) withAlt++;
      }
      const ratio = withAlt / imgTags.length;
      const ok = ratio >= 0.6;
      return item(
        "alt_attributes",
        ok,
        `Images with alt: ${withAlt}/${imgTags.length}`
      );
    })(),
    favicon: await (async () => {
      try {
        const r = await fetchWithTimeout(origin + "/favicon.ico", { method: "HEAD" });
        return item("favicon", r.ok, r.ok ? "favicon.ico found" : "No favicon");
      } catch {
        return item("favicon", false, "No favicon");
      }
    })(),
    page_404: await (async () => {
      const testUrl = `${origin}/__aivcheck_not_found_${Date.now().toString(36)}.html`;
      try {
        const r = await fetchWithTimeout(testUrl, { method: "GET" });
        const txt = await r.text();
        const hint = /404/i.test(txt) || /not found/i.test(txt);
        const ok = r.status === 404 || hint;
        return item("page_404", ok, ok ? "Proper 404" : `Unexpected status ${r.status}`);
      } catch {
        return item("page_404", false, "404 check failed");
      }
    })(),
  };

  const total = PRO_KEYS.reduce((a, k) => a + weightOf(k), 0);
  const pass = PRO_KEYS.reduce((a, k) => a + (all[k].passed ? weightOf(k) : 0), 0);
  const score = Math.round((pass / total) * 100);

  const keysToShow = mode === "quick" ? QUICK_KEYS : PRO_KEYS;
  const items = keysToShow.map((k) => all[k]);

  return {
    url,
    mode,
    items,
    score,
    interpretation: interpret(score),
  };
}
