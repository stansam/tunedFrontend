"use client";

import { useState, useCallback } from "react";

export function useAnnouncer() {
  const [announcement, setAnnouncement] = useState("");

  const announce = useCallback((message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(""), 1000);
  }, []);

  return { announcement, announce };
}
