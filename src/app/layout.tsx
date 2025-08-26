import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golden Nest Poultry - Fresh Poultry, Trusted Quality",
  description: "Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care. Serving Gauteng, South Africa with premium poultry products.",
  keywords: "poultry, eggs, chickens, farm fresh, South Africa, Gauteng, quality poultry, fresh eggs, broiler chickens, layer chickens",
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
    title: "Golden Nest Poultry - Fresh Poultry, Trusted Quality",
    description: "Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care.",
    url: "https://goldennestpoultry.co.za",
    siteName: "Golden Nest Poultry",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "Golden Nest Poultry - Fresh Poultry, Trusted Quality",
    description: "Golden Nest Poultry is committed to delivering farm-fresh eggs and healthy chickens with the highest standards of care.",
    images: ["/og-image.jpg"],
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
        {children}
      </body>
    </html>
  );
}
