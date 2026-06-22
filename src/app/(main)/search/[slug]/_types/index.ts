export type ResultType = 'all' | 'service' | 'sample' | 'blog' | 'faq' | 'tag';

export interface SearchPageState {
  query: string;
  type: ResultType;
  page: number;
  perPage: number;
}
