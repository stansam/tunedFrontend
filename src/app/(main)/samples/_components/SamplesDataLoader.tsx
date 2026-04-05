import { fetchSamples, fetchSampleService } from "@/lib/services/samples.service";
import { FALLBACK_SAMPLES_PAGE, FALLBACK_SAMPLE_SERVICES } from "../_fallback/samples.fallback";
import { SamplesClient } from "./SamplesClient";
import { ALL_SERVICE } from "../_types/samples.types";
import type { SampleFilters } from "../_types/samples.types";

export async function SamplesDataLoader() {
  const [samplesResult, servicesResult] = await Promise.all([
    fetchSamples({
      sort: "created_at",
      order: "desc",
      page: 1,
      per_page: 12,
    }),
    fetchSampleService()
  ]);

  const response = samplesResult.ok ? samplesResult.data : FALLBACK_SAMPLES_PAGE;
  const services = servicesResult.ok ? servicesResult.data : FALLBACK_SAMPLE_SERVICES;

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
      services={services}
    />
  );
}
