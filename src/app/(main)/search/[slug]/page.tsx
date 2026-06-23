import React from "react";
import type { Metadata } from "next";
import { Navbar } from "../../_components/Navbar";
import { Footer } from "../../_components/Footer";
import { SearchResultsClient } from "./_components/SearchResultsClient";
import { getSearchResults } from "./_services";
import { getSearchJsonLd } from "./_services/jsonld";
import { SearchPageProps } from "./_props";

export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedParams.slug;
  const query = decodeURIComponent(rawQuery).replace(/-/g, " ");
  const type = resolvedSearchParams.type || "all";
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const perPage = resolvedSearchParams.per_page ? parseInt(resolvedSearchParams.per_page, 10) : 20;

  const res = await getSearchResults(query, type, page, perPage);
  const totalCount = res.ok ? res.data.counts.total : 0;
  const isNoindex = totalCount === 0;

  return {
    title: `Search results for "${query}" – TunedEssays`,
    description: `Browse professional writing services, samples, blogs, and FAQs matching "${query}" on TunedEssays.`,
    robots: isNoindex ? "noindex, follow" : "index, follow",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SOCKET_URL}/search/${rawQuery}`,
    },
  };
}

export default async function SearchResultsPage({
  params,
  searchParams,
}: SearchPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const rawQuery = resolvedParams.slug;
  const query = decodeURIComponent(rawQuery).replace(/-/g, " ");
  const type = resolvedSearchParams.type || "all";
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const perPage = resolvedSearchParams.per_page ? parseInt(resolvedSearchParams.per_page, 10) : 20;

  const res = await getSearchResults(query, type, page, perPage);
  const initialData = res.ok ? res.data : undefined;
  const jsonLd = getSearchJsonLd(query, rawQuery, initialData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar activeRoute="" />
      <main className="min-h-screen bg-[#e8e6e1]" id="main-content">
        <SearchResultsClient slug={resolvedParams.slug} initialData={initialData} />
      </main>
      <Footer />
    </>
  );
}
