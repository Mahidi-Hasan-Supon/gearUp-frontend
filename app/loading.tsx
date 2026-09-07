
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-80" />
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 rounded-xl border p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Gear Card Skeletons */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-background"
            >
              <Skeleton className="h-52 w-full" />

              <div className="space-y-4 p-5">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />

                <div className="flex justify-between border-y py-3">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>

                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

