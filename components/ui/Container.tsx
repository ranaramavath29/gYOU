import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Max-width 1320px, 32px side padding (20px on mobile). */
export function Container({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div {...rest} className={cn("mx-auto w-full max-w-[1320px] px-5 md:px-8", className)} />;
}
