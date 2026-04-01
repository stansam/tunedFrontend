import { Suspense } from "react";
import { Navbar } from "../_components/Navbar";
import { Footer } from "../_components/Footer";
import { FaqHero } from "./_components/FaqHero";
import { FaqSkeleton } from "./_components/FaqSkeleton";
import { FaqDataLoader } from "./_components/FaqDataLoader";

export default function FaqsPage() {
  return (
    <>
      <Navbar activeRoute="/faqs" />

      <main id="main-content">
        <FaqHero />

        <Suspense fallback={<FaqSkeleton />}>
          <FaqDataLoader />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
