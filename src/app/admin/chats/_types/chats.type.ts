export interface ChatAttachment {
  id: string;
  original_filename: string;
  storage_path: string;
  asset_type: string;
  file_size_bytes?: number | null;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  user_id: string | null;
  content: string | null;
  is_read: boolean;
  sender_name: string;
  is_admin: boolean;
  is_edited?: boolean;
  is_deleted?: boolean;
  attachments?: ChatAttachment[];
  created_at: string;
}

export interface ChatRoom {
  id: string;
  user_id: string;
  user_name: string;
  admin_id: string | null;
  admin_name: string | null;
  subject: string | null;
  order_id: string | null;
  order_number: string | null;
  status: "active" | "closed";
  messages?: ChatMessage[];
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessagePage {
  messages: ChatMessage[];
  has_more: boolean;
  next_cursor: string | null;
}

export interface SupportAgent {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

export interface SendMessagePayload {
  content: string;
}

export interface AssignAdminPayload {
  admin_id: string;
}

export interface ChangeStatusPayload {
  status: "active" | "closed";
}

export interface ChatState {
  activeChatId: string | null;
  filter: "all" | "unread" | "active" | "closed";
  searchQuery: string;
}
