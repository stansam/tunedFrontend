export type SampleId  = string;
export type ServiceId = string;
export type Slug      = string;

export interface SampleTag {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly usage_count: number;
}

export interface SampleService {
  readonly id: ServiceId;
  readonly name: string;
  readonly slug: string;
  readonly description?: string | null;
}

export interface Sample {
  readonly id: SampleId;
  readonly title: string;
  readonly slug: Slug;
  readonly excerpt: string;
  readonly service_id: ServiceId;
  readonly word_count: number;
  readonly featured: boolean;
  readonly image: string;
  readonly tags: readonly SampleTag[];
  readonly service: SampleService;
}

export interface RelatedSampleItem {
  readonly id: SampleId;
  readonly title: string;
  readonly slug: Slug;
  readonly excerpt: string;
  readonly service_id: ServiceId;
  readonly word_count: number;
  readonly featured: boolean;
  readonly image: string;
  readonly tags: readonly SampleTag[];
  readonly service: SampleService;
}

export interface SampleDetailPageParams {
  readonly params: Promise<{ slug: string }>;
}

export interface SampleViewModel {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly wordCountFormatted: string;
  readonly wordCount: number;
  readonly readTimeMinutes: number;
  readonly featured: boolean;
  readonly image: string;
  readonly tags: readonly SampleTag[];
  readonly service: SampleService;
  readonly serviceColourClass: string;
  readonly shortExcerpt: string;
}