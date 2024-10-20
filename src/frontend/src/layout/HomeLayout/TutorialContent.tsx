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

const TutorialContent = () => {
	const { id } = useParams();
	const [onFavorite, setOnFavorite] = useState(false);

	if (!id) {
		toast.error("Tutorial not found");
		return <Navigate to={PageRoutes.HOME} />;
	}

	const { data, isLoading, error, refetch } = useQuery(
		[QueryKeys.TUTORIAL],
		async () => {
			const data = fetchTutorial(id!);

			return data;
		},
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const tutorial = data!.data;

	console.log(tutorial);

	return (
		<div className="flex flex-col h-full gap-y-4 px-4 md:px-8 py-4">
			<Link className="flex items-center gap-x-1" to={PageRoutes.HOME}>
				<ArrowLeft size={25} />
				<span className="text-lg md:text-xl font-bold hover:underline">
					Home
				</span>
			</Link>

			<div className="flex flex-col gap-y-4">
				<div
					className="rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer"
					style={{
						backgroundPosition: "60%",
						backgroundImage: `url('${tutorial?.thumbnail}')`,
					}}
				/>

				<h1 className="text-2xl md:text-4xl font-bold">{tutorial?.title}</h1>

				{/* Author and Date Section */}
				<div className="flex items-center justify-between gap-2 ">
					<div className="flex items-center gap-x-2">
						<img
							className="bg-gray-400 size-10 md:w-12 md:h-12 rounded-full object-cover"
							src={tutorial?.user.avatar_link}
							alt="Avatar"
						/>
						<span className="text-lg font-medium hover:underline cursor-pointer">
							{tutorial?.user.name}
						</span>
					</div>

					<div className="flex items-center gap-x-2 ">
						<div
							className="flex items-center gap-x-1 text-sm cursor-pointer 2"
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

			{/* Scrollable Content */}
			<ScrollArea>
				<div className="min-h-96 mx-auto">
					{parse(tutorial?.content || "")}
				</div>
			</ScrollArea>

			{/* Comments Area */}
			<div className="h-96 p-4 ">
				<h2 className="text-2xl font-semibold mb-4">Comments</h2>
				<CommentArea />
			</div>
		</div>
	);
};

export default TutorialContent;
