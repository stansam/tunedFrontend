import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function parseOrderParams(params: URLSearchParams) {
  return {
    serviceId: params.get("service"),
    levelId: params.get("level"),
    pageCount: params.get("pages") ? parseInt(params.get("pages")!) : undefined,
    deadline: params.get("deadline"),
  };
}

export function computeWordCount(pages: number): number {
  const wordsPerPage = Number(process.env.NEXT_PUBLIC_WORDS_PER_PAGE ?? 275);
  return pages * wordsPerPage;
}

export function computeDeadlineISO(date: Date, time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const deadline = new Date(date);
  deadline.setHours(hours || 0, minutes || 0, 0, 0);
  return deadline.toISOString();
}
