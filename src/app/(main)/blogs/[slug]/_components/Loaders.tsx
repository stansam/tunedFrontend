import { notFound } from "next/navigation";

import { getAuthUser } from "@/lib/auth/getAuthUser";
import { fetchBlogPost, fetchRelatedBlogs } from "@/lib/services/post.service";
import { FALLBACK_BLOG_POST, FALLBACK_RELATED_BLOGS } from "../_fallback/post.fallback";
import { BlogDetailClient } from "./Client";
import { RelatedBlogsSection } from "./RelatedBlogs";


export async function BlogDetailLoader({ slug }: { slug: string }) {
  const [postResult, authUser] = await Promise.all([
    fetchBlogPost(slug),
    getAuthUser(),
  ]);

  if (!postResult.ok) {
    if (postResult.error.status === 404) notFound();
    return (
      <BlogDetailClient
        post={FALLBACK_BLOG_POST}
        isAuthenticated={false}
        currentUser={null}
      />
    );
  }

  const post = postResult.data;

  if (!post.is_published && !authUser) notFound();

  return (
    <BlogDetailClient
      post={post}
      isAuthenticated={authUser !== null}
      currentUser={authUser}
    />
  );
}

export async function RelatedBlogsLoader({ slug }: { slug: string }) {
  const postResult = await fetchBlogPost(slug);

  if (!postResult.ok) {
    return <RelatedBlogsSection posts={FALLBACK_RELATED_BLOGS} currentSlug={slug} />;
  }

  const relatedResult = await fetchRelatedBlogs(postResult.data.category_id, slug);
  const posts = relatedResult.ok ? relatedResult.data : FALLBACK_RELATED_BLOGS;

  return <RelatedBlogsSection posts={posts} currentSlug={slug} />;
}