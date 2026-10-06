import type { NextConfig } from "next";

const API_TARGET_URL =
  process.env.NEXT_PUBLIC_DELCOM_BASEURL || "https://open-api.delcom.org/api/v1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/noop.js",
    },
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${API_TARGET_URL}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/((?!api-proxy).*)",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow" },
          // Tambahkan header ini untuk mencegah status 304
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;