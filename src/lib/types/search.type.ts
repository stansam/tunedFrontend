export interface SuggestionItem {
  id: string;
  name?: string;
  title?: string;
  slug: string;
}

export interface SearchSuggestionsResponse {
  services: SuggestionItem[];
  samples: SuggestionItem[];
  blogs: SuggestionItem[];
  tags: SuggestionItem[];
}

export interface SearchCounts {
  services: number;
  samples: number;
  blogs: number;
  faqs: number;
  tags: number;
  total: number;
}

export interface SearchResultItem {
  id: string;
  type: 'service' | 'sample' | 'blog' | 'faq' | 'tag';
  title: string;
  slug?: string | null;
  description?: string | null;
  category?: string | null;
  service?: string | null;
  published_at?: string | null;
  usage_count?: number | null;
  question?: string | null;
  answer?: string | null;
}

export interface SearchResponse {
  query: string;
  type: string;
  results: {
    services: SearchResultItem[];
    samples: SearchResultItem[];
    blogs: SearchResultItem[];
    faqs: SearchResultItem[];
    tags: SearchResultItem[];
  };
  counts: SearchCounts;
}