// import type { TocItem } from "./_props/post.prop";
// import type { BlogPost, BlogPostViewModel, OptimisticAction, BlogComment } from "./_types/post.type";

// const WORDS_PER_MINUTE = 200;

// export function calculateReadTime(content: string): number {
//   const stripped = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
//   const wordCount = stripped.split(" ").length;
//   return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
// }

// export function getAuthorInitials(name: string): string {
//   return name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((n) => n.charAt(0).toUpperCase())
//     .join("");
// }

// const DATE_FORMAT: Intl.DateTimeFormatOptions = {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

// export function formatPublishedDate(isoString: string): string {
//   if (!isoString) return "";
//   try {
//     return new Intl.DateTimeFormat("en-US", DATE_FORMAT).format(
//       new Date(isoString)
//     );
//   } catch {
//     return isoString;
//   }
// }

// export function formatCommentDate(isoString: string): string {
//   if (!isoString) return "";
//   try {
//     const date = new Date(isoString);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return "Today";
//     if (diffDays === 1) return "Yesterday";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
//     return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
//   } catch {
//     return "";
//   }
// }

// export function extractToc(htmlContent: string): TocItem[] {
//   const headingRegex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
//   const headingNoIdRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
//   const items: TocItem[] = [];

//   let match: RegExpExecArray | null;
//   const hasIds = headingRegex.test(htmlContent);
//   headingRegex.lastIndex = 0;

//   if (hasIds) {
//     while ((match = headingRegex.exec(htmlContent)) !== null) {
//       const level = parseInt(match[1], 10) as 2 | 3;
//       const id = match[2];
//       const text = match[3].replace(/<[^>]*>/g, "").trim();
//       if (id && text) items.push({ id, text, level });
//     }
//   } else {
//     while ((match = headingNoIdRegex.exec(htmlContent)) !== null) {
//       const level = parseInt(match[1], 10) as 2 | 3;
//       const text = match[2].replace(/<[^>]*>/g, "").trim();
//       if (text) {
//         const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
//         items.push({ id, text, level });
//       }
//     }
//   }

//   return items;
// }

// export function injectHeadingIds(html: string): string {
//   return html.replace(
//     /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
//     (_, level, attrs, inner) => {
//       if (/id=/i.test(attrs)) return _;
//       const text = inner.replace(/<[^>]*>/g, "").trim();
//       const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
//       return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
//     }
//   );
// }

// export function toBlogPostViewModel(post: BlogPost): BlogPostViewModel {
//   return {
//     id: post.id,
//     title: post.title,
//     slug: post.slug,
//     excerpt: post.excerpt,
//     content: injectHeadingIds(post.content),
//     author: post.author,
//     authorInitials: getAuthorInitials(post.author),
//     category: post.category ?? null,
//     tags: post.tags,
//     featuredImage:
//       post.featured_image ||
//       "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80",
//     publishedAt: formatPublishedDate(post.published_at),
//     readTimeMinutes: calculateReadTime(post.content),
//     isFeatured: post.is_featured,
//     commentCount: post.comments.length,
//     comments: post.comments,
//   };
// }

// // TODO: replace with DOMPurify 
// const DANGEROUS_PATTERNS: RegExp[] = [
//   /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
//   /on\w+="[^"]*"/gi,
//   /javascript:/gi,
//   /data:text\/html/gi,
// ];

// export function sanitizeText(text: string): string {
//   return DANGEROUS_PATTERNS.reduce(
//     (acc, pattern) => acc.replace(pattern, ""),
//     text
//   );
// }

// export function commentsReducer(
//   state: readonly BlogComment[],
//   action: OptimisticAction
// ): readonly BlogComment[] {
//   switch (action.type) {
//     case "ADD":
//       return [action.comment, ...state];
//     case "UPDATE_REACTION":
//       return state.map((c) =>
//         c.id === action.commentId
//           ? { ...c, total_likes: action.likes, total_dislikes: action.dislikes }
//           : c
//       );
//     default:
//       return state;
//   }
// }
//     // export function extractToc(htmlContent: string): TocItem[] {
//     //   const parser = new DOMParser();
//     //   const doc = parser.parseFromString(htmlContent, "text/html");
    
//     //   const headings = doc.querySelectorAll("h2, h3");
//     //   const items: TocItem[] = [];
//     //   const idCount: Record<string, number> = {};
    
//     //   headings.forEach((el) => {
//     //     const level = Number(el.tagName.replace("H", "")) as 1 | 2 | 3 | 4 | 5 | 6;
//     //     const text = el.textContent?.trim() || "";
    
//     //     if (!text) return;
    
//     //     let id = el.id;
    
//     //     if (!id) {
//     //       id = text
//     //         .toLowerCase()
//     //         .replace(/[^a-z0-9]+/g, "-")
//     //         .replace(/^-|-$/g, "");
//     //     }
    
