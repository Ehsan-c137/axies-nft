import { Skeleton } from "@ui/skeleton";

export const ProfileScreenPlaceholder = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between items-center rounded-t-3xl p-4 md:p-9 bg-neutral-200 dark:bg-neutral-800/60 md:max-h-[338px]">
        <div className="flex flex-wrap md:flex-nowrap md:-translate-y-[26px] gap-8 items-center">
          <div className="relative md:h-[270px] min-w-[200px] min-h-[200px] w-full h-full">
            <Skeleton className="w-full h-full absolute rounded-3xl md:translate-y-6" />
          </div>

          <div className="flex flex-col items-start gap-4 ">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-96 max-w-lg" />
            <Skeleton className="h-12 w-52" />
          </div>
        </div>
        <div className="h-full flex pt-8">
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      <div className="p-4 md:p-9">
        <div className="flex items-center space-x-4 border-b pb-4 mb-8">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-56 w-full rounded-xl" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
