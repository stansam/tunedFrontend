import type { ServiceIconMapping } from "@/lib/types";
import type { Service } from "@/app/(main)/_types";

const SERVICE_ICON_MAPPINGS: readonly ServiceIconMapping[] = [
  // ── Writing & Composition ─────────────────────────────────────────────────
  {
    keywords:  ["essay", "writing", "composition", "academic writing", "admission"],
    emoji:     "📝",
    ariaLabel: "Essay writing",
  },
  {
    keywords:  ["dissertation", "thesis", "phd"],
    emoji:     "🎓",
    ariaLabel: "Dissertation writing",
  },
  {
    keywords:  ["research", "literature review", "bibliography", "annotated"],
    emoji:     "🔬",
    ariaLabel: "Research writing",
  },
  {
    keywords:  ["report", "technical report", "lab report"],
    emoji:     "📋",
    ariaLabel: "Report writing",
  },
  {
    keywords:  ["business plan", "proposal", "business writing"],
    emoji:     "💼",
    ariaLabel: "Business writing",
  },
  {
    keywords:  ["cover letter", "resume", "cv", "curriculum vitae"],
    emoji:     "📄",
    ariaLabel: "CV and cover letter",
  },
  {
    keywords:  ["speech", "script", "copywriting", "content writing"],
    emoji:     "🖊️",
    ariaLabel: "Content writing",
  },

  // ── Editing & Proofreading ────────────────────────────────────────────────
  {
    keywords:  ["proofreading", "proofread", "editing", "edit", "editorial"],
    emoji:     "✍️",
    ariaLabel: "Proofreading and editing",
  },
  {
    keywords:  ["formatting", "style guide", "apa", "mla", "chicago", "harvard"],
    emoji:     "📐",
    ariaLabel: "Formatting",
  },
  {
    keywords:  ["plagiarism", "similarity", "originality"],
    emoji:     "🔏",
    ariaLabel: "Plagiarism check",
  },

  // ── Technical & STEM ──────────────────────────────────────────────────────
  {
    keywords:  ["data analysis", "data analytics", "statistical", "statistics", "spss", "r studio", "stata"],
    emoji:     "📊",
    ariaLabel: "Data analysis",
  },
  {
    keywords:  ["coding", "programming", "code", "software", "development", "debugging", "algorithm"],
    emoji:     "💻",
    ariaLabel: "Coding and programming",
  },
  {
    keywords:  ["math", "mathematics", "calculus", "algebra", "equation", "numerical"],
    emoji:     "➗",
    ariaLabel: "Mathematics",
  },
  {
    keywords:  ["engineering", "mechanical", "civil", "electrical", "chemical engineering"],
    emoji:     "⚙️",
    ariaLabel: "Engineering",
  },
  {
    keywords:  ["science", "biology", "chemistry", "physics", "scientific"],
    emoji:     "🧪",
    ariaLabel: "Science",
  },

  // ── Design & Media ─────────────────────────────────────────────────────────
  {
    keywords:  ["presentation", "slides", "powerpoint", "keynote", "deck"],
    emoji:     "🎯",
    ariaLabel: "Presentations",
  },
  {
    keywords:  ["design", "graphic", "infographic", "visual"],
    emoji:     "🎨",
    ariaLabel: "Design",
  },

  // ── Business & Finance ─────────────────────────────────────────────────────
  {
    keywords:  ["accounting", "finance", "financial", "economics", "economic"],
    emoji:     "💰",
    ariaLabel: "Finance and accounting",
  },
  {
    keywords:  ["marketing", "seo", "social media", "branding", "advertising"],
    emoji:     "📢",
    ariaLabel: "Marketing",
  },

  // ── Legal & Medical ────────────────────────────────────────────────────────
  {
    keywords:  ["law", "legal", "contract", "litigation", "judicial"],
    emoji:     "⚖️",
    ariaLabel: "Legal writing",
  },
  {
    keywords:  ["nursing", "medicine", "medical", "healthcare", "clinical", "patient"],
    emoji:     "🏥",
    ariaLabel: "Medical writing",
  },

  // ── Language ───────────────────────────────────────────────────────────────
  {
    keywords:  ["translation", "translate", "localisation", "localization"],
    emoji:     "🌐",
    ariaLabel: "Translation",
  },
  {
    keywords:  ["transcription", "transcript", "audio"],
    emoji:     "🎙️",
    ariaLabel: "Transcription",
  },
] as const;

function normalise(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s&]/g, " ")
    .replace(/\s+/g, " ");
}

export interface ResolvedServiceIcon {
  readonly emoji:     string;
  readonly ariaLabel: string;
}

/**
 * Resolves a display icon for a given service.
 *
 * @param service - The service object from the API response.
 * @returns An object containing the emoji and its aria label.
 */
export function resolveServiceIcon(service: Service): ResolvedServiceIcon {
  const haystack = [
    normalise(service.name),
    normalise(service.slug),
    normalise(service.category_id),
    ...service.tags.map((t) => normalise(t.name)),
  ].join(" ");

  for (const mapping of SERVICE_ICON_MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (haystack.includes(normalise(keyword))) {
        return { emoji: mapping.emoji, ariaLabel: mapping.ariaLabel };
      }
    }
  }

  return { emoji: "📄", ariaLabel: "Service" };
}

export function resolveIconByNameSlug(
  name: string,
  slug: string,
  categoryId: string = ""
): ResolvedServiceIcon {
  const stub: Service = {
    id:                  "",
    name,
    description:         "",
    category_id:         categoryId,
    featured:            false,
    pricing_category_id: "",
    slug,
    is_active:           true,
    tags:                [],
  };
  return resolveServiceIcon(stub);
}
