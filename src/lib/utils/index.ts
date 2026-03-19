import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isoUtcDatetime } from "./dateFormat"
import { resolveServiceIcon, resolveIconByNameSlug, ResolvedServiceIcon } from "./serviceIcon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { isoUtcDatetime }
export { resolveServiceIcon, resolveIconByNameSlug }
export type { ResolvedServiceIcon }
