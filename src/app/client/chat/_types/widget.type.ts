export type WidgetView = "conversation_list" | "chat_screen";

export interface WidgetState {
  isOpen: boolean;
  view: WidgetView;
  activeChatId: string | null;
  totalUnread: number;
}
