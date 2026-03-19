import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isoUtcDatetime } from "./dateFormat"
// import { resolveServiceIcon, ResolvedServiceIcon } from "./serviceIcon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { isoUtcDatetime }
// export { resolveServiceIcon}
// export type { ResolvedServiceIcon }

export const placeholderImage = (text = "Image"): string =>
  `https://placehold.co/600x400/1a1a1a/ffffff?text=${encodeURIComponent(text)}`;

export const formatWordCount = (count: number): string => {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
  return `${count} words`;
}