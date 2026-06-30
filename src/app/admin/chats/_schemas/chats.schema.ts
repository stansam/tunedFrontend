import { z } from "zod";

export const ChatAttachmentSchema = z.object({
  id: z.string(),
  original_filename: z.string(),
  storage_path: z.string(),
  asset_type: z.string(),
  file_size_bytes: z.number().nullable().optional(),
});

export const ChatMessageSchema = z.object({
  id: z.string(),
  chat_id: z.string(),
  user_id: z.string().nullable(),
  content: z.string().nullable(),
  is_read: z.boolean(),
  sender_name: z.string(),
  is_admin: z.boolean(),
  is_edited: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  attachments: z.array(ChatAttachmentSchema).optional(),
  created_at: z.string(),
});

export const ChatRoomSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  admin_id: z.string().nullable(),
  admin_name: z.string().nullable(),
  subject: z.string().nullable(),
  order_id: z.string().nullable(),
  order_number: z.string().nullable(),
  status: z.enum(["active", "closed"]),
  messages: z.array(ChatMessageSchema).optional(),
  unread_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ChatMessagePageSchema = z.object({
  messages: z.array(ChatMessageSchema),
  has_more: z.boolean(),
  next_cursor: z.string().nullable(),
});

export const SupportAgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatar_url: z.string().optional(),
});

export const CreateChatResponseSchema = ChatRoomSchema;
export const SendMessageResponseSchema = ChatMessageSchema;
export const AssignAdminResponseSchema = ChatRoomSchema;
export const ChangeStatusResponseSchema = ChatRoomSchema;
export const EditMessageResponseSchema = ChatMessageSchema;
