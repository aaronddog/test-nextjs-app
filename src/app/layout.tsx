import "@/styles/globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { PropsWithChildren } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { env } from "@/env.mjs";
import { fonts } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  verification: {
    google: siteConfig.googleSiteVerificationId,
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: "/opengraph-image.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: "/opengraph-image.jpg",
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans", fonts)}>
        <Script
          id="dd-rum-sync"
          src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js"
          type="text/javascript"
          strategy="beforeInteractive"
        />
        <Script id="datadog-rum">
          {`
            window.DD_RUM && window.DD_RUM.init({
              applicationId: '${env.NEXT_PUBLIC_DD_RUM_APPLICATION_ID || ''}',
              clientToken: '${env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN || ''}',
              site: '${env.NEXT_PUBLIC_DD_SITE || ''}',
              service: '${env.NEXT_PUBLIC_DD_SERVICE || ''}',
              env: '${env.NEXT_PUBLIC_DD_ENV || ''}',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 20,
              defaultPrivacyLevel: "mask-user-input",
            });
          `}
        </Script>
        <ThemeProvider attribute="class">
          {children}
          <ThemeSwitcher className="absolute right-5 bottom-5 z-10" />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
