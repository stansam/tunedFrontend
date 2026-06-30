"use client";

import { useEffect, useState } from "react";
import { fetchTawkToHash } from "../_services/tawkto.service";
import { useAuth } from "@/lib/hooks/useAuth";
import { useChatWidget } from "./useChatWidget";

interface TawkVisitor {
  name: string;
  email: string;
  hash: string;
}

interface TawkAPI {
  visitor?: TawkVisitor;
  hideWidget?: () => void;
  showWidget?: () => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    Tawk_LoadStart?: Date;
  }
}

export function useTawkTo(): void {
  const { user } = useAuth();
  const { isOpen } = useChatWidget();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    fetchTawkToHash().then((res) => {
      if (!res.ok || !res.data) return;
      const { hash, property_id, widget_id } = res.data;

      window.Tawk_API = window.Tawk_API || ({} as TawkAPI);
      window.Tawk_API.visitor = {
        name: user.name || "Client",
        email: user.email || "",
        hash: hash,
      };

      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${property_id}/${widget_id}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0?.parentNode?.insertBefore(s1, s0);
      setLoaded(true);
    }).catch(console.error);
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.Tawk_API) return;
    try {
      if (isOpen) {
        window.Tawk_API.hideWidget?.();
      } else {
        window.Tawk_API.showWidget?.();
      }
    } catch (e) {
      console.warn("[useTawkTo] hide/show widget failed:", e);
    }
  }, [isOpen, loaded]);
}
