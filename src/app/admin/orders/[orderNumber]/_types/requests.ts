export interface AdminRevisionRequestDTO {
  id: string;
  order_id: string;
  delivery_id: string;
  revision_notes: string;
  internal_notes: string | null;
  status: string;
  status_color: string;
  priority: string;
  revision_count: number;
  is_active: boolean;
  requested_at: string;
  reviewed_at: string | null;
  resolved_at: string | null;
  estimated_completion: string | null;
  requester_name: string;
  reviewer_name: string | null;
}

export interface AdminDeadlineExtensionDTO {
  id: string;
  order_id: string;
  requested_hours: number;
  reason: string;
  client_notes: string | null;
  status: string;
  status_color: string;
  priority: string;
  original_due_date: string;
  new_due_date: string | null;
  hours_granted: number | null;
  is_pending: boolean;
  rejection_reason: string | null;
  requested_at: string;
  reviewed_at: string | null;
  requester_name: string;
  reviewer_name: string | null;
}
