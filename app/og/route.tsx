import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/content/site";

/**
 * Dynamic Open Graph image (1200×630) in the Editorial Luxe style:
 * dark background, lime accent, large serif-style title.
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
        background: "#0C0C0B",
        color: "#F2F0EA",
        backgroundImage:
          "radial-gradient(circle at 85% 10%, rgba(214,255,92,0.18), transparent 45%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 44,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        <LogoMark width={52} height={48} />
        {site.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#BDBBB2" }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#D6FF5C" }} />
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
        style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A9A79F" }}
      >
        <span>{site.tagline}</span>
        <span>{site.domain}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
