import type { Sample, SampleViewModel } from "./_types/sample.type";

const WORDS_PER_MINUTE = 238;
const MIN_READ_TIME   = 1;

const STRIP_TAGS_RE  = /<[^>]*>/g;
const WHITESPACE_RE  = /\s+/g;

export function formatWordCount(count: number): string {
  if (!count || count <= 0) return "—";
  return `${new Intl.NumberFormat("en-US").format(count)} words`;
}

export function readTimeFromWordCount(wordCount: number): number {
  if (!wordCount || wordCount <= 0) return MIN_READ_TIME;
  return Math.max(MIN_READ_TIME, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "…";
}

export function stripHtmlToText(html: string): string {
  if (!html) return "";
  return html
    .replace(STRIP_TAGS_RE, " ")
    .replace(WHITESPACE_RE, " ")
    .trim();
}

const TRUSTED_IMAGE_ORIGINS = new Set([
  "https://images.unsplash.com",
  "https://res.cloudinary.com",
  "https://cdn.tunedessays.com",
  "https://storage.googleapis.com",
  "https://s3.amazonaws.com",
]);

const FALLBACK_SAMPLE_IMAGE =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1400&q=80";

export function validateSampleImage(
  url: string | null | undefined,
  allowedOrigins: ReadonlySet<string> = TRUSTED_IMAGE_ORIGINS
): string {
  if (!url) return FALLBACK_SAMPLE_IMAGE;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return FALLBACK_SAMPLE_IMAGE;
    const origin = `${parsed.protocol}//${parsed.host}`;
    return allowedOrigins.has(origin) ? url : FALLBACK_SAMPLE_IMAGE;
  } catch {
    return FALLBACK_SAMPLE_IMAGE;
  }
}

const SERVICE_COLOUR_CLASSES = [
  { bg: "bg-emerald-50",  border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500"  },
  { bg: "bg-teal-50",     border: "border-teal-200",    text: "text-teal-700",    dot: "bg-teal-500"    },
  { bg: "bg-sky-50",      border: "border-sky-200",     text: "text-sky-700",     dot: "bg-sky-500"     },
  { bg: "bg-violet-50",   border: "border-violet-200",  text: "text-violet-700",  dot: "bg-violet-500"  },
  { bg: "bg-rose-50",     border: "border-rose-200",    text: "text-rose-700",    dot: "bg-rose-500"    },
  { bg: "bg-amber-50",    border: "border-amber-200",   text: "text-amber-700",   dot: "bg-amber-500"   },
  { bg: "bg-cyan-50",     border: "border-cyan-200",    text: "text-cyan-700",    dot: "bg-cyan-500"    },
  { bg: "bg-indigo-50",   border: "border-indigo-200",  text: "text-indigo-700",  dot: "bg-indigo-500"  },
] as const;

export type ServiceColour = (typeof SERVICE_COLOUR_CLASSES)[number];

export function getServiceColour(name: string): ServiceColour {
  if (!name) return SERVICE_COLOUR_CLASSES[0];
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return SERVICE_COLOUR_CLASSES[hash % SERVICE_COLOUR_CLASSES.length]!;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function toSampleViewModel(sample: Sample): SampleViewModel {
  const safeImage = validateSampleImage(sample.image);
  const colour    = getServiceColour(sample.service.name);

  return {
    id:                 sample.id,
    title:              sample.title,
    slug:               sample.slug,
    excerpt:            sample.excerpt,
    wordCount:          sample.word_count,
    wordCountFormatted: formatWordCount(sample.word_count),
    readTimeMinutes:    readTimeFromWordCount(sample.word_count),
    featured:           sample.featured,
    image:              safeImage,
    tags:               sample.tags,
    service:            sample.service,
    serviceColourClass: colour.bg,
    shortExcerpt:       truncateText(stripHtmlToText(sample.excerpt), 160),
  };
}

export function getServiceColourTokens(serviceName: string): ServiceColour {
  return getServiceColour(serviceName);
}