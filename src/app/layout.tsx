import type { Metadata } from "next";
import "./globals.css";
import { SEOContent } from "../constants";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components";

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
    canonical: "/",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#F97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {/* Background Logo */}
      <div className="fixed bottom-4 left-4 z-50">
         <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <Image
          src="/images/logo_transparent.png"
          alt="Golden Nest Poultry Logo"
          width={200}
          height={200}
          className=" object-contain"
          priority
        />
        </Link>
        <Navbar />
      </div>
        {children}
      </body>
    </html>
  );
}
