import { MessageSquare } from "lucide-react";

export function ChatWindowWelcome() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-500">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
        <MessageSquare className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-bold text-slate-800">No Chat Selected</h3>
      <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
        Choose a chat from the sidebar to view the conversation history and start responding to messages.
      </p>
    </div>
  );
}
export default ChatWindowWelcome;
