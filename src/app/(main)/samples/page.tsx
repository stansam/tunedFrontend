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
        <SamplesHero />

        <Suspense fallback={<SamplesSkeleton />}>
          <SamplesDataLoader />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
