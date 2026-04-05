import {
    BlogDetailHeroSkeleton,
    BlogDetailContentSkeleton,
    BlogDetailCommentsSkeleton
} from "./Skeleton";

export function BlogDetailFallback() {
  return (
    <div className="bg-[#f8f7f4]">
      <BlogDetailHeroSkeleton />
      <section className="bg-[#f0ede8] py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_400px] lg:gap-12">
            <BlogDetailContentSkeleton />
            <BlogDetailCommentsSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}