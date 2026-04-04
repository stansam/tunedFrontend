import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogDetailLoader, RelatedBlogsLoader } from "./_components/Loaders";
import { BlogDetailFallback } from "./_components/Fallback";
import { fetchBlogPost } from "@/lib/services/post.service";
import { RelatedBlogsSkeleton } from "./_components/Skeleton";
import type { BlogDetailPageParams } from "./_types/post.type";
import type { AuthUser } from "@/lib/types/auth.type"

// ─── Auth helper ──────────────────────────────────────────────────────────────
// Replace this stub with your real auth provider. This function runs
// server-side only — never leaks tokens to the client.
//
// NextAuth v5:
//   import { auth } from "@/lib/auth";
//   const session = await auth();
//   return session?.user ? { id: session.user.id!, name: session.user.name!, email: session.user.email! } : null;
//
// Clerk:
//   import { currentUser } from "@clerk/nextjs/server";
//   const user = await currentUser();
//   return user ? { id: user.id, name: user.fullName ?? "", email: user.primaryEmailAddress?.emailAddress ?? "" } : null;

async function getAuthUser(): Promise<AuthUser | null> {
  return null; // TODO: replace with real auth
}


export async function generateMetadata(
  { params }: BlogDetailPageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchBlogPost(slug);

  if (!result.ok) {
    return {
      title: "Article Not Found | Tuned Blog",
      description: "The article you are looking for could not be found.",
    };
  }

  const post = result.data;
  const imageUrl =
    post.featured_image ||
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80";

  return {
    title: `${post.title} | Tuned Blog`,
    description: post.meta_description || post.excerpt,
    keywords: post.tags.map((t) => t.name),
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      type: "article",
      url: `https://tunedessays.com/blogs/${post.slug}`,
      publishedTime: post.published_at,
      authors: [post.author],
      tags: post.tags.map((t) => t.name),
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: [imageUrl],
    },
    robots: { index: post.is_published, follow: true },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageParams) {
  const { slug } = await params;

  if (!slug || !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(slug)) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={<BlogDetailFallback />}>
        <BlogDetailLoader slug={slug} />
      </Suspense>

      <Suspense fallback={<RelatedBlogsSkeleton />}>
        <RelatedBlogsLoader slug={slug} />
      </Suspense>
    </>
  );
}