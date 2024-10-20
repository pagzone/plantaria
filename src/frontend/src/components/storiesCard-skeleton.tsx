import { Skeleton } from "@/components/ui/skeleton";

const StoriesCardSkeleton = () => {
	return (
		<div className="rounded-lg shadow-lg">
			<Skeleton className="h-56 w-full rounded-t-lg" />

			<div className="p-2 text-center">
				<Skeleton className="h-6 w-3/4 mx-auto mb-2 rounded-md" />
				<Skeleton className="h-4 w-5/6 mx-auto rounded-md" />
				<Skeleton className="h-4 w-4/6 mx-auto rounded-md mt-1" />
			</div>
		</div>
	);
};

export default StoriesCardSkeleton;
