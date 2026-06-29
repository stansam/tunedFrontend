import { AlertCircle } from "lucide-react";

export function ChatErrorView({ message }: { readonly message: string }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 text-xs text-red-700 flex items-center gap-2 font-semibold justify-center h-full">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
export default ChatErrorView;
