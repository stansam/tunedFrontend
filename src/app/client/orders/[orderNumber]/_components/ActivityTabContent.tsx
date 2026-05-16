"use client";

import { useEffect, useRef } from "react";
import { parseISO, format, isSameDay } from "date-fns";
import { Loader2 } from "lucide-react";
import { useOrderComments, useUpdateComment, useDeleteComment } from "../_hooks/useOrderComments";
import { useCommentSocket } from "../_hooks/useCommentSocket";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActivityInput } from "./ActivityInput";
import { ActivityMessageGroup } from "./ActivityMessageGroup";

interface ActivityTabContentProps {
  orderId: string;
}

export function ActivityTabContent({ orderId }: ActivityTabContentProps) {
  const { data: comments, isLoading } = useOrderComments(orderId);
  const updateMutation = useUpdateComment();
  const deleteMutation = useDeleteComment();
  const { user } = useAuth();
  useCommentSocket(orderId);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Group messages by Date and Sender
  const groups: { date: Date; messages: NonNullable<typeof comments> }[] = [];
  let currentGroup: { date: Date; messages: NonNullable<typeof comments> } | null = null;

  comments?.forEach((msg) => {
    const msgDate = parseISO(msg.created_at);
    if (!currentGroup || 
        !isSameDay(currentGroup.date, msgDate) || 
        currentGroup.messages?.[0]?.sender_id !== msg.sender_id) {
      currentGroup = { date: msgDate, messages: [msg] };
      groups.push(currentGroup);
    } else {
      currentGroup.messages.push(msg);
    }
  });

  return (
    <div className="flex flex-col h-[600px] bg-[#f8fafc] dark:bg-black overflow-hidden rounded-xl border border-white/20 shadow-sm relative z-0">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide"
      >
        {!groups || groups.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60">
            <p className="text-sm">No activity yet. Send a message to get started.</p>
          </div>
        ) : (
          groups.map((group, i) => {
            const previousGroup = groups[i-1];
            const showDate = !previousGroup|| !isSameDay(previousGroup.date, group.date);
            return (
              <div key={i} className="flex flex-col gap-4">
                {showDate && (
                  <div className="flex justify-center sticky top-2 z-10">
                    <span className="px-3 py-1 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-full text-[10px] font-medium text-muted-foreground/80 shadow-sm border border-black/5">
                      {format(group.date, "MMMM d, yyyy")}
                    </span>
                  </div>
                )}
                <ActivityMessageGroup
                  date={group.date}
                  messages={group.messages}
                  currentUserId={user?.id}
                  onEdit={(msg) => updateMutation.mutate({ orderId, commentId: msg.id, content: msg.content })}
                  onDelete={(msg) => deleteMutation.mutate({ orderId, commentId: msg.id })}
                />
              </div>
            );
          })
        )}
      </div>
      
      <div className="shrink-0 relative z-20">
        <ActivityInput orderId={orderId} />
      </div>
    </div>
  );
}
