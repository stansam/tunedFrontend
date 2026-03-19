export interface ServiceCategory {
  readonly id:          string;
  readonly name:        string;
  readonly description: string;
  readonly order:       number;
}

export interface ResolvedServiceIcon {
  readonly emoji:     string;
  readonly ariaLabel: string;
  readonly variantIndex: number;
}

interface KeywordSpec {
  readonly keyword: string;
  readonly weight:  number;
}

interface IconGroup {
  readonly id:         string;
  readonly keywords:   readonly KeywordSpec[];
  readonly variants:   readonly [string, ...string[]];
  readonly ariaLabels: readonly [string, ...string[]];
}


const ICON_GROUPS: readonly IconGroup[] = [

  {
    id: "dissertation",
    keywords: [
      { keyword: "dissertation", weight: 10 },
      { keyword: "thesis",       weight: 10 },
      { keyword: "phd",          weight: 10 },
      { keyword: "doctoral",     weight: 10 },
      { keyword: "masters",      weight:  8 },
      { keyword: "capstone",     weight:  6 },
    ],
    variants:   ["🎓", "📜", "🏛️"],
    ariaLabels: [
      "Dissertation and thesis writing",
      "Academic manuscript",
      "Academic institution",
    ],
  },

  {
    id: "admission",
    keywords: [
      { keyword: "admission",           weight: 10 },
      { keyword: "personal statement",  weight: 10 },
      { keyword: "statement of purpose", weight: 10 },
      { keyword: "application essay",   weight: 10 },
      { keyword: "college application", weight:  9 },
    ],
    variants:   ["🏫", "📨", "🎯"],
    ariaLabels: [
      "Admission writing",
      "Application writing",
      "Goal-oriented writing",
    ],
  },

  {
    id: "essay",
    keywords: [
      { keyword: "essay",            weight: 10 },
      { keyword: "academic writing", weight:  9 },
      { keyword: "composition",      weight:  8 },
      { keyword: "paragraph",        weight:  7 },
      { keyword: "argumentative",    weight:  7 },
      { keyword: "narrative writing", weight: 7 },
      { keyword: "expository",       weight:  7 },
      { keyword: "writing",          weight:  3 }, // broad — low weight
    ],
    variants:   ["📝", "✍️", "📖", "🖋️"],
    ariaLabels: [
      "Essay writing",
      "Academic composition",
      "Academic writing",
      "Written work",
    ],
  },

  {
    id: "research",
    keywords: [
      { keyword: "research paper",    weight: 10 },
      { keyword: "literature review", weight: 10 },
      { keyword: "bibliography",      weight:  9 },
      { keyword: "annotated",         weight:  8 },
      { keyword: "systematic review", weight:  9 },
      { keyword: "meta-analysis",     weight:  9 },
      { keyword: "research",          weight:  5 },
    ],
    variants:   ["🔬", "📚", "🔭", "🧫"],
    ariaLabels: [
      "Research writing",
      "Literature and bibliography",
      "Scientific research",
      "Lab research",
    ],
  },

  {
    id: "report",
    keywords: [
      { keyword: "technical report",  weight: 10 },
      { keyword: "lab report",        weight: 10 },
      { keyword: "progress report",   weight:  9 },
      { keyword: "annual report",     weight:  9 },
      { keyword: "case report",       weight:  9 },
      { keyword: "report writing",    weight:  9 },
      { keyword: "report",            weight:  4 }, // broad — low weight
    ],
    variants:   ["📋", "🗂️", "📑"],
    ariaLabels: [
      "Report writing",
      "File and records",
      "Document report",
    ],
  },

  {
    id: "business_writing",
    keywords: [
      { keyword: "business plan",   weight: 10 },
      { keyword: "business proposal", weight: 10 },
      { keyword: "proposal writing", weight:  9 },
      { keyword: "feasibility",     weight:  8 },
      { keyword: "pitch deck",      weight:  8 },
      { keyword: "business writing", weight: 7 },
      { keyword: "white paper",     weight:  7 },
    ],
    variants:   ["💼", "📊", "🤝"],
    ariaLabels: [
      "Business writing",
      "Business analytics",
      "Business proposal",
    ],
  },

  {
    id: "cv",
    keywords: [
      { keyword: "cover letter",       weight: 10 },
      { keyword: "curriculum vitae",   weight: 10 },
      { keyword: "resume",             weight: 10 },
      { keyword: "cv writing",         weight: 10 },
      { keyword: "linkedin profile",   weight:  8 },
      { keyword: "job application",    weight:  7 },
    ],
    variants:   ["📄", "🪪", "👔"],
    ariaLabels: [
      "CV and cover letter",
      "Professional identity",
      "Professional writing",
    ],
  },

  {
    id: "content_writing",
    keywords: [
      { keyword: "copywriting",      weight: 10 },
      { keyword: "content writing",  weight: 10 },
      { keyword: "blog writing",     weight:  9 },
      { keyword: "article writing",  weight:  9 },
      { keyword: "speech writing",   weight:  9 },
      { keyword: "ghostwriting",     weight:  9 },
      { keyword: "script writing",   weight:  8 },
      { keyword: "creative writing", weight:  8 },
    ],
    variants:   ["🖊️", "🗣️", "💬", "📰"],
    ariaLabels: [
      "Content writing",
      "Speech writing",
      "Creative writing",
      "Article writing",
    ],
  },

  {
    id: "editing",
    keywords: [
      { keyword: "proofreading",  weight: 10 },
      { keyword: "proofread",     weight: 10 },
      { keyword: "copy editing",  weight:  9 },
      { keyword: "line editing",  weight:  9 },
      { keyword: "developmental editing", weight: 9 },
      { keyword: "editorial",     weight:  8 },
      { keyword: "editing",       weight:  7 },
      { keyword: "edit",          weight:  5 },
    ],
    variants:   ["✏️", "🔍", "📌"],
    ariaLabels: [
      "Proofreading and editing",
      "Detailed review",
      "Annotation",
    ],
  },

  {
    id: "formatting",
    keywords: [
      { keyword: "formatting",   weight: 10 },
      { keyword: "style guide",  weight:  9 },
      { keyword: "apa",          weight:  9 },
      { keyword: "mla",          weight:  9 },
      { keyword: "chicago style", weight: 9 },
      { keyword: "harvard referencing", weight: 9 },
      { keyword: "citation",     weight:  8 },
      { keyword: "referencing",  weight:  8 },
    ],
    variants:   ["📐", "📏", "🗒️"],
    ariaLabels: [
      "Formatting and style",
      "Document structure",
      "Style notes",
    ],
  },

  {
    id: "plagiarism",
    keywords: [
      { keyword: "plagiarism",   weight: 10 },
      { keyword: "similarity check", weight: 10 },
      { keyword: "originality",  weight:  9 },
      { keyword: "turnitin",     weight:  9 },
    ],
    variants:   ["🔏", "🛡️", "🔒"],
    ariaLabels: [
      "Plagiarism check",
      "Originality shield",
      "Content security",
    ],
  },

  {
    id: "data_analysis",
    keywords: [
      { keyword: "data analysis",   weight: 10 },
      { keyword: "data analytics",  weight: 10 },
      { keyword: "statistical analysis", weight: 10 },
      { keyword: "quantitative",    weight:  9 },
      { keyword: "qualitative",     weight:  8 },
      { keyword: "spss",            weight: 10 },
      { keyword: "rstudio",         weight: 10 },
      { keyword: "r studio",        weight: 10 },
      { keyword: "stata",           weight: 10 },
      { keyword: "python analysis", weight: 10 },
      { keyword: "statistics",      weight:  7 },
      { keyword: "statistical",     weight:  6 },
    ],
    variants:   ["📊", "📈", "🧮", "📉"],
    ariaLabels: [
      "Data analysis",
      "Statistical trends",
      "Quantitative analysis",
      "Data metrics",
    ],
  },

  {
    id: "coding",
    keywords: [
      { keyword: "coding",         weight: 10 },
      { keyword: "programming",    weight: 10 },
      { keyword: "software development", weight: 10 },
      { keyword: "web development", weight: 9 },
      { keyword: "app development", weight: 9 },
      { keyword: "debugging",      weight:  9 },
      { keyword: "algorithm",      weight:  8 },
      { keyword: "software",       weight:  6 },
      { keyword: "code",           weight:  5 },
    ],
    variants:   ["💻", "⌨️", "🖥️", "🧩"],
    ariaLabels: [
      "Coding and programming",
      "Keyboard / development",
      "Computer science",
      "Software architecture",
    ],
  },

  {
    id: "mathematics",
    keywords: [
      { keyword: "mathematics",    weight: 10 },
      { keyword: "calculus",       weight: 10 },
      { keyword: "algebra",        weight: 10 },
      { keyword: "trigonometry",   weight: 10 },
      { keyword: "differential equations", weight: 10 },
      { keyword: "linear algebra", weight: 10 },
      { keyword: "numerical methods", weight: 9 },
      { keyword: "mathematical",   weight:  8 },
      { keyword: "equation",       weight:  7 },
      { keyword: "math",           weight:  5 },
    ],
    variants:   ["➗", "∑", "📐", "🔢"],
    ariaLabels: [
      "Mathematics",
      "Mathematical notation",
      "Geometry and maths",
      "Numerical mathematics",
    ],
  },

  {
    id: "engineering",
    keywords: [
      { keyword: "mechanical engineering",  weight: 10 },
      { keyword: "civil engineering",       weight: 10 },
      { keyword: "electrical engineering",  weight: 10 },
      { keyword: "chemical engineering",    weight: 10 },
      { keyword: "structural engineering",  weight: 10 },
      { keyword: "engineering drawing",     weight:  9 },
      { keyword: "engineering",             weight:  6 },
    ],
    variants:   ["⚙️", "🔧", "🏗️", "⚡"],
    ariaLabels: [
      "Engineering",
      "Mechanical engineering",
      "Civil engineering",
      "Electrical engineering",
    ],
  },

  {
    id: "science",
    keywords: [
      { keyword: "biology",       weight: 10 },
      { keyword: "chemistry",     weight: 10 },
      { keyword: "physics",       weight: 10 },
      { keyword: "microbiology",  weight: 10 },
      { keyword: "biochemistry",  weight: 10 },
      { keyword: "genetics",      weight:  9 },
      { keyword: "ecology",       weight:  9 },
      { keyword: "scientific",    weight:  7 },
      { keyword: "science",       weight:  5 },
    ],
    variants:   ["🧪", "🧬", "⚗️", "🔭"],
    ariaLabels: [
      "Science",
      "Biology and genetics",
      "Chemistry",
      "Astronomy and physics",
    ],
  },

  {
    id: "presentation",
    keywords: [
      { keyword: "presentation",  weight: 10 },
      { keyword: "powerpoint",    weight: 10 },
      { keyword: "keynote",       weight: 10 },
      { keyword: "slide deck",    weight: 10 },
      { keyword: "slides",        weight:  8 },
      { keyword: "deck",          weight:  6 },
    ],
    variants:   ["🎯", "🖼️", "📽️"],
    ariaLabels: [
      "Presentations",
      "Slide design",
      "Presentation media",
    ],
  },

  {
    id: "design",
    keywords: [
      { keyword: "graphic design",  weight: 10 },
      { keyword: "infographic",     weight: 10 },
      { keyword: "ui design",       weight: 10 },
      { keyword: "ux design",       weight: 10 },
      { keyword: "branding design", weight:  9 },
      { keyword: "illustration",    weight:  9 },
      { keyword: "visual",          weight:  6 },
      { keyword: "design",          weight:  4 },
    ],
    variants:   ["🎨", "🖌️", "✏️", "🖍️"],
    ariaLabels: [
      "Graphic design",
      "Visual design",
      "Illustration",
      "Creative design",
    ],
  },

  {
    id: "finance",
    keywords: [
      { keyword: "accounting",      weight: 10 },
      { keyword: "financial analysis", weight: 10 },
      { keyword: "financial modelling", weight: 10 },
      { keyword: "economics",       weight:  9 },
      { keyword: "econometrics",    weight: 10 },
      { keyword: "auditing",        weight:  9 },
      { keyword: "taxation",        weight:  9 },
      { keyword: "finance",         weight:  6 },
      { keyword: "financial",       weight:  5 },
      { keyword: "economic",        weight:  4 },
    ],
    variants:   ["💰", "💹", "🏦", "💳"],
    ariaLabels: [
      "Finance and accounting",
      "Financial markets",
      "Banking",
      "Financial transactions",
    ],
  },

  {
    id: "marketing",
    keywords: [
      { keyword: "digital marketing", weight: 10 },
      { keyword: "search engine optimisation", weight: 10 },
      { keyword: "search engine optimization",  weight: 10 },
      { keyword: "social media marketing",      weight: 10 },
      { keyword: "seo",            weight: 10 },
      { keyword: "advertising",    weight:  9 },
      { keyword: "branding",       weight:  8 },
      { keyword: "public relations", weight: 8 },
      { keyword: "marketing",      weight:  6 },
    ],
    variants:   ["📢", "📣", "🚀", "📱"],
    ariaLabels: [
      "Marketing",
      "Advertising",
      "Growth and campaigns",
      "Social media marketing",
    ],
  },

  {
    id: "legal",
    keywords: [
      { keyword: "contract drafting",  weight: 10 },
      { keyword: "legal writing",      weight: 10 },
      { keyword: "litigation",         weight: 10 },
      { keyword: "judicial",           weight: 10 },
      { keyword: "tort",               weight:  9 },
      { keyword: "constitutional law", weight:  9 },
      { keyword: "intellectual property", weight: 9 },
      { keyword: "contract",           weight:  7 },
      { keyword: "legal",              weight:  6 },
      { keyword: "law",                weight:  5 },
    ],
    variants:   ["⚖️", "📜", "🏛️", "🔏"],
    ariaLabels: [
      "Legal writing",
      "Legal documentation",
      "Law and judiciary",
      "Legal compliance",
    ],
  },

  {
    id: "medical",
    keywords: [
      { keyword: "nursing",           weight: 10 },
      { keyword: "medicine",          weight: 10 },
      { keyword: "clinical writing",  weight: 10 },
      { keyword: "patient care",      weight: 10 },
      { keyword: "pharmacology",      weight: 10 },
      { keyword: "healthcare writing", weight: 9 },
      { keyword: "public health",     weight:  9 },
      { keyword: "medical writing",   weight:  9 },
      { keyword: "healthcare",        weight:  7 },
      { keyword: "medical",           weight:  6 },
      { keyword: "clinical",          weight:  5 },
    ],
    variants:   ["🏥", "💊", "🩺", "🩻"],
    ariaLabels: [
      "Medical writing",
      "Pharmacology",
      "Clinical practice",
      "Medical imaging",
    ],
  },

  {
    id: "psychology",
    keywords: [
      { keyword: "psychology",      weight: 10 },
      { keyword: "psychotherapy",   weight: 10 },
      { keyword: "counselling",     weight:  9 },
      { keyword: "counseling",      weight:  9 },
      { keyword: "sociology",       weight:  9 },
      { keyword: "social work",     weight:  9 },
      { keyword: "mental health",   weight:  9 },
      { keyword: "social science",  weight:  7 },
      { keyword: "behavioural",     weight:  7 },
      { keyword: "behavioral",      weight:  7 },
    ],
    variants:   ["🧠", "💭", "🫂", "🪞"],
    ariaLabels: [
      "Psychology",
      "Mental health",
      "Counselling",
      "Reflective practice",
    ],
  },

  {
    id: "education",
    keywords: [
      { keyword: "education",        weight: 10 },
      { keyword: "pedagogy",         weight: 10 },
      { keyword: "curriculum",       weight:  9 },
      { keyword: "lesson plan",      weight:  9 },
      { keyword: "teaching",         weight:  8 },
      { keyword: "e-learning",       weight:  8 },
      { keyword: "instructional design", weight: 9 },
    ],
    variants:   ["🍎", "📚", "🏫", "🖊️"],
    ariaLabels: [
      "Education",
      "Learning resources",
      "Educational institution",
      "Teaching",
    ],
  },

  {
    id: "translation",
    keywords: [
      { keyword: "translation",    weight: 10 },
      { keyword: "localisation",   weight: 10 },
      { keyword: "localization",   weight: 10 },
      { keyword: "interpreting",   weight:  9 },
      { keyword: "subtitling",     weight:  8 },
      { keyword: "translate",      weight:  8 },
    ],
    variants:   ["🌐", "🗺️", "🌍"],
    ariaLabels: [
      "Translation and localisation",
      "Global content",
      "International services",
    ],
  },

  {
    id: "transcription",
    keywords: [
      { keyword: "transcription",  weight: 10 },
      { keyword: "audio transcription", weight: 10 },
      { keyword: "video transcription", weight: 10 },
      { keyword: "captioning",     weight:  9 },
      { keyword: "transcript",     weight:  8 },
      { keyword: "audio",          weight:  5 },
    ],
    variants:   ["🎙️", "🎧", "📻"],
    ariaLabels: [
      "Transcription",
      "Audio processing",
      "Media transcription",
    ],
  },

] as const satisfies readonly IconGroup[];

