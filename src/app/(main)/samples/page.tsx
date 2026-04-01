import { Suspense } from "react";
import { Navbar } from "../_components/Navbar";
import { Footer } from "../_components/Footer";
import { SamplesHero } from "./_components/SamplesHero";
import { SamplesSkeleton } from "./_components/SamplesSkeleton";
import { SamplesDataLoader } from "./_components/SamplesDataLoader";

export default function SamplesPage() {
  return (
    <>
      <Navbar activeRoute="/samples" />

      <main id="main-content">
        <SamplesHero 
          title={<>Excellence in <span className="text-emerald-600">Sample</span> Work</>}
          description="Explore our curated selection of high-quality samples across multiple academic and professional disciplines. Each sample reflects the precision and depth we bring to every project."
          sampleCount={100}
          categoryCount={6}
        />

        <Suspense fallback={<SamplesSkeleton />}>
          <SamplesDataLoader />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
