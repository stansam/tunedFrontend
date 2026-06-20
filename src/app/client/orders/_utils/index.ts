import type { OrderStatus, SortField } from "../_types";

export const STATUS_LABELS: Record<OrderStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  active: "In Progress",
  completed: "Completed",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export const STATUS_BADGE_CLASSES: Record<OrderStatus, string> = {
  draft: "bg-slate-100 text-slate-700 border border-slate-300",
  pending: "bg-slate-800 text-white",
  active: "bg-emerald-500 text-white",
  completed: "bg-blue-600 text-white",
  overdue: "bg-red-500 text-white",
  cancelled: "bg-zinc-400 text-white",
};

export const STATUS_DOT_CLASSES: Record<OrderStatus, string> = {
  draft: "bg-slate-400",
  pending: "bg-amber-400",
  active: "bg-emerald-500",
  completed: "bg-blue-500",
  overdue: "bg-red-500",
  cancelled: "bg-zinc-400",
};

export const SORT_OPTIONS: { label: string; value: SortField }[] = [
  { label: "Date", value: "created_at" },
  { label: "Due Date", value: "due_date" },
  { label: "Title", value: "title" },
];

export function formatPageCount(count: number): string {
  const rounded = Math.round(count * 2) / 2;
  return `${rounded} ${rounded === 1 ? "Page" : "Pages"}`;
}

export function formatDueDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "No deadline";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return "Invalid date";
  }
}

export function getTotalPages(total: number, perPage: number): number {
  return Math.max(1, Math.ceil(total / perPage));
}

export function buildPaginationWindow(
  page: number,
  totalPages: number,
  windowSize = 5,
): number[] {
  const start = Math.max(1, Math.min(page - Math.floor(windowSize / 2), totalPages - windowSize + 1));
  const end = Math.min(totalPages, start + windowSize - 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
