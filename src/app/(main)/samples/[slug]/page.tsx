import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";

import { fetchSample, fetchRelatedSamples } from "@/lib/services/sample.service";
import {
  FALLBACK_SAMPLE,
  FALLBACK_RELATED_SAMPLES,
} from "./_fallback/sample.fallback";
import { SampleDetailClient } from "./_components/SampleClient";
import { RelatedSamplesSection } from "./_components/RelatedSample";
import {
  SampleDetailPageSkeleton,
  RelatedSamplesSkeleton,
} from "./_components/Skeleton";
import type { SampleDetailPageParams } from "./_types/sample.type";

export async function generateMetadata(
  { params }: SampleDetailPageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchSample(slug);

  if (!result.ok) {
    return {
      title: "Sample Not Found | TunedEssays",
      description: "The sample you are looking for could not be found.",
    };
  }

  const sample = result.data;
  const imageUrl =
    sample.image ||
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80";

  const description =
    sample.excerpt ||
    `A ${sample.word_count}-word ${sample.service.name} sample from TunedEssays.`;

  return {
    title: `${sample.title} | Samples | TunedEssays`,
    description,
    keywords: sample.tags.map((t) => t.name),
    alternates: {
      canonical: `/samples/${sample.slug}`,
    },
    openGraph: {
      title: sample.title,
      description,
      type: "article",
      url: `https://tunedessays.com/samples/${sample.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: sample.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: sample.title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


async function SampleDetailLoader({ slug }: { slug: string }) {
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

async function RelatedSamplesLoader({ slug }: { slug: string }) {
  const result = await fetchRelatedSamples(slug);
  const samples = result.ok ? result.data : FALLBACK_RELATED_SAMPLES;

  return <RelatedSamplesSection samples={samples} currentSlug={slug} />;
}

export default async function SampleDetailPage({
  params,
}: SampleDetailPageParams) {
  const { slug } = await params;

  if (
    !slug ||
    !/^[a-z0-9][a-z0-9-]{0,118}[a-z0-9]$/.test(slug)
  ) {
    notFound();
  }

  return (
    <>
      <Navbar activeRoute="/samples" />

      <main id="main-content">

        <Suspense fallback={<SampleDetailPageSkeleton />}>
          <SampleDetailLoader slug={slug} />
        </Suspense>

        <Suspense fallback={<RelatedSamplesSkeleton />}>
          <RelatedSamplesLoader slug={slug} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}