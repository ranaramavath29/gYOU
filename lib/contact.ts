import { isPlaceholder } from "./ph";

/**
 * Link builders for contact details. Each returns undefined while the value
 * is still a placeholder, so no broken tel:/mailto:/wa.me link is rendered.
 */

const digits = (value: string) => value.replace(/[^\d]/g, "");

export function telHref(phone: string): string | undefined {
  if (isPlaceholder(phone)) return undefined;
  return `tel:+${digits(phone)}`;
}

export function mailHref(email: string): string | undefined {
  if (isPlaceholder(email)) return undefined;
  return `mailto:${email}`;
}

/** True when the phone and WhatsApp numbers are the same real number. */
export function isSameNumber(phone: string, whatsapp: string): boolean {
  if (isPlaceholder(phone) || isPlaceholder(whatsapp)) return false;
  return digits(phone) === digits(whatsapp);
}

export function whatsappHref(number: string, message?: string): string | undefined {
  if (isPlaceholder(number)) return undefined;
  const text = message && !isPlaceholder(message) ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits(number)}${text}`;
}
