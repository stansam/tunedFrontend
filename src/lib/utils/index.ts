import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isoUtcDatetime } from "./dateFormat"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { isoUtcDatetime }