import { FC, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription, CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useFetchAvatar } from "@/hooks/useFetchAvatar";
import Profile from "@/components/profile-page/avatar";

type TutorialCardProps = {
	tutorialId: string;
	tutorialImage: string;
	userAvatar: string;
	userName: string;
	userId?: string;
	title: string;
	content: string;
};

const TutorialCard: FC<TutorialCardProps> = ({
	tutorialId,
	tutorialImage,
	userAvatar,
	userName,
	userId,
	title,
	content,
}) => {
	// const [onFavorite, setOnFavorite] = useState(false);

	// const handleFavoriteClick = () => {
	// 	setOnFavorite(!onFavorite);
	// };

	const { data: avatarUrl } = useFetchAvatar(
		tutorialId,
		userAvatar,
	);

	return (
		<Card className="h-96 w-80 md:w-72 min-lg:w-60 cursor-pointer rounded-lg shadow-lg">
			<CardHeader className="h-52">
				<img
					className="h-full w-full object-cover rounded-t-lg"
					src={tutorialImage}
					alt={`Tutorial image for ${title}`}
				/>
			</CardHeader>

			<CardContent className="flex flex-col gap-y-4 p-4">
				<div className="flex items-center gap-2">
					<Profile
						className="size-10 bg-slate-400"
						userAvatar={avatarUrl}
						userName={userName}
						userId={userId}
					/>
					<CardTitle className="font-medium text-base">{userName}</CardTitle>
				</div>

				<div className="flex flex-col">
					<span className="font-medium text-lg truncate">{title}</span>
					<CardDescription className="line-clamp-2 text-gray-600 truncate">
						{content}
					</CardDescription>
				</div>

				{/* <div
					className="flex items-center gap-1 text-sm cursor-pointer"
					onClick={handleFavoriteClick}
					aria-label={onFavorite ? "Remove from favorites" : "Add to favorites"}
					role="button"
				>
					<Heart
						className={`transition-colors duration-300 ${onFavorite ? "text-red-500 fill-red-500" : "text-black"}`}
						size={20}
					/>
					<span>{onFavorite ? "Favorited" : "Add to favorites"}</span>
				</div> */}
			</CardContent>
		</Card>
	);
};

export default TutorialCard;
