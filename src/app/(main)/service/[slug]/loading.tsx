import React from "react";
import { ServiceHeroSkeleton, ServiceDetailsSkeleton, RelatedContentSkeleton } from "./_components/ServiceSkeletons";

/**
 * Root loading state for service details using specialized skeletons.
 * Ensures a consistent, premium feel durante data streaming.
 */
export default function ServiceLoading() {
  return (
    <main className="min-h-screen bg-white animate-in fade-in duration-500">
      <ServiceHeroSkeleton />
      <ServiceDetailsSkeleton />
      <RelatedContentSkeleton />
    </main>
  );
}
