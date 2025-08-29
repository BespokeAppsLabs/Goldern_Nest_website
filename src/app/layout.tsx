import type { Metadata } from "next";
import "./globals.css";
import { SEOContent } from "../constants";
import { organization, localBusiness } from "../constants/structured-data";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components";
import Script from "next/script";
import { config } from "@/config/index.ts";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: SEOContent.default.title,
  description: SEOContent.default.description,
  keywords: SEOContent.default.keywords,
  authors: [{ name: "Golden Nest Poultry" }],
  creator: "Golden Nest Poultry",
  publisher: "Golden Nest Poultry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://goldennestpoultry.co.za"),
  alternates: {
    canonical: "https://goldennestpoultry.co.za",
  },
  openGraph: {
    title: SEOContent.default.title,
    description: SEOContent.default.description,
    url: "https://goldennestpoultry.co.za",
    siteName: "Golden Nest Poultry",
    images: [
      {
        url: SEOContent.default.ogImage,
        width: 1200,
        height: 630,
        alt: "Golden Nest Poultry Farm",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEOContent.default.title,
    description: SEOContent.default.description,
    images: [SEOContent.default.twitterImage],
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
  verification: {
    google: config.google.verification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
   
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#b99b30" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Location-specific meta tags */}
        <meta name="geo.region" content="ZA-LP" />
        <meta name="geo.country" content="South Africa" />
        <meta name="geo.placename" content="Modimolle, Limpopo" />
        <meta name="ICBM" content="-24.728667, 28.430778" />
        <meta name="geo.position" content="-24.728667;28.430778" />
        <Script type="application/ld+json">
          {JSON.stringify([organization, localBusiness])}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {/* Background Logo - Hidden on mobile to avoid overlap */}
        <div className="hidden md:fixed md:bottom-4 md:left-4 md:z-50 md:block">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo_transparent.png"
              alt="Golden Nest Poultry Logo"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <Navbar />
        <main className="md:pt-24">
          {children}
        </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
