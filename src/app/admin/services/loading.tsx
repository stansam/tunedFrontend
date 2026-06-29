import { ServicesLoadingSkeleton } from "./_components/Skeletons";

export default function ServicesLoading() {
  return (
    <div className="flex-1 space-y-6 py-6">
      <ServicesLoadingSkeleton />
    </div>
  );
}
