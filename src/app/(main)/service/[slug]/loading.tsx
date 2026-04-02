import { ServiceHeroSkeleton, ServiceDetailsSkeleton, RelatedContentSkeleton } from "./_components/ServiceSkeletons";

export default function ServiceLoading() {
  return (
    <main className="min-h-screen bg-white animate-in fade-in duration-500">
      <ServiceHeroSkeleton />
      <ServiceDetailsSkeleton />
      <RelatedContentSkeleton />
    </main>
  );
}
