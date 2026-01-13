import type { Metadata, Viewport } from "next";

// Styles:
import "@/styles/globals.css";
import { cn } from "@/utils";

// Providers:
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterComponent } from "@/components/providers/toaster";

// External scripts:
import Script from "next/script";

// Layout:
import Header from "@/components/layout/header";

// Fonts:
import localFont from "next/font/local";

const interVariable = localFont({
  variable: "--font-sans",
  src: "../fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const geistMonoVariable = localFont({
  variable: "--font-geist-mono",
  src: "../fonts/GeistMonoVF.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

// Metadata:
export const metadata: Metadata = {
  metadataBase: new URL("https://slu9.vercel.app"),
  title: {
    default: "Slug - A beautifully open-source URL shortener",
    template: "%s - Slug",
  },
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/images/logo_png.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      sizes: "any",
      url: "/images/logo_svg.svg",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/images/apple-touch-icon.png",
    },
  ],
  description: "A free, open-source URL shortener built with modern web technologies. Create short, memorable links for your projects in seconds.",
  keywords: [
    "url shortener",
    "link shortener",
    "open source",
    "next.js",
    "turso",
    "prisma",
    "slug",
    "link management",
  ],
  authors: [
    {
      name: "Sohail Koutari",
      url: "https://sohailkoutari.com",
    },
  ],
  creator: "reblox01",
  publisher: "reblox01",
  openGraph: {
    title: "Slug - Open Source URL Shortener",
    description: "A free, open-source URL shortener built with modern web technologies.",
    url: "https://slu9.vercel.app",
    siteName: "Slug",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://slu9.vercel.app/images/og_image.png",
        width: 1200,
        height: 630,
        alt: "Slug - Open Source URL Shortener",
      },
    ],
  },
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
  twitter: {
    card: "summary_large_image",
    title: "Slug - Open Source URL Shortener",
    description: "A free, open-source URL shortener built with modern web technologies.",
    creator: "@reblox01",
    images: ["https://slu9.vercel.app/images/og_image.png"],
  },
  verification: {
    google: "o2_vS37hY5JF907HRg757HWWyYsGY-BvpvdDx3SFMUM",
  },
  alternates: {
    canonical: "https://slu9.vercel.app",
  },
};

// Viewport:
export const viewport: Viewport = {
  themeColor: "#171717",
};

// App layout:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          `font-sans ${interVariable.variable} ${geistMonoVariable.variable} antialiased`,
          "bg-white dark:bg-neutral-900",
          "selection:bg-neutral-200 dark:selection:bg-neutral-700",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <ToasterComponent />
        </ThemeProvider>
        <Script
          async
          src="https://umami.pheralb.dev/script.js"
          data-website-id="2495697e-383c-418c-ac85-d8be8837b686"
        />
      </body>
    </html>
  );
}
