"use client";

import { useMutation } from "@tanstack/react-query";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  trackSearchEvent,
  trackSearchClick,
} from "../services/search_analytics.service";
import type {
  TrackSearchEventRequest,
  TrackSearchClickRequest,
  TrackSearchClickResponse
} from "@/app/(main)/_types/search.types";
import type { ApiResult } from "@/lib/types";

function getSessionKey(): string {
  if (typeof window === "undefined") return "";
  let key = sessionStorage.getItem("search_session_key");
  if (!key) {
    key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("search_session_key", key);
  }
  return key;
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth < 768 ? "mobile" : "desktop";
}

export function useSearchTracking() {
  const [lastEventId, setLastEventId] = useState<string | null>(null);
  const sessionKeyRef = useRef<string>("");

  useEffect(() => {
    sessionKeyRef.current = getSessionKey();
  }, []);

  const eventMutation = useMutation({
    mutationFn: (data: Omit<TrackSearchEventRequest, "session_key" | "device_type">) => {
      const payload: TrackSearchEventRequest = {
        ...data,
        session_key: sessionKeyRef.current,
        device_type: getDeviceType(),
      };
      return trackSearchEvent(payload);
    },
    onSuccess: (res) => {
      if (res.ok && res.data?.event_id) {
        setLastEventId(res.data.event_id);
      }
    },
  });

  const clickMutation = useMutation({
    mutationFn: (data: Omit<TrackSearchClickRequest, "event_id"> & { event_id?: string }) => {
      const targetEventId = data.event_id || lastEventId;
      if (!targetEventId) {
        return Promise.resolve({ ok: false, error: { message: "No search event registered", status: 400, errors: { "": [] } } } as unknown as ApiResult<TrackSearchClickResponse>);
      }
      const payload: TrackSearchClickRequest = {
        ...data,
        event_id: targetEventId,
      };
      return trackSearchClick(payload);
    },
  });

  const { mutate: mutateEvent } = eventMutation;
  const trackEvent = useCallback((query: string, resultsCount: number = 0, type: string = "all", source: string = "hero") => {
    mutateEvent({
      query,
      result_count: resultsCount,
      search_type: type,
      source,
    });
  }, [mutateEvent]);

  const { mutate: mutateClick } = clickMutation;
  const trackClick = useCallback((clickedType: 'service' | 'sample' | 'blog' | 'faq' | 'tag', clickedId: string, position: number, eventId?: string) => {
    mutateClick({
      event_id: eventId,
      clicked_type: clickedType,
      clicked_id: clickedId,
      position,
    });
  }, [mutateClick]);

  return {
    trackEvent,
    trackClick,
    lastEventId,
    isTrackingEvent: eventMutation.isPending,
    isTrackingClick: clickMutation.isPending,
  };
}
