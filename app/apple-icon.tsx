import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/LogoMark";

/** iOS home-screen icon (180×180): the gYOU brand icon on the warm page ground. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2F0EA",
      }}
    >
      <LogoMark width={126} height={116} />
    </div>,
    size,
  );
}
