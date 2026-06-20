import type { AdminOrderFileDTO } from "./base";

export interface AdminOrderCommentDTO {
  id: string;
  order_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  content: string;
  created_at: string;
  is_read: boolean;
  attachments: AdminOrderFileDTO[];
}

export interface CommentEditState {
  commentId: string | null;
  content: string;
}
