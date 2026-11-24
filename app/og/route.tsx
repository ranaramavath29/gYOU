import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { site } from "@/content/site";

// The site logo, inlined so ImageResponse needs no network fetch.
const LOGO = `data:image/png;base64,${readFileSync(path.join(process.cwd(), "public/brand/gyou-logo.png")).toString("base64")}`;

/**
 * Dynamic Open Graph image (1200×630) in the cream, ink and cobalt-blue palette.
 * Uses ImageResponse's built-in font; no font files are fetched at runtime.
 * Usage: /og?title=…&eyebrow=…
 */
export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = (searchParams.get("title") ?? site.tagline).slice(0, 110);
  const eyebrow = (
    searchParams.get("eyebrow") ?? `Website Design & Digital Marketing · ${site.primaryMarket}`
  ).slice(0, 70);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#FBF7F0",
        color: "#1D1B18",
        backgroundImage:
          "radial-gradient(circle at 85% 10%, rgba(255,215,184,0.55), transparent 45%)",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={LOGO} alt={site.name} width={283} height={70} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#5C5A55" }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#1F5FD1" }} />
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? 64 : 80,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#67635B" }}
      >
        <span>{site.tagline}</span>
        <span>{site.domain}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
