import type { OrderStatus, TimeRemaining } from "../_types";

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

export function computeTimeRemaining(dueDate: string | null): TimeRemaining {
  if (!dueDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: false };
  }
  const diff = new Date(dueDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOverdue: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isOverdue: false,
  };
}

export function formatDateTime(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function formatDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long", day: "numeric", year: "numeric",
    }).format(new Date(isoDate));
  } catch { return isoDate; }
}


export function formatCommentDay(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === now.toDateString()) return "Today";
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isImageFile(filename: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);
}

export function isAudioFile(filename: string): boolean {
  return /\.(webm|ogg|mp3|wav)$/i.test(filename);
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

export function formatVoiceDuration(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}
