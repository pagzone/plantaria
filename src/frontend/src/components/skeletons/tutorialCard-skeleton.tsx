import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TutorialCardSkeleton: FC = () => {
  return (
    <div className="h-96 w-80 md:w-72 min-lg:w-60 cursor-pointer rounded-lg shadow-lg">
      <div className="h-52 w-full rounded-t-lg">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>

      <div className="flex flex-col gap-y-4 p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-4 w-1/3 rounded-md" />
        </div>

        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />

        <div className="flex items-center gap-1 text-sm">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default TutorialCardSkeleton;
