import CategoriesCB from "@/components/header/categories-cb";
import FeaturedCard from "@/components/home-page/HomeContent/featured-card";
import PageSelector from "@/components/home-page/HomeContent/pagination";
import TutorialCard from "@/components/home-page/HomeContent/tutorial-card";
import TutorialCardSkeleton from "@/components/skeletons/tutorialCard-skeleton";
import { QueryKeys } from "@/constants/QueryKeys";
import { fetchTutorials } from "@/lib/api";
import { getPlainTextFromHtml } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";

const HomeContent = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page");

	const featured = {
		image: "plants-being-planted-greenhouse.png",
		title: "Lorem Ipsum",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure repellendus modi deleniti dolores? Explicabo quisquam nihil tempore dolor vel facere odit voluptates. Deserunt modi atque reprehenderit non ratione. Corporis, molestiae",
	};

	const {
		data,
		isLoading: isTutorialsLoading,
		isError: isTutorialsError,
		error: tutorialsError,
		refetch,
	} = useQuery(
		[QueryKeys.TUTORIALS, page || "1"],
		async () => {
			const response = await fetchTutorials(parseInt(page || "1"));
			return response;
		},
		{
			keepPreviousData: true,
		},
	);

	if (isTutorialsError && tutorialsError instanceof Error) {
		return <div>Error: {tutorialsError.message}</div>;
	}

	const tutorials = data?.data![0];

	return (
		<div className="flex flex-col gap-y-6 h-full">
			<Link
				to={`/featured/${1}`} //featured id;
				className="h-60 md:h-72 ">
				<FeaturedCard
					title={featured.title}
					description={featured.description}
					image={featured.image}
				/>
			</Link>

			<div className="flex flex-col h-full gap-y-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold md:text-3xl">Tutorials</h1>
					<div className="hidden max-md:block">
						<CategoriesCB />
					</div>
				</div>

				<div className="flex flex-col gap-y-4 h-full">
					<div className="flex flex-1 items-start flex-wrap gap-4">
						{isTutorialsLoading
							? Array(tutorials?.length) 
								.fill(0)
								.map((_, index) => <TutorialCardSkeleton key={index} />)
							: tutorials?.map((tutorial) => (
								<Link 
								   key={tutorial.id} 
								   to={`/tutorial/${tutorial.id}`}>
									<TutorialCard
										tutorialImage={tutorial.thumbnail}
										userAvatar={tutorial.user.avatar_link}
										userName={tutorial.user.name}
										title={tutorial.title}
										content={getPlainTextFromHtml(tutorial.content)}
									/>
								</Link>
							))}
					</div>
					<PageSelector
						tutorials={tutorials || []}
						currentPage={parseInt(page || "1")}
						setCurrentPage={(page) =>
							setSearchParams({ page: page.toString() })
						}
						itemsPerPage={6}
					/>
				</div>
			</div>
		</div>
	);
};

export default HomeContent;