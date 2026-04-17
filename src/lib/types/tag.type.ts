export interface TagResponse {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly slug: string;
  readonly usage_count: number;
}
