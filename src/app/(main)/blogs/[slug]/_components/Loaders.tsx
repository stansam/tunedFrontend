import { notFound } from "next/navigation";

import { getServerAuthUser } from "@/lib/services/auth.service";
import { fetchBlogPost, fetchRelatedBlogs } from "@/lib/services/post.service";
import { FALLBACK_BLOG_POST, FALLBACK_RELATED_BLOGS } from "../_fallback/post.fallback";
import { BlogDetailClient } from "./Client";
import { RelatedBlogsSection } from "./RelatedBlogs";
import { AuthUser } from "@/lib/types/auth.type";

export async function BlogDetailLoader({ slug }: { slug: string }) {
  const [postResult, authResult] = await Promise.all([
    fetchBlogPost(slug),
    getServerAuthUser(),
  ]);

  const authUser: AuthUser | null = authResult.ok ? authResult.user : null;

  if (!postResult.ok) {
    if (postResult.error.status === 404) notFound();

    if (process.env.NODE_ENV !== "production") {
      console.error("[BlogDetailPage] fetchBlogPost failed:", postResult.error);
    }
    return (
      <BlogDetailClient
        post={FALLBACK_BLOG_POST}
        isAuthenticated={false}
        currentUser={null}
      />
    );
  }

  const post = postResult.data;

  // if (!post.is_published && !authUser) notFound();

  return (
    <BlogDetailClient
      post={post}
      isAuthenticated={authUser !== null}
      currentUser={authUser}
    />
  );
}

export async function RelatedBlogsLoader({ slug }: { slug: string }) {
  // const postResult = await fetchBlogPost(slug);

  // if (!postResult.ok) {
  //   return <RelatedBlogsSection posts={FALLBACK_RELATED_BLOGS} currentSlug={slug} />;
  // }

  const relatedResult = await fetchRelatedBlogs(slug);
  const posts = relatedResult.ok && relatedResult.data.length > 0 ? relatedResult.data : FALLBACK_RELATED_BLOGS;

  return <RelatedBlogsSection posts={posts} currentSlug={slug} />;
}