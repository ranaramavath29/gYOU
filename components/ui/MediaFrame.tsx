import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { PlaceholderText } from "@/components/PlaceholderText";
import { cn } from "@/lib/cn";
import { AmbientVideo } from "./AmbientVideo";

export type MediaSource =
  | {
      kind: "image";
      src: string;
      alt: string;
      /** CSS object-position, e.g. "50% 30%", to keep the subject in a crop. */
      position?: string;
    }
  | {
      kind: "video";
      src: string;
      label: string;
      poster?: string;
      /** Muted, looping, autoplaying background clip with a pause button. */
      ambient?: boolean;
    };

export type MediaAspect = "1/1" | "4/5" | "3/4" | "4/3" | "3/2" | "16/10" | "16/9" | "21/9";
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
  /** Content laid over real media (captions, labels). Add your own scrim for contrast. */
  overlay?: ReactNode;
  /** No drop shadow: for media already sitting inside a framed card. */
  flat?: boolean;
};

const aspects: Record<MediaAspect, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
};

const tints: Record<MediaTint, string> = {
  olive: "bg-[linear-gradient(135deg,#d3dcc9_0%,#c9d4bf_100%)]",
  graphite: "bg-[linear-gradient(135deg,#e9d6c2_0%,#d7b99c_100%)]",
  rust: "bg-[linear-gradient(135deg,#f6cfb7_0%,#f1c3a8_100%)]",
  navy: "bg-[linear-gradient(135deg,#e1e6ef_0%,#cdd5e3_100%)]",
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
  overlay,
  flat = false,
}: MediaFrameProps) {
  const style: CSSProperties | undefined = tilt ? { rotate: `${tilt}deg` } : undefined;
  const zoom =
    zoomOnHover && "transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]";

  return (
    <div
      style={style}
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-media)]",
        !flat && "shadow-[0_30px_60px_-30px_rgb(0_0_0/0.18)]",
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
          style={media.position ? { objectPosition: media.position } : undefined}
          className={cn("object-cover", zoom)}
        />
      ) : media?.kind === "video" && media.ambient ? (
        <AmbientVideo src={media.src} label={media.label} poster={media.poster} />
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
            className="max-w-[24ch] text-center text-small text-ink-muted"
          />
        </div>
      )}
      {media && overlay ? overlay : null}
    </div>
  );
}
