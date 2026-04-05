import { notFound } from "next/navigation";
import { fetchSample, fetchRelatedSamples } from "@/lib/services/sample.service";
import {
  FALLBACK_SAMPLE,
  FALLBACK_RELATED_SAMPLES,
} from "../_fallback/sample.fallback";
import { SampleDetailClient } from "./SampleClient";
import { RelatedSamplesSection } from "./RelatedSample";


export async function SampleDetailLoader({ slug }: { slug: string }) {
  const result = await fetchSample(slug);

  if (!result.ok) {
    if (result.error.status === 404) notFound();

    if (process.env.NODE_ENV !== "production") {
      console.error("[SampleDetailPage] fetchSample failed:", result.error);
    }
    return <SampleDetailClient sample={FALLBACK_SAMPLE} />;
  }

  return <SampleDetailClient sample={result.data} />;
}

export async function RelatedSamplesLoader({ slug }: { slug: string }) {
  const result = await fetchRelatedSamples(slug);
  const samples = result.ok && result.data.length > 0 ? result.data : FALLBACK_RELATED_SAMPLES;

  return <RelatedSamplesSection samples={samples} currentSlug={slug} />;
}
