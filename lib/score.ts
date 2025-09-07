// lib/score.ts
export type Mode = "quick" | "pro";

export type CheckKey =
  | "robots_txt"
  | "sitemap_xml"
  | "x_robots_tag"
  | "meta_robots"
  | "canonical"
  | "title_tag"
  | "meta_description"
  | "open_graph"
  | "h1_present"
  | "structured_data"
  | "mobile_friendly"
  | "https"
  | "alt_attributes"
  | "favicon"
  | "page_404";

export interface CheckMeta {
  key: CheckKey;
  name: string;
  weight: number;
}

// Новая градация весов, сумма = 100%
export const CHECKS: CheckMeta[] = [
  { key: "robots_txt",       name: "robots.txt",                 weight: 12 },
  { key: "sitemap_xml",      name: "sitemap.xml",                weight: 10 },
  { key: "x_robots_tag",     name: "X-Robots-Tag (headers)",     weight: 6 },
  { key: "meta_robots",      name: "Meta robots",                weight: 12 },
  { key: "canonical",        name: "Canonical",                  weight: 7 },
  { key: "title_tag",        name: "Title tag",                  weight: 7 },
  { key: "meta_description", name: "Meta description",           weight: 7 },
  { key: "open_graph",       name: "Open Graph",                 weight: 5 },
  { key: "h1_present",       name: "H1",                         weight: 7 },
  { key: "structured_data",  name: "Structured Data (JSON-LD)",  weight: 7 },
  { key: "mobile_friendly",  name: "Mobile friendly (viewport)", weight: 5 },
  { key: "https",            name: "HTTPS / SSL",                weight: 11 },
  { key: "alt_attributes",   name: "Alt attributes",             weight: 4 },
  { key: "favicon",          name: "Favicon",                    weight: 3 },
  { key: "page_404",         name: "404 page",                   weight: 4 },
]; // total = 100

export const PRO_KEYS: CheckKey[] = CHECKS.map((c) => c.key);

// Quick показывает только эти 5 пунктов (но процент считается по всем 15)
export const QUICK_KEYS: CheckKey[] = [
  "robots_txt",
  "sitemap_xml",
  "meta_robots",
  "canonical",
  "title_tag",
];

export function weightOf(key: CheckKey): number {
  const it = CHECKS.find((c) => c.key === key);
  return it ? it.weight : 0;
}

export function nameOf(key: CheckKey): string {
  const it = CHECKS.find((c) => c.key === key);
  return it ? it.name : key;
}

// Интерпретация финального процента
export function interpret(
  score: number
): "Excellent" | "Good" | "Moderate" | "Needs Improvement" {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Moderate";
  return "Needs Improvement";
}
