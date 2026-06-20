import { Suspense } from "react";
import { UsersPageClient } from "./_components/UsersPageClient";
import { UsersPageSkeleton } from "./_components/UsersPageSkeleton";

export default async function AdminUsersPage() {
  return (
    <Suspense fallback={<UsersPageSkeleton />}>
      <UsersPageClient />
    </Suspense>
  );
}
