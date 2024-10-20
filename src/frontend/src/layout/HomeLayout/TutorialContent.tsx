import CommentArea from "@/components/CommentArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageRoutes } from "@/constants/PageRoutes";
import { QueryKeys } from "@/constants/QueryKeys";
import { fetchTutorial } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; 

const TutorialContent = () => {
	const { id } = useParams();
	const [onFavorite, setOnFavorite] = useState(false);

	if (!id) {
		toast.error("Tutorial not found");
		return <Navigate to={PageRoutes.HOME} />;
	}

	const { data, isLoading, isError, error } = useQuery(
		[QueryKeys.TUTORIAL, id],
		async () => {
			const response = await fetchTutorial(id!);
			return response;
		},
		{
			enabled: !!id,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			refetchOnReconnect: true,
		},
	);

	if (isError && error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	const tutorial = data?.data;

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
							backgroundImage: `url('${tutorial?.thumbnail}')`,
						}}
					/>
				)}

				{isLoading ? (
					<Skeleton className="h-8 md:h-10 w-3/4 rounded-md" />
				) : (
					<h1 className="text-2xl md:text-4xl font-bold">{tutorial?.title}</h1>
				)}

				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-x-2">
						{isLoading ? (
							<>
								<Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
								<Skeleton className="h-6 w-32 rounded-md" />
							</>
						) : (
							<>
								<img
									className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
									src={tutorial?.user.avatar_link ?? "./images/default_avatar.jpeg"}
									alt="Avatar"
								/>
								<span className="text-lg font-medium hover:underline cursor-pointer">
									{tutorial?.user.name}
								</span>
							</>
						)}
					</div>

					{/* Favorite Button */}
					<div className="flex items-center gap-x-2">
						<div
							className="flex items-center gap-x-1 text-sm cursor-pointer"
							onClick={() => setOnFavorite(!onFavorite)}
						>
							<Heart
								className={`${onFavorite ? "text-red-500 fill-red-500" : "text-black"}`}
								size={20}
							/>
							<span className="max-md:hidden">Add to favorites</span>
						</div>
					</div>
				</div>
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
						parse(tutorial?.content || "")
					)}
				</div>
			</ScrollArea>

			<div className="h-96 p-4">
				<h2 className="text-2xl font-semibold mb-4">Comments</h2>
				{isLoading ? (
					<>
						<Skeleton className="h-6 w-full mb-2" />
						<Skeleton className="h-6 w-11/12 mb-2" />
						<Skeleton className="h-6 w-10/12 mb-2" />
						<Skeleton className="h-6 w-9/12 mb-2" />
					</>
				) : (
					<CommentArea />
				)}
			</div>
		</div>
	);
};

export default TutorialContent;
