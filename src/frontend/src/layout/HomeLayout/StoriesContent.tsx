import Profile from "@/components/profile-page/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { PageRoutes } from "@/constants/PageRoutes";
import { QueryKeys } from "@/constants/QueryKeys";
import { useFetchAvatar } from "@/hooks/useFetchAvatar";
import { fetchStory } from "@/lib/api";
import { getUserAvatar } from "@/lib/avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";

const StoriesContent = () => {
	const { id } = useParams();

	if (!id) {
		toast.error("Story not found");
		return <Navigate to={PageRoutes.HOME} />;
	}

	const { data, isLoading, isError, error } = useQuery(
		[QueryKeys.STORY, id],
		async () => {
			const response = await fetchStory(id!);
			return response;
		},
		{
			enabled: !!id,
			refetchOnWindowFocus: false
		},
	);

	if (isError && error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	const story = data?.data;

	const { data: avatarUrl, isLoading: isAvatarLoading } = useFetchAvatar(
		story?.user?.id ?? "",
		story?.user?.avatar_link,
	);

	return (
		<div className="flex flex-col h-full gap-y-4 px-4 md:px-8 py-4">
			<Link className="flex items-center gap-x-1" to={PageRoutes.HOME}>
				<ArrowLeft size={25} />
				<span className="text-lg md:text-xl font-bold hover:underline">
					Home
				</span>
			</Link>

			<div className="flex flex-col gap-y-4">
				{isLoading ? (
					<Skeleton className="rounded-xl h-60 md:h-72 p-6" />
				) : (
					<div
						className="rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer"
						style={{
							backgroundPosition: "60%",
							backgroundImage: `url('${story?.thumbnail}')`,
						}}
					/>
				)}

				<h1 className="text-2xl md:text-4xl font-bold">{story?.title}</h1>

				{/* Author and Date Section */}
				<div className="flex items-center gap-2 ">
					{isAvatarLoading ? (
						<>
							<Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
							<Skeleton className="h-6 w-32 rounded-md" />
						</>
					) : (
						<>
							<Profile
								className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
								userAvatar={avatarUrl}
								userName={story?.user?.name}
								userId={story?.user?.id}
							/>
							<span className="text-sm font-medium hover:underline cursor-pointer hover:text-teal-400">
								{story?.user.name}
							</span>
						</>
					)}
				</div>

				<ScrollArea>
					<div className="min-h-96 mx-auto">
						{isLoading ? (
							<>
								<Skeleton className="h-6 w-full mb-2" />
								<Skeleton className="h-6 w-11/12 mb-2" />
								<Skeleton className="h-6 w-10/12 mb-2" />
								<Skeleton className="h-6 w-9/12 mb-2" />
							</>
						) : (
							parse(story?.content || "")
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default StoriesContent;
