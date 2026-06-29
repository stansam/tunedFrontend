import type { ChatRoom, SupportAgent } from "../_types/chats.type";

export const FALLBACK_AGENTS: SupportAgent[] = [
  { id: "agent-1", name: "Jane Admin", email: "jane@tunedessays.com", avatar_url: "https://github.com/shadcn.png" },
  { id: "agent-2", name: "Bob Support", email: "bob@tunedessays.com" },
  { id: "agent-3", name: "Alice Lead", email: "alice@tunedessays.com" },
];

export const FALLBACK_CHATS: ChatRoom[] = [
  {
    id: "chat-1",
    user_id: "user-1",
    user_name: "Manoj Rayi",
    admin_id: "agent-1",
    admin_name: "Jane Admin",
    subject: "Question about Order #ORD-8947-WTR",
    order_id: "ord_101",
    order_number: "ORD-8947-WTR",
    status: "active",
    messages: [
      {
        id: "msg-1",
        chat_id: "chat-1",
        user_id: "user-1",
        content: "Hi, I wanted to verify the status of the blockchain integration task.",
        is_read: true,
        sender_name: "Manoj Rayi",
        is_admin: false,
        created_at: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "msg-2",
        chat_id: "chat-1",
        user_id: "agent-1",
        content: "Hello! We are working on it. It is on track to meet the deadline.",
        is_read: true,
        sender_name: "Jane Admin",
        is_admin: true,
        created_at: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
    unread_count: 0,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "chat-2",
    user_id: "user-2",
    user_name: "Anjali Kumar",
    admin_id: null,
    admin_name: null,
    subject: "Pricing Inquiry",
    order_id: null,
    order_number: null,
    status: "active",
    messages: [
      {
        id: "msg-3",
        chat_id: "chat-2",
        user_id: "user-2",
        content: "Hello! Do you offer discounts for bulk orders?",
        is_read: false,
        sender_name: "Anjali Kumar",
        is_admin: false,
        created_at: new Date(Date.now() - 600000).toISOString(),
      },
    ],
    unread_count: 1,
    created_at: new Date(Date.now() - 600000).toISOString(),
    updated_at: new Date(Date.now() - 600000).toISOString(),
  },
];
