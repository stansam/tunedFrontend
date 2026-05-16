import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { OrderCommentDTO } from "../_types";
import { ActivityMessageItem } from "./ActivityMessageItem";

interface ActivityMessageGroupProps {
  date: Date;
  messages: OrderCommentDTO[];
  currentUserId?: string;
  onEdit?: (msg: OrderCommentDTO) => void;
  onDelete?: (msg: OrderCommentDTO) => void;
}

export function ActivityMessageGroup({
  date,
  messages,
  currentUserId,
  onEdit,
  onDelete,
}: ActivityMessageGroupProps) {
  if (!messages || messages.length === 0) return null;

  const sender = messages[0]?.sender_role;
  const senderName =
    sender === "admin" || sender === "support"
      ? "TunedOps"
      : messages[0]?.sender_name;
  const isOwn = messages[0]?.sender_id === currentUserId;

  return (
    <div className="flex gap-4">
      {!isOwn && (
        <Avatar className="h-8 w-8 mt-1 border border-white/20 shadow-sm shrink-0">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${senderName}`} />
          <AvatarFallback className="bg-primary/10 text-primary text-xs">
            {senderName?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col flex-1 ${isOwn ? "items-end" : "items-start"}`}>
        <div className="flex items-baseline gap-2 mb-1 px-1">
          <span className="text-xs font-medium text-muted-foreground/80">
            {senderName}
          </span>
          <span className="text-[10px] text-muted-foreground/60">
            {format(date, "h:mm a")}
          </span>
        </div>

        <div className={`flex flex-col gap-1 w-full ${isOwn ? "items-end" : "items-start"}`}>
          {messages.map((msg) => (
            <ActivityMessageItem 
              key={msg.id} 
              message={msg} 
              isOwn={isOwn} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
