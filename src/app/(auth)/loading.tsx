import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-4 min-w-3xs max-w-sm container mx-auto px-4 h-screen">
      <div className="flex flex-col gap-8 items-center justify-center justify-items-center h-full w-full">
        <Skeleton className="h-10 w-full" />
        <div className="flex w-full flex-col space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
