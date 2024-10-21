import { ScrollArea } from "@/components/ui/scroll-area";
import { PageRoutes } from "@/constants/PageRoutes";
import { favoriteTutorial, fetchTutorial, unfavoriteTutorial } from "@/lib/api";
import parse from "html-react-parser";
import { ArrowLeft, Heart, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchTutorial } from "@/hooks/useFetchTutorial";
import { useFavoriteStatus } from "@/hooks/useFavoriteStatus";
import { useFetchAvatar } from "@/hooks/useFetchAvatar";
import Profile from "@/components/profile-page/avatar";
import CommentSection from "@/components/comment/comment-section";
import { set } from "zod";

const TutorialContent = () => {
	const { id } = useParams();
	const [onFavorite, setOnFavorite] = useState(false);
	const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);

	if (!id) {
		toast.error("Tutorial not found");
		return <Navigate to={PageRoutes.HOME} />;
	}

	const {
		data: tutorialData,
		isLoading,
		isError,
		error,
	} = useFetchTutorial(id);
	const {
		data: isFavorite,
		isLoading: isFavoriteLoading,
		isSuccess: isFavoriteSuccess,
	} = useFavoriteStatus(id);

	const tutorial = tutorialData?.data;

	const { data: avatarUrl, isLoading: isAvatarLoading } = useFetchAvatar(
		tutorial?.user?.id ?? "",
		tutorial?.user?.avatar_link,
	);

	useEffect(() => {
		if (isFavoriteSuccess) {
			if (isFavorite.data) {
				setOnFavorite(isFavorite.data);
			}
		}
	}, [isFavorite, isFavoriteSuccess]);

	const toggleFavorite = useCallback(async () => {
		setIsFavoriteClicked(true);
		setOnFavorite((prev) => !prev);
		if (onFavorite) {
			await unfavoriteTutorial(id);
		} else {
			await favoriteTutorial(id);
		}

		setIsFavoriteClicked(false);
	}, [onFavorite, id]);

	// Error handling for fetching tutorial
	if (isError && error instanceof Error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="flex flex-col h-full gap-y-4 px-4 md:px-8 py-4">
			<Link className="flex items-center gap-x-1" to={PageRoutes.HOME}>
				<ArrowLeft size={25} />
				<span className="text-lg md:text-xl font-bold hover:underline">
					Home
				</span>
			</Link>

			<div className="flex flex-col gap-y-4">
				{/* Tutorial thumbnail */}
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

				{/* Tutorial title */}
				{isLoading ? (
					<Skeleton className="h-8 md:h-10 w-3/4 rounded-md" />
				) : (
					<h1 className="text-2xl md:text-4xl font-bold">{tutorial?.title}</h1>
				)}

				{/* User and Favorite button */}
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-x-2">
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
									userName={tutorial?.user?.name}
									userId={tutorial?.user?.id}
								/>
								<span className="text-lg font-medium hover:underline cursor-pointer">
									{tutorial?.user?.name}
								</span>
							</>
						)}
					</div>

					{/* Favorite Button */}
					<div className="flex items-center gap-x-2">
						<button
							className="flex items-center gap-x-1 text-sm cursor-pointer"
							onClick={toggleFavorite}
							disabled={isFavoriteLoading || isFavoriteClicked}
						>
							{isFavoriteLoading ? (
								<Skeleton className="w-4 h-4" />
							) : (
								<>
									{isFavoriteClicked ? (
										<LoaderCircle className="animate-spin size-4" />
									) : (
										<Heart
											className={`${onFavorite ? "text-red-500 fill-red-500" : "text-black"}`}
											size={20}
										/>
									)}
									<span className="max-md:hidden">Add to favorites</span>
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Tutorial Content */}
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

			{/* Comments Section */}
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
					<CommentSection />
				)}
			</div>
		</div>
	);
};

export default TutorialContent;
