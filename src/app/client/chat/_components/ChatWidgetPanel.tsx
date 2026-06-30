"use client";

import React, { useEffect, useRef } from "react";
import { useChatWidget } from "../_hooks/useChatWidget";

export function ChatWidgetPanel({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useChatWidget();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first?.focus();
          e.preventDefault();
        }
      }
    };

    const currentPanel = panelRef.current;
    currentPanel?.addEventListener("keydown", trapFocus);
    first?.focus();

    return () => {
      currentPanel?.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      className="fixed z-40 bottom-24 right-6 w-[400px] h-[600px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-120px)] rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-2xl flex flex-col transition-all animate-in fade-in slide-in-from-bottom-6 duration-200"
    >
      {children}
    </div>
  );
}
export default ChatWidgetPanel;
