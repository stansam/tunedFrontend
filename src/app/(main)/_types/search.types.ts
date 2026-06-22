export interface TrackSearchEventRequest {
  query: string;
  search_type?: string;
  session_key?: string | null;
  result_count?: number;
  device_type?: string | null;
  source?: string;
}

export interface TrackSearchEventResponse {
  event_id: string;
}

export interface TrackSearchClickRequest {
  event_id: string;
  clicked_type: 'service' | 'sample' | 'blog' | 'faq' | 'tag';
  clicked_id: string;
  position: number;
}

export interface TrackSearchClickResponse {
  click_id: string;
}

export interface PopularSearchItem {
  query: string;
  search_count: number;
  last_searched_at: string;
}

export interface FlatItem {
  id: string;
  label: string;
  type: 'recent' | 'popular' | 'trending' | 'service' | 'sample' | 'blog' | 'tag' | 'faq';
  path?: string;
  value: string;
}