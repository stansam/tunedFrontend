import { Suspense } from "react";
import { BlogDetailsPageClient } from "./_components/BlogDetailsPageClient";

interface Props {
  readonly params: Promise<{ readonly slug: string }>;
}

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex-1 p-6 flex items-center justify-center animate-pulse text-slate-500">Loading editor...</div>
      }
    >
      <BlogDetailsPageClient slug={slug} />
    </Suspense>
  );
}
