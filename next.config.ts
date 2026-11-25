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
  // 301 redirect map. Empty until real redirects are needed (Phase 8).
  async redirects() {
    return [];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