function normalise(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SCORE_MULTIPLIERS = {
  exactWordInName: 4,
  substringInName: 2,
  exactWordInDescription: 2,
  substringInDescription: 1,
} as const;

interface GroupScore {
  readonly groupId:    string;
  readonly groupIndex: number;
  readonly score:      number;
}

function wordBoundaryPattern(normalisedKeyword: string): RegExp {
  const escaped = normalisedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");
}

function scoreGroup(
  group: IconGroup,
  normName: string,
  normDesc: string,
): number {
  let total = 0;

  for (const { keyword, weight } of group.keywords) {
    const normKw = normalise(keyword);
    const wbPattern = wordBoundaryPattern(normKw);

    if (wbPattern.test(normName)) {
      total += weight * SCORE_MULTIPLIERS.exactWordInName;
    } else if (normName.includes(normKw)) {
      total += weight * SCORE_MULTIPLIERS.substringInName;
    }

    if (wbPattern.test(normDesc)) {
      total += weight * SCORE_MULTIPLIERS.exactWordInDescription;
    } else if (normDesc.includes(normKw)) {
      total += weight * SCORE_MULTIPLIERS.substringInDescription;
    }
  }

  return total;
}

function rankGroups(
  normName: string,
  normDesc: string,
): readonly GroupScore[] {
  const scored: GroupScore[] = [];

  for (let i = 0; i < ICON_GROUPS.length; i++) {
    const group = ICON_GROUPS[i]!;
    const score = scoreGroup(group, normName, normDesc);
    if (score > 0) {
      scored.push({ groupId: group.id, groupIndex: i, score });
    }
  }

  return scored.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : a.groupIndex - b.groupIndex,
  );
}

