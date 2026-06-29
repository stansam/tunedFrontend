import type { ChatWindowProps } from "../_props/chats.props";
import { ChatWindowHeader } from "./ChatWindowHeader";
import { ChatWindowMessages } from "./ChatWindowMessages";
import { ChatWindowInput } from "./ChatWindowInput";
import { ChatWindowWelcome } from "./ChatWindowWelcome";

export function ChatWindow({
  chat,
  agents,
  onBack,
  onSendMessage,
  onAssignAgent,
  onChangeStatus,
  onEditMessage,
  onDeleteMessage,
  onUploadAttachment,
}: ChatWindowProps) {
  if (!chat) {
    return (
      <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col h-[calc(100vh-120px)] lg:h-full items-center justify-center">
        <ChatWindowWelcome />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-xs p-4 flex flex-col gap-4 h-[calc(100vh-120px)] lg:h-full">
      <ChatWindowHeader
        chat={chat}
        agents={agents}
        onBack={onBack}
        onAssignAgent={onAssignAgent}
        onChangeStatus={onChangeStatus}
      />
      <ChatWindowMessages
        chat={chat}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
      />
      <ChatWindowInput
        chat={chat}
        onSendMessage={onSendMessage}
        onUploadAttachment={onUploadAttachment}
      />
    </div>
  );
}
export default ChatWindow;
