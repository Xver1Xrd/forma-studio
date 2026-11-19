import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/privacy"] },
    sitemap: base + "/sitemap.xml",
  };
}
