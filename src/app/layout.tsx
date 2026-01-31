import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Web Development Agency in India | Website Design & SEO | Sovereign Sites",
  description:
    "Sovereign Sites is a web development agency in India offering website design, SEO services, and custom business website solutions.",
  keywords: [
    "Web Development Agency in India",
    "Website Design India",
    "SEO Services India",
    "Business Website Development",
    "Custom Website Development",
    "Sovereign Sites",
  ],
  metadataBase: new URL("https://sovereignsites.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Web Development Agency in India | Website Design & SEO | Sovereign Sites",
    description:
      "Sovereign Sites is a web development agency in India offering website design, SEO services, and custom business website solutions.",
    url: "https://sovereignsites.in",
    siteName: "Sovereign Sites",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sovereign Sites Web Development Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Agency in India | Sovereign Sites",
    description:
      "Professional website design, SEO services, and custom web development solutions in India.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="e9f4162f-823b-45a1-9d2d-7332844cb099"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
