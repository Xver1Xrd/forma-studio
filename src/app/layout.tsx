import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionEffects } from "@/components/motion";
import { site } from "@/lib/content";
import "./globals.css";
const origin =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "FORMA — Архитектура осмысленного пространства",
    template: "%s — FORMA",
  },
  description: site.description,
  applicationName: "FORMA",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "FORMA",
    title: "FORMA — Пространство как форма искусства",
    description: site.description,
    images: [
      {
        url: "/images/hero.webp",
        width: 1536,
        height: 864,
        alt: "Интерьер архитектурной студии FORMA",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = {
  themeColor: "#F5F3EF",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body id="top">
        <Header />
        <MotionEffects />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
