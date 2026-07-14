"use client";

import React from "react";

export function ChatWidgetSkeleton() {
  return (
    <div className="flex-1 p-4 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-slate-200" />
        <div className="space-y-1.5 grow">
          <div className="h-3 w-1/3 rounded-sm bg-slate-200" />
          <div className="h-2 w-1/2 rounded-sm bg-slate-200" />
        </div>
      </div>
      <div className="space-y-3 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 shrink-0" />
            <div className="space-y-1.5 grow">
              <div className="h-3 w-1/4 rounded-sm bg-slate-200" />
              <div className="h-2 w-3/4 rounded-sm bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ChatWidgetSkeleton;
