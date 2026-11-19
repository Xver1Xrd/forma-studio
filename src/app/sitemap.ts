import type { MetadataRoute } from "next";
import { articles, projects, services } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return [
    "/",
    "/about",
    "/projects",
    "/services",
    "/journal",
    "/contacts",
    "/calculator",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
  ].map((path) => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
}
