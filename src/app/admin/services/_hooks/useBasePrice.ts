import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "@/lib/services/quote.service";
import { fetchBasePrice } from "../_services/services.service";

export function useBasePrice(serviceId: string) {
  return useQuery({
    queryKey: ["admin", "services", serviceId, "base-price"],
    queryFn: async () => {
      const optionsRes = await fetchOptions();
      if (!optionsRes.ok || !optionsRes.data || !optionsRes.data.levels || !optionsRes.data.levels[0]) {
        throw new Error("Failed to fetch academic levels");
      }
      const levelId = optionsRes.data.levels[0].id;
      const deadlineDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
      const deadlineIso = deadlineDate.toISOString();

      const priceRes = await fetchBasePrice(serviceId, levelId, deadlineIso);
      if (!priceRes.ok) {
        throw new Error(priceRes.error?.message ?? "Failed to calculate base price");
      }
      return priceRes.data.price_per_page;
    },
    staleTime: 60_000,
    enabled: !!serviceId,
  });
}
