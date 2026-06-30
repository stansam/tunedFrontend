"use client";

import { useRef, useState } from "react";

export function useScrollControl() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsAtBottom(offset <= 50);
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = scrollAreaRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior,
    });
  };

  return {
    scrollAreaRef,
    isAtBottom,
    handleScroll,
    scrollToBottom,
  };
}
