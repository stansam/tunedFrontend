import { Suspense } from "react";
import { Navbar } from "../_components/Navbar";
import { Footer } from "../_components/Footer";
import { BlogHero } from "./_components/BlogHero";
import { BlogSkeleton } from "./_components/BlogSkeleton";
import { BlogDataLoader } from "./_components/BlogDataLoader";

export default function BlogsPage() {
  return (
    <>
      <Navbar activeRoute="/blogs" />

      <main id="main-content" className="min-h-screen bg-[#e8e6e1]">
        <BlogHero 
          title={<>Elevate Your <span className="text-emerald-600">Writing</span> Game</>}
          description="Unlock the secrets to academic excellence and professional storytelling. Our blog features expert guides, productivity hacks, and the latest trends in research."
          blogCount={50}
          categoryCount={4}
        />

        <Suspense fallback={<BlogSkeleton />}>
          <BlogDataLoader />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
