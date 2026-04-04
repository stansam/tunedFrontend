"use client";

import { cn } from "@/lib/utils";
import { BlogDetailHero } from "./HeroSection";
import { BlogContent } from "./ContentSection";
import { BlogCommentsPanel } from "./CommentPanel";
import { toBlogPostViewModel } from "../utils";
import type { BlogDetailClientProps } from "../_props/post.prop";

export function BlogDetailClient({
  post,
  isAuthenticated,
  currentUser,
}: BlogDetailClientProps) {
  const viewModel = toBlogPostViewModel(post);

  return (
    <>
      <BlogDetailHero post={viewModel} />

      <section
        className="bg-[#f0ede8] py-12 md:py-16"
        aria-label="Article content and comments"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className={cn(
            "grid grid-cols-1 gap-10",
            "lg:grid-cols-[1fr_380px] lg:gap-12",
            "xl:grid-cols-[1fr_400px]"
          )}>
            <main>
              <BlogContent post={viewModel} />
            </main>

            <div className="relative">
              <div className="lg:hidden">
                <BlogCommentsPanel
                  postId={post.id}
                  postSlug={post.slug}
                  comments={post.comments}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                />
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
                  <BlogCommentsPanel
                    postId={post.id}
                    postSlug={post.slug}
                    comments={post.comments}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}