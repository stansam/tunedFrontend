import { useState, useEffect } from "react";
import { fetchTags } from "@/lib/services/tags.service";
import type { TagResponse } from "@/lib/types/tag.type";

interface UseTagsReturn {
  tags: readonly TagResponse[];
  isLoading: boolean;
  error: string | null;
}

export function useTags(): UseTagsReturn {
  const [tags, setTags] = useState<readonly TagResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTags() {
      setIsLoading(true);
      setError(null);
      
      const result = await fetchTags();
      if (!mounted) return;

      if (result.ok) {
        setTags(result.data);
      } else {
        setError(result.error.message);
      }
      setIsLoading(false);
    }

    loadTags();

    return () => {
      mounted = false;
    };
  }, []);

  return { tags, isLoading, error };
}
