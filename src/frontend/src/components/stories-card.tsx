import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type StoriesCardProps = {
	storyImg: string;
	projectName: string;
	description: string;
};

const StoriesCard: React.FC<StoriesCardProps> = ({ ...params }) => {
	return (
		<Card className="rounded-lg shadow-lg">
			<CardHeader>
				<img
					className="bg-slate-400 rounded-t-lg object-cover"
					height={500}
					width={800}
					src={params.storyImg}
					alt="story"
				/>
			</CardHeader>
			<CardContent className="text-center p-2">
				<CardTitle className="font-bold text-lg text-gray-800 mb-2">
					{params.projectName}
				</CardTitle>
				<CardDescription className="text-gray-600 text-ellipsis">
					{params.description}
				</CardDescription>
			</CardContent>
		</Card>
	);
};

export default StoriesCard;
