export function sanitizeNotificationLink(link: string | null | undefined): string | null {
  if (!link) return null;
  const trimmed = link.trim();
  if (trimmed === "" || trimmed === "#") return "#";

  if (/^(javascript|data):/i.test(trimmed)) {
    return "#";
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return "#";
}
