import type { Metadata } from "next";

// Styles:
import "@/styles/globals.css";
import { cn } from "@/utils";

// Providers:
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterComponent } from "@/components/providers/toaster";

// Layout:
import Header from "@/components/header";

// Fonts:
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";

const interVariable = localFont({
  variable: "--font-sans",
  src: "../fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

// Metadata:
export const metadata: Metadata = {
  metadataBase: new URL("https://slug.vercel.app"),
  title: {
    default: "Slug - A beautifully open-source URL shortener",
    template: "%s - Slug",
  },
  description: "An open-source URL shortener built with T3 Stack.",
  openGraph: {
    title: "Slug",
    description: "An beautifully open-source URL shortener",
    url: "https://slug.vercel.app",
    siteName: "Slug - An beautifully open-source URL shortener",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/logo_svg.svg",
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
    title: "Slug - An beautifully open-source URL shortener",
    card: "summary_large_image",
  },
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
          `font-sans ${interVariable.variable} ${GeistMono.variable} antialiased`,
          "bg-white dark:bg-neutral-900",
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
      </body>
    </html>
  );
}
