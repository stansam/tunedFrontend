"use client";

import { Suspense } from "react";
import { ChatContainer } from "./_components/ChatContainer";
import { ChatSkeleton } from "./_components/ChatSkeleton";

export default function ChatsPage() {
  return (
    <div className="py-4 flex flex-col gap-6 h-full">
      <Suspense fallback={<ChatSkeleton />}>
        <ChatContainer />
      </Suspense>
    </div>
  );
}
