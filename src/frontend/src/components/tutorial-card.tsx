import { FC, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

type TutorialCardProps = {
	tutorialImage: string;
	userAvatar: string;
	userName: string;
	title: string;
	content: string;
};

const TutorialCard: FC<TutorialCardProps> = ({ tutorialImage, userAvatar, userName, title, content }) => {
	const [onFavorite, setOnFavorite] = useState(false);

	const handleFavoriteClick = () => {
		setOnFavorite(!onFavorite);
	};

	return (
		<Card className="h-auto w-80 md:w-72 min-lg:w-60 cursor-pointer rounded-lg shadow-lg">
			<CardHeader className="h-52">
				<img
					className="h-full w-full object-cover rounded-t-lg"
					src={tutorialImage}
					alt={`Tutorial image for ${title}`}
				/>
			</CardHeader>

			<CardContent className="flex flex-col gap-y-4 p-4">
				<div className="flex items-center gap-2">
					<img
						className="w-10 h-10 rounded-full object-cover"
						src={userAvatar}
						alt={`Avatar of ${userName}`}
					/>
					<CardTitle className="font-medium text-base">{userName}</CardTitle>
				</div>

				<div className="flex flex-col">
					<span className="font-medium text-lg truncate">{title}</span>
					<CardDescription className="line-clamp-3 text-gray-600">
						{content}
					</CardDescription>
				</div>

				<div
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
				</div>
			</CardContent>
		</Card>
	);
};

export default TutorialCard;
