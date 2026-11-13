import type { Metadata, Viewport } from "next";
import { Sora, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { RetroTvShell } from "@/components/RetroTvShell";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { DeferredThreeStage } from "@/components/DeferredThreeStage";
import { ScrollTelemetryRail } from "@/components/ScrollTelemetryRail";
import { JsonLd } from "@/components/JsonLd";
import {
  BRAND_NAME,
  buildAlternates,
  buildSiteGlobalSchema,
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/seo";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#030305",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: `%s | ${BRAND_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND_NAME,
  keywords: [
    "desarrollo web",
    "software a medida",
    "Next.js",
    "TypeScript",
    "React",
    "e-commerce",
    "landing page",
    "SEO técnico",
    "GEO",
    "desarrollo web Bolivia",
    "desarrollo web Cochabamba",
    "Tegrity-Soft",
  ],
  authors: [
    { name: BRAND_NAME, url: SITE_URL },
    { name: "Roberto C. Escalera" },
    { name: "Brayan R. Apaza" },
    { name: "Elias C. Coca Rojas" },
  ],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: buildAlternates("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: BRAND_NAME,
    locale: "es_BO",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tegrity-Soft — Desarrollo web, software a medida y e-commerce en Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@roberto8695",
    images: ["/twitter-image"],
  },
  other: {
    "geo.region": "BO-C",
    "geo.placename": "Cochabamba, Bolivia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd data={buildSiteGlobalSchema()} />
      </head>
      <body className="antialiased selection:bg-[var(--accent)]/30">
        <SmoothScrollProvider>
          <a href="#contenido-principal" className="skip-link">
            Saltar al contenido principal
          </a>
          <DeferredThreeStage />
          <Header />
          <ScrollTelemetryRail />
          <RetroTvShell />
          <main
            id="contenido-principal"
            className="relative z-10 px-3 sm:px-6 lg:px-8"
          >
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
