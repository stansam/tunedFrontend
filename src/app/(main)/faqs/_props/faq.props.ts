import type { FaqItem, FaqCategories } from "../_types/faq.types";

export interface FaqClientProps {
  readonly faqs: readonly FaqItem[];
}

export interface FaqSearchBarProps {
  readonly value:    string;
  readonly onChange: (value: string) => void;
}

export interface FaqFiltersProps {
  readonly categories:     FaqCategories;
  readonly activeCategory: string;
  readonly categoryCounts: Readonly<Record<string, number>>;
  readonly onSelect:       (category: string) => void;
}

export interface FaqListProps {
  readonly faqs:           readonly FaqItem[];
  readonly openItemId:     string | null;
  readonly onToggle:       (id: string) => void;
  readonly activeCategory: string;
  readonly search:         string;
  readonly onClearSearch:  () => void;
  readonly onBrowseAll:    () => void;
}

export interface FaqItemProps {
  readonly faq:      FaqItem;
  readonly isOpen:   boolean;
  readonly onToggle: () => void;
}

export interface FaqEmptyStateProps {
  readonly search:         string;
  readonly onClearSearch:  () => void;
  readonly onBrowseAll:    () => void;
}

export interface FaqSidebarProps {
  readonly categories:     FaqCategories;
  readonly activeCategory: string;
  readonly categoryCounts: Readonly<Record<string, number>>;
  readonly onSelect:       (category: string) => void;
}
