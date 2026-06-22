import { SearchResponse, SearchResultItem } from "@/lib/types/search.type";

interface SchemaItem {
  "@type": string;
  position: number;
  name: string;
  url?: string;
}

export function getSearchJsonLd(query: string, rawQuery: string, initialData?: SearchResponse) {
  const resultsList = initialData?.results || {
    services: [],
    samples: [],
    blogs: [],
    faqs: [],
    tags: [],
  };

  const schemaItems: SchemaItem[] = [];
  let itemCounter = 1;
  const SITE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

  Object.values(resultsList).forEach((items) => {
    (items as SearchResultItem[]).forEach((item) => {
      let url = "";
      if (item.type === "service") {
        url = `${SITE_URL}/services/${item.slug}`;
      } else if (item.type === "sample") {
        url = `${SITE_URL}/samples/${item.slug}`;
      } else if (item.type === "blog") {
        url = `${SITE_URL}/blogs/${item.slug}`;
      } else if (item.type === "tag") {
        url = `${SITE_URL}/search/${encodeURIComponent(item.title)}?type=tag`;
      }

      schemaItems.push({
        "@type": "ListItem",
        "position": itemCounter++,
        "name": item.title,
        ...(url ? { "url": url } : {}),
      });
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": `Search results for: ${query}`,
    "url": `${SITE_URL}/search/${rawQuery}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": schemaItems.slice(0, 20),
    },
  };
}
