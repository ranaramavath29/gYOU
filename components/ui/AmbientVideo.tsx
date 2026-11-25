"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type AmbientVideoProps = {
  src: string;
  /** Describes the video for screen readers. */
  label: string;
  poster?: string;
  className?: string;
};

/**
 * Muted, looping background video for decorative media (hero tile, service
 * visuals). Plays only when on screen and never under prefers-reduced-motion;
 * a visible pause/play button keeps it under the visitor's control (WCAG 2.2.2).
 */
export function AmbientVideo({ src, label, poster, className }: AmbientVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Set synchronously on click, so a retry can never override the visitor's pause.
  const userPausedRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Respect data saver / very slow connections: keep the poster, don't stream the video.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const saveData =
      connection?.saveData === true || /(^|-)2g$/.test(connection?.effectiveType ?? "");
    if (reduced.matches || saveData || userPaused) {
      video.pause();
      return;
    }
    // Only play while visible, to save data and battery.
    let inView = false;
    let retry: number | undefined;
    const tryPlay = () => void video.play().catch(() => setPlaying(false));
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false;
        if (inView) tryPlay();
        else video.pause();
      },
      { threshold: 0.2 },
    );
    // Browsers pause muted videos that are invisible when play() runs (e.g. while a
    // parent Reveal is still at opacity 0). If that happens while in view, retry.
    const onBrowserPause = () => {
      if (!inView || document.hidden || userPausedRef.current) return;
      window.clearTimeout(retry);
      retry = window.setTimeout(() => {
        if (inView && video.paused && !userPausedRef.current) tryPlay();
      }, 800);
    };
    video.addEventListener("pause", onBrowserPause);
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onBrowserPause);
      window.clearTimeout(retry);
    };
  }, [userPaused]);

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn("absolute inset-0 size-full object-cover", className)}
      />
      <button
        type="button"
        onClick={() => {
          const video = ref.current;
          if (!video) return;
          if (video.paused) {
            userPausedRef.current = false;
            setUserPaused(false);
            void video.play().catch(() => undefined);
          } else {
            userPausedRef.current = true;
            setUserPaused(true);
            video.pause();
          }
        }}
        aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
        className="absolute right-3 bottom-3 z-10 grid size-11 place-items-center rounded-full bg-ink/70 text-bg backdrop-blur transition-colors [--focus-ring:var(--bg)] hover:bg-ink"
      >
        {playing ? (
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 1.5v11a.5.5 0 0 0 .77.42l8.5-5.5a.5.5 0 0 0 0-.84l-8.5-5.5A.5.5 0 0 0 3 1.5Z" />
          </svg>
        )}
      </button>
    </>
  );
}
