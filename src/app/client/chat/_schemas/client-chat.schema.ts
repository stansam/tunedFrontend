import { z } from "zod";

export const ClientChatSummarySchema = z.object({
  id: z.string(),
  subject: z.string().nullable(),
  status: z.enum(["active", "closed"]),
  unread_count: z.number(),
  last_message_preview: z.string().nullable().optional(),
  last_message_at: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type ClientChatSummaryType = z.infer<typeof ClientChatSummarySchema>;
