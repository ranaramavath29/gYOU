import type { UseFormRegisterReturn } from "react-hook-form";
import { formCopy } from "@/content/forms";

/**
 * Anti-spam trap: hidden from people (off-screen, not focusable, aria-hidden)
 * but visible to simple bots, which tend to fill every field.
 */
export function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        {formCopy.honeypotLabel}
        <input type="text" tabIndex={-1} autoComplete="off" {...registration} />
      </label>
    </div>
  );
}
