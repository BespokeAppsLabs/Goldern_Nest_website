import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'goldennestpoultry.co.za',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    // NEXT_PUBLIC_GOOGLE_MAPS: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
    // NEXT_PUBLIC_GOOGLE_RECAPTCHA: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
};

export default nextConfig;
