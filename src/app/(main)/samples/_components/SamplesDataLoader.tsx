import { fetchSamples } from "@/lib/services/samples.service";
import { FALLBACK_SAMPLES_PAGE } from "../_fallback/samples.fallback";
import { SamplesClient } from "./SamplesClient";
import { ALL_SERVICE } from "../_types/samples.types";
import type { SampleFilters } from "../_types/samples.types";

export async function SamplesDataLoader() {
  const result = await fetchSamples({
    sort: "created_at",
    order: "desc",
    page: 1,
    per_page: 12,
  });

  const response = result.ok ? result.data : FALLBACK_SAMPLES_PAGE;

  const initialFilters: SampleFilters = {
    search: "",
    serviceId: ALL_SERVICE,
    sort: "created_at",
    order: "desc",
  };

  return (
    <SamplesClient 
      initialResponse={response} 
      initialFilters={initialFilters} 
    />
  );
}
