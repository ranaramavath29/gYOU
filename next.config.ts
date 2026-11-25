import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves listed qualities. 90 keeps photos crisp (MediaFrame default).
    qualities: [75, 90],
  },
  // 301 redirect map.
  async redirects() {
    return [
      // The separate Cookie Policy was folded into the Privacy Policy (25 Nov 2026).
      { source: "/cookie-policy", destination: "/privacy-policy#cookies", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
