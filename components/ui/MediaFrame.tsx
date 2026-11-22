import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { PlaceholderText } from "@/components/PlaceholderText";
import { cn } from "@/lib/cn";

export type MediaSource =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; label: string; poster?: string };

export type MediaAspect = "1/1" | "4/5" | "3/4" | "4/3" | "16/9" | "21/9";
export type MediaTint = "olive" | "graphite" | "rust" | "navy";

type MediaFrameProps = {
  /** Real media. When absent, the placeholder state is shown. */
  media?: MediaSource;
  /** Describes the missing media. Pass a ph() string from /content. */
  placeholder: string;
  /**
   * Decorative artwork shown on the tinted background instead of the
   * placeholder label (e.g. service tiles). Hidden from screen readers.
   */
  children?: ReactNode;
  aspect?: MediaAspect;
  tint?: MediaTint;
  /** Slow zoom on hover (for work cards). The parent needs the `group` class. */
  zoomOnHover?: boolean;
  /** Gentle 7s float (hero tiles). */
  float?: boolean;
  /** Rotation in degrees. */
  tilt?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

const aspects: Record<MediaAspect, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
};

const tints: Record<MediaTint, string> = {
  olive: "bg-[linear-gradient(135deg,#2f3f1d_0%,#18200f_100%)]",
  graphite: "bg-[linear-gradient(135deg,#2c2c2a_0%,#181817_100%)]",
  rust: "bg-[linear-gradient(135deg,#3d2518_0%,#20140e_100%)]",
  navy: "bg-[linear-gradient(135deg,#1f2740_0%,#111625_100%)]",
};

/** Image or video in a rounded frame, with a clearly marked placeholder state. */
export function MediaFrame({
  media,
  placeholder,
  aspect = "4/5",
  tint = "graphite",
  zoomOnHover = false,
  float = false,
  tilt,
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className,
  children,
}: MediaFrameProps) {
  const style: CSSProperties | undefined = tilt ? { rotate: `${tilt}deg` } : undefined;
  const zoom =
    zoomOnHover && "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]";

  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-media)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]",
        aspects[aspect],
        float && "animate-float",
        className,
      )}
    >
      {media?.kind === "image" ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", zoom)}
        />
      ) : media?.kind === "video" ? (
        <video
          src={media.src}
          poster={media.poster}
          aria-label={media.label}
          controls
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 size-full object-cover"
        />
      ) : children ? (
        <div
          aria-hidden
          className={cn("absolute inset-0 flex flex-col p-3 sm:p-5 md:p-8", tints[tint], zoom)}
        >
          {children}
        </div>
      ) : (
        <div
          role="img"
          aria-label={placeholder}
          className={cn("absolute inset-0 grid place-items-center p-6", tints[tint], zoom)}
        >
          <PlaceholderText
            value={placeholder}
            className="max-w-[24ch] text-center text-small text-fg-subtle"
          />
        </div>
      )}
    </div>
  );
}
