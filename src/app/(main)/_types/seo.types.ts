export interface StatItem {
  readonly value:       string;
  readonly label:       string;
  readonly ariaLabel?:  string;
}

export interface KeywordTag {
  readonly label: string;
  readonly slug:  string;
}

export interface SeoColumnData {
  readonly id:              string;
  readonly heading:         string;
  readonly body:            string;
  readonly expandedBody?:   string;
  readonly expandedHeading?: string;
  readonly tags:            readonly KeywordTag[];
  readonly expandedTags?:   readonly KeywordTag[];
  readonly expandable:      boolean;
}

export interface SeoSectionData {
  readonly sectionHeading:    string;
  readonly sectionSubheading: string;
  readonly stats:             readonly StatItem[];
  readonly columns:           readonly SeoColumnData[];
  readonly allKeywords:       readonly KeywordTag[];
}

export type ExpandedState = Record<string, boolean>;