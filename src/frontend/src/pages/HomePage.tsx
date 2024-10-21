import StoriesCard from "@/components/home-page/stories-card";
import Tab from "@/components/home-page/tab";
import StoriesCardSkeleton from "@/components/skeletons/storiesCard-skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryKeys } from "@/constants/QueryKeys";
import { IStory } from "@/interface/IStory";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import { fetchStories } from "@/lib/api";
import { getPlainTextFromHtml } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Home, Star, Trophy } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const HomePage = () => {
	const [activeTab, setActiveTab] = useState("Home");

	const {
		data,
		isLoading: isStoriesLoading,
		isError: isStoriesError,
		error: storiesError,
	} = useQuery(
		[QueryKeys.STORIES],
		async () => {
			const response = await fetchStories();

			return response;
		},
		{
			keepPreviousData: true,
		},
	);

	if (isStoriesError && storiesError instanceof Error) {
		return <div>Error: {storiesError.message}</div>;
	}

	const stories: IStory[] | undefined = data?.data![0];

	return (
		<main className="relative h-screen flex flex-col gap-y-4 lg:mx-[75px] max-lg:px-4">
			<Header />
			<div className="flex lg:gap-x-6 max-lg:flex-col justify-center max-md:gap-y-1">
				<aside className="flex lg:flex-col gap-y-2 lg:w-1/4 w-full items-start">
					<nav className="flex lg:gap-x-8 w-full">
						<Tab
							linkTo="/home"
							label="Home"
							icon={Home}
							isActive={activeTab === "Home"}
							onClick={() => setActiveTab("Home")}
						/>
						<Tab
							linkTo="/home/ranking"
							label="Ranking"
							icon={Trophy}
							isActive={activeTab === "Ranking"}
							onClick={() => setActiveTab("Ranking")}
						/>
						<Tab
							linkTo="/home/favorites"
							label="Favorites"
							icon={Star}
							isActive={activeTab === "Favorites"}
							onClick={() => setActiveTab("Favorites")}
						/>
					</nav>

					<section className="hidden w-80 lg:block p-4 h-full rounded-lg bg-[#ECEDED] shadow-md">
						<h2 className="text-xl font-semibold mb-4">Stories</h2>
						<ScrollArea className="h-[40rem] lg:h-[67rem]">
							<div className="flex flex-col gap-y-4 py-1.5 px-2">
								{isStoriesLoading ? (
									Array(stories?.length)
										.fill(0)
										.map((_, index) => <StoriesCardSkeleton key={index} />)
								) : stories && stories.length > 0 ? (
									stories?.map((stories) => (
										<Link key={stories.id} to={`/stories/${stories.id}`}>
											<StoriesCard
												key={stories.id}
												storyImg={stories.thumbnail}
												projectName={stories.title}
												description={getPlainTextFromHtml(stories.content)}
											/>
										</Link>
									))
								) : (
									<div className="text-center text-gray-400">No Stories</div>
								)}
							</div>
						</ScrollArea>
					</section>
				</aside>

				{/* CONTENT */}
				<section className="flex-1">
					<Outlet />
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default HomePage;
