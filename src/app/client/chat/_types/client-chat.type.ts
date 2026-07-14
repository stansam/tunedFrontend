export interface ClientChatSummary {
  id: string;
  subject: string | null;
  status: "active" | "closed";
  unread_count: number;
  last_message_preview?: string | null;
  last_message_at?: string | null;
  created_at: string;
  updated_at: string;
}
