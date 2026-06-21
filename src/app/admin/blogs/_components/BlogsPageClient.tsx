"use client";

import { useRouter } from "next/navigation";
import { useBlogStatsQuery, useBlogPostsQuery, useBlogCategoriesQuery, usePostCommentsQuery } from "../_hooks/useBlogsQuery";
import { useCategoryMutations } from "../_hooks/useCategoryMutations";
import { usePostMutations } from "../_hooks/usePostMutations";
import { useCommentMutations } from "../_hooks/useCommentMutations";
import { useBlogsSocket } from "../_hooks/useBlogsSocket";
import { useBlogsPageState } from "../_hooks/useBlogsPageState";
import { BlogsKPICards, BlogsTable, CategoryList, CategoryModal, CommentsModal, BlogsToolbar, BlogsPagination } from "./index";
import { Route } from "next";

export function BlogsPageClient() {
  const router = useRouter();
  useBlogsSocket();
  const s = useBlogsPageState();

  // Queries
  const { data: stats, isLoading: isStatsLoading } = useBlogStatsQuery();
  const { data: catData, isLoading: isCatLoading } = useBlogCategoriesQuery();
  const categories = catData ?? [];

  const postFilters = {
    page: s.page,
    per_page: 10,
    category_id: s.catId === "all" ? undefined : s.catId,
    is_published: s.status === "all" ? undefined : s.status === "published",
    q: s.search || undefined,
  };
  const { data: postsData, isLoading: isPostsLoading } = useBlogPostsQuery(postFilters);
  const { data: commentsData, isLoading: isCommLoading } = usePostCommentsQuery(s.selPost?.id ?? "", s.isCommOpen);

  // Mutations
  const { createCategory, updateCategory, deleteCategory } = useCategoryMutations();
  const { deletePost, togglePublish, toggleFeature } = usePostMutations();
  const { approveComm, deleteComm } = useCommentMutations();

  const handleSaveCategory = (data: { name: string; description: string }) => {
    const action = s.selCat ? updateCategory.mutateAsync({ id: s.selCat.id, data }) : createCategory.mutateAsync(data);
    action.then(() => s.setIsCatOpen(false));
  };

  return (
    <div className="@container/main flex min-h-screen flex-col gap-6 overflow-auto py-6">
      <BlogsKPICards stats={stats ?? null} loading={isStatsLoading} />
      <BlogsToolbar
        search={s.search} onSearchChange={s.setSearch} categoryId={s.catId} onCategoryChange={s.setCatId}
        status={s.status} onStatusChange={s.setStatus} categories={categories}
        onCreatePost={() => router.push("/admin/blogs/new?new=true" as Route)} activeTab={s.activeTab} onTabChange={s.setActiveTab}
      />

      <div className="px-4 lg:px-6 flex-1">
        {s.activeTab === "posts" ? (
          <div className="space-y-4">
            <BlogsTable
              blogs={postsData?.blogs ?? []} loading={isPostsLoading}
              onEdit={(slug) => router.push(`/admin/blogs/${slug}` as Route)}
              onDelete={(id) => confirm("Delete post?") && deletePost.mutate(id)}
              onPublishToggle={(id, publish) => togglePublish.mutate({ id, publish })}
              onFeatureToggle={(id, feature) => toggleFeature.mutate({ id, feature })}
              onViewComments={(post) => { s.setSelPost(post); s.setIsCommOpen(true); }}
            />
            <BlogsPagination page={s.page} total={postsData?.total ?? 0} onPageChange={s.setPage} />
          </div>
        ) : (
          <CategoryList
            categories={categories} loading={isCatLoading}
            onCreate={() => { s.setSelCat(null); s.setIsCatOpen(true); }}
            onEdit={(cat) => { s.setSelCat(cat); s.setIsCatOpen(true); }}
            onDelete={(id) => confirm("Delete category?") && deleteCategory.mutate(id)}
          />
        )}
      </div>

      <CategoryModal key={s.isCatOpen ? (s.selCat?.id || "new") : "closed"} isOpen={s.isCatOpen} category={s.selCat} onClose={() => s.setIsCatOpen(false)} onSave={handleSaveCategory} isSaving={createCategory.isPending || updateCategory.isPending} />
      <CommentsModal isOpen={s.isCommOpen} post={s.selPost} comments={commentsData ?? []} loading={isCommLoading} onClose={() => s.setIsCommOpen(false)} onApprove={(id) => approveComm.mutate({ id, approved: true, postId: s.selPost?.id })} onDelete={(id) => deleteComm.mutate({ id, postId: s.selPost?.id })} />
    </div>
  );
}
