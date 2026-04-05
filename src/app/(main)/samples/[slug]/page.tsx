import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";

import { fetchSample } from "@/lib/services/sample.service";
import {
  SampleDetailPageSkeleton,
  RelatedSamplesSkeleton,
} from "./_components/Skeleton";
import type { SampleDetailPageParams } from "./_types/sample.type";
import { SampleDetailLoader, RelatedSamplesLoader } from "./_components/Loader";

export async function generateMetadata(
  { params }: SampleDetailPageParams,
//   _parent: ResolvingMetadata
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