//     //     // ensure uniqueness
//     //     if (idCount[id]) {
//     //       idCount[id]++;
//     //       id = `${id}-${idCount[id]}`;
//     //     } else {
//     //       idCount[id] = 1;
//     //     }
    
//     //     items.push({ id, text, level });
//     //   });
    
//     //   return items;
//     // }

import type { TocItem } from "./_props/post.prop";
import type { BlogPost, BlogPostViewModel, OptimisticAction, BlogComment } from "./_types/post.type";

const WORDS_PER_MINUTE = 200;

export function calculateReadTime(content: string): number {
  if (!content) return 1;
  const stripped = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  const wordCount = stripped.split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function getAuthorInitials(name: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n.charAt(0).toUpperCase())
    .join("");
}

const PUBLISHED_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const SHORT_DATE_FORMAT: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};

export function formatPublishedDate(isoString: string | undefined | null): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", PUBLISHED_DATE_FORMAT).format(date);
  } catch {
    return "";
  }
}

export function formatCommentDate(isoString: string | undefined | null): string {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    if (diffMs < 0) return new Intl.DateTimeFormat("en-US", SHORT_DATE_FORMAT).format(date);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return new Intl.DateTimeFormat("en-US", SHORT_DATE_FORMAT).format(date);
  } catch {
    return "";
  }
}

function slugify(text: string, seen: Map<string, number>): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export function extractToc(htmlContent: string): TocItem[] {
  if (!htmlContent) return [];

  const seen = new Map<string, number>();
  const items: TocItem[] = [];

  const headingRegex = /<h([23])([^>]*)>(.*?)<\/h[23]>/gi;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]!, 10) as 2 | 3;
    const attrs = match[2] ?? "";
    const inner = match[3] ?? "";
    const text = inner.replace(/<[^>]*>/g, "").trim();

    if (!text) continue;

    const existingId = /id="([^"]+)"/i.exec(attrs)?.[1];
    const id = existingId ?? slugify(text, seen);

    if (!existingId) {
      seen.set(id.replace(/-\d+$/, ""), (seen.get(id.replace(/-\d+$/, "")) ?? 1));
    }

    items.push({ id, text, level });
  }

  return items;
}

export function injectHeadingIds(html: string): string {
  if (!html) return "";

  const seen = new Map<string, number>();

  return html.replace(
    /<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
    (original, level: string, attrs: string, inner: string) => {
      if (/id=/i.test(attrs)) return original;

      const text = inner.replace(/<[^>]*>/g, "").trim();
      if (!text) return original;

      const id = slugify(text, seen);
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    }
  );
}

const FALLBACK_FEATURED_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80";

export function toBlogPostViewModel(post: BlogPost): BlogPostViewModel {
  const content = post.content ?? "";
  const publishedAt = post.published_at ?? "";
  const comments: readonly BlogComment[] = post.comments ?? [];

  return {
    id: post.id,
    title: post.title ?? "",
    slug: post.slug ?? "",
    excerpt: post.excerpt ?? "",
    content: injectHeadingIds(content),
    author: post.author ?? "",
    authorInitials: getAuthorInitials(post.author ?? ""),
    category: post.category ?? null,
    tags: post.tags ?? [],
    featuredImage: post.featured_image || FALLBACK_FEATURED_IMAGE,
    publishedAt: formatPublishedDate(publishedAt),
    readTimeMinutes: calculateReadTime(content),
    isFeatured: post.is_featured ?? false,
    commentCount: comments.length,
    comments,
  };
}

// TODO: replace with DOMPurify on the client / sanitize-html on the server
// for full protection against novel XSS vectors.

const DANGEROUS_PATTERNS: RegExp[] = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^>]*>/gi,
  /\bon\w+\s*=\s*["'][^"']*["']/gi,    // onerror="…" / onclick='…'
  /\bon\w+\s*=\s*[^\s>]*/gi,           // onerror=fn (unquoted)
  /javascript\s*:/gi,
  /vbscript\s*:/gi,
  /data\s*:\s*text\/html/gi,
];

export function sanitizeText(text: string): string {
  if (!text) return "";
  return DANGEROUS_PATTERNS.reduce(
    (acc, pattern) => acc.replace(pattern, ""),
    text
  );
}

export function commentsReducer(
  state: readonly BlogComment[],
  action: OptimisticAction
): readonly BlogComment[] {
  switch (action.type) {
    case "ADD":
      return [action.comment, ...state];

    case "UPDATE_REACTION":
      return state.map((c) =>
        c.id === action.commentId
          ? {
              ...c,
              total_likes: action.likes,
              total_dislikes: action.dislikes,
            }
          : c
      );

    default:
      return state;
  }
}