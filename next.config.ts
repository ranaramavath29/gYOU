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
  // Static media in public/ is otherwise served with max-age=0. Industry photos are
  // versioned by filename (-v5); other files keep a week of caching with revalidation.
  async headers() {
    const cache = "public, max-age=604800, stale-while-revalidate=86400";
    return [
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: cache }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: cache }] },
    ];
  },
  // 301 redirect map.
  async redirects() {
    return [
      // The separate Cookie Policy was folded into the Privacy Policy (25 Nov 2026).
      { source: "/cookie-policy", destination: "/privacy-policy#cookies", permanent: true },
      // Services retired 24 Nov 2026 that Google still has indexed.
      { source: "/services/branding-creative-design", destination: "/services", permanent: true },
      {
        source: "/services/video-content-production",
        destination: "/services/social-media-marketing",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
