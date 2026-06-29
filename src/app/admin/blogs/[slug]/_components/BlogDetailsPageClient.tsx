"use client";

import { useSearchParams } from "next/navigation";
import { useBlogPostDetailsQuery, useBlogCategoriesQuery } from "../../_hooks/useBlogsQuery";
import { MultiStepCreator, BlogEditor } from "./index";

interface BlogDetailsPageClientProps {
  readonly slug: string;
}

export function BlogDetailsPageClient({ slug }: BlogDetailsPageClientProps) {
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  const { data: categoriesData, isLoading: isCatLoading } = useBlogCategoriesQuery();
  const { data: postData, isLoading: isPostLoading } = useBlogPostDetailsQuery(slug, !isNew);

  if (isCatLoading || (!isNew && isPostLoading)) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center animate-pulse text-slate-500">
        Loading post manager...
      </div>
    );
  }

  const categories = categoriesData ?? [];

  if (isNew) {
    return (
      <div className="py-6 overflow-auto min-h-screen">
        <MultiStepCreator categories={categories} />
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center text-slate-500 font-bold">
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="py-6 overflow-auto min-h-screen">
      <BlogEditor post={postData} categories={categories} />
    </div>
  );
}
