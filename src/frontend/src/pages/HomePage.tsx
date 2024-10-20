import StoriesCard from "@/components/stories-card";
import Tab from "@/components/tab";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import {
	Home,
	Star,
	Trophy,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

type Stories = {
	id : number;
	storyImg: string;
	projectName: string;
	description: string;
};

const HomePage = () => {
	const [activeTab, setActiveTab] = useState("Home")

	const resources: Stories[] = [
		{
			id : 1,
			storyImg:
				"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
			projectName: "Urban Farming Revolution",
			description:
				"A project aimed at boosting sustainable agriculture in urban environments.",
		},
		{
			id : 2,
			storyImg: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
			projectName: "Smart Farming Technologies",
			description:
				"Integrating modern technology with traditional farming methods for better yields.",
		},

	];

	return (
		<main className="relative h-screen flex flex-col gap-y-4 lg:mx-[75px] max-lg:px-4">
			<Header />
			<div className="flex lg:gap-x-6 max-lg:flex-col justify-center max-md:gap-y-1">
				<aside className="flex lg:flex-col gap-y-2 lg:w-1/4 w-full justify-center items-center">
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

					<section className="hidden lg:block p-4 h-full rounded-lg bg-[#ECEDED] shadow-md">
						<h2 className="text-xl font-semibold mb-4">Stories</h2>
						<ScrollArea className="h-[40rem] lg:h-[67rem]">
							<div className="flex flex-col gap-y-4 py-1.5 px-2">
								{resources.map((resource) => (
									<Link 
									 	key={resource.id}
									    to={`/stories/${resource.id}`}>
										<StoriesCard
											key={resource.id}
											storyImg={resource.storyImg}
											projectName={resource.projectName}
											description={resource.description}
										/>
									</Link>
								))}
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
