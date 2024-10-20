import CategoriesCB from "@/components/categories-cb";
import FeaturedCard from "@/components/featured-card";
import PageSelector from "@/components/pagination";
import TutorialCard from "@/components/tutorial-card";
import { QueryKeys } from "@/constants/QueryKeys";
import { ITutorial } from "@/interface/ITutorial";
import { fetchTutorials } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { parse } from "path";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";


const HomeContent = () => {
	const [searchParams, set] = useSearchParams();
	const page = searchParams.get("page");

	const featured = {
		image: "plants-being-planted-greenhouse.png",
		title: "lorem Ipsum ",
		description:
			"lLorem ipsum dolor sit, amet consectetur adipisicing elit. Iure repellendus modi deleniti dolores? Explicabo quisquam nihil tempore dolor vel facere odit voluptates. Deserunt modi atque reprehenderit non ratione. Corporis, molestiae",
	};

	// const {
	// 	data,
	// 	isLoading: isTutorialsLoading,
	// 	error: tutorialsError,
	// 	refetch,
	// } = useQuery([QueryKeys.TUTORIALS], async () => {
	// 	const data = fetchTutorials(parseInt(page || "1"));

	// 	return data;
	// });

	// if (isTutorialsLoading) {
	// 	return <div>Loading...</div>;
	// }

	// const tutorials = data!.data;

	return (
		<div className="flex flex-col gap-y-6 h-full">
			<div className="h-60 md:h-72 ">
				<FeaturedCard
					title={featured.title}
					description={featured.description}
					image={featured.image}
				/>
			</div>

			<div className="flex flex-col h-full gap-y-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold md:text-3xl">Tutorials</h1>
					<div className="hidden max-md:block">
						<CategoriesCB />
					</div>
				</div>

				<div className="flex flex-col justify-between items-center gap-y-4 h-full">
					<div className="flex flex-wrap gap-x-1 min-lg:gap-x-4 gap-y-2  ">
						{/* {tutorials.map((value: any) => (
							<Link key={value.id} to={`/tutorial/${value.id}`}
							>
								<TutorialCard	
									key={value.id}
									tutorialImage={value.thumbnail}
									userAvatar={value.user.avatar_url}
									userName={value.profileName}
									title={value.title}
									content={value.content}
								/>
							</Link>
						))} */}
					</div>
					{/* <PageSelector
						tutorials={tutorials}
						currentPage={parseInt(page || "1")}
						setCurrentPage={(page) => searchParams.set("page", page.toString())}
						itemsPerPage={6}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default HomeContent;