type VariantCursor = Map<string, number>;

function nextVariant(
  groupId:  string,
  group:    IconGroup,
  cursor:   VariantCursor,
): { emoji: string; ariaLabel: string; variantIndex: number } {
  const used  = cursor.get(groupId) ?? 0;
  const index = used % group.variants.length;
  cursor.set(groupId, used + 1);
  return {
    emoji:        group.variants[index]!,
    ariaLabel:    group.ariaLabels[index]!,
    variantIndex: index,
  };
}

const FALLBACK: ResolvedServiceIcon = {
  emoji:        "📄",
  ariaLabel:    "Service",
  variantIndex: 0,
} as const;

function resolveOne(
  service: ServiceCategory,
  cursor:  VariantCursor,
): ResolvedServiceIcon {
  const normName = normalise(service.name);
  const normDesc = normalise(service.description ?? "");

  const ranked = rankGroups(normName, normDesc);
  if (ranked.length === 0) return FALLBACK;

  const best  = ranked[0]!;
  const group = ICON_GROUPS[best.groupIndex]!;
  const { emoji, ariaLabel, variantIndex } = nextVariant(group.id, group, cursor);

  return { emoji, ariaLabel, variantIndex };
}

export function resolveServiceIcons(
  services: readonly ServiceCategory[],
): ReadonlyMap<string, ResolvedServiceIcon> {
  const sorted = [...services].sort((a, b) => a.order - b.order);

  const cursor: VariantCursor = new Map();
  const result                = new Map<string, ResolvedServiceIcon>();

  for (const service of sorted) {
    result.set(service.id, resolveOne(service, cursor));
  }

  return result;
}

export function resolveServiceIcon(service: ServiceCategory): ResolvedServiceIcon {
  const cursor: VariantCursor = new Map();
  return resolveOne(service, cursor);
}

export const FALLBACK_ICON: Readonly<ResolvedServiceIcon> = FALLBACK;