import type {
  SeoSectionData,
  SeoColumnData,
  StatItem,
  KeywordTag,
  ExpandedState,
} from "../_types/seo.types";

export interface SeoSectionProps {
  readonly data?: SeoSectionData;
  readonly className?: string;
}

export interface SeoStatsBarProps {
  readonly stats: readonly StatItem[];
}

export interface SeoStatItemProps {
  readonly stat:  StatItem;
  readonly index: number;
}

export interface SeoColumnsGridProps {
  readonly columns:       readonly SeoColumnData[];
  readonly expandedState: ExpandedState;
  readonly onToggle:      (columnId: string) => void;
}

export interface SeoColumnProps {
  readonly column:     SeoColumnData;
  readonly isExpanded: boolean;
  readonly onToggle:   () => void;
  readonly index:      number;
}

export interface KeywordTagsProps {
  readonly tags:     readonly KeywordTag[];
  readonly label?:   string;
  readonly compact?: boolean;
}

export interface KeywordTagChipProps {
  readonly tag: KeywordTag;
}

export interface SeoSectionHeaderProps {
  readonly id?:        string;
  readonly heading:    string;
  readonly subheading: string;
}

export interface ExpandToggleProps {
  readonly isExpanded: boolean;
  readonly onToggle:   () => void;
  readonly columnId:   string;
}