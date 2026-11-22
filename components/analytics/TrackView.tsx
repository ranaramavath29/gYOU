"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

type Props =
  | { event: "service_page_view"; params: { service: string } }
  | { event: "case_study_view"; params: { case_study: string } };

/** Fires a page-view style event once when the page mounts. */
export function TrackView(props: Props) {
  const key = JSON.stringify(props);
  useEffect(() => {
    const p = JSON.parse(key) as Props;
    if (p.event === "service_page_view") track(p.event, p.params);
    else track(p.event, p.params);
  }, [key]);
  return null;
}
