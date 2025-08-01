const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-[var(--border)] ${className}`} />
);

export default function ItemScreenPlaceholder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between container mx-auto gap-5">
      <div className="max-w-[690px] max-h-[690px] aspect-square animate-pulse bg-muted">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-6 max-w-[620px]">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3 not-dark:shadow-sm">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          <div className="flex gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl p-3 not-dark:shadow-sm">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between flex-1 flex-wrap bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-between flex-1 bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl px-6 py-2 h-[60px] md:h-[50px] not-dark:shadow-sm">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
        <Skeleton className="h-[50px] w-full rounded-lg" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  );
}
