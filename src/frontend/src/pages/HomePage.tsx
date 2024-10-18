import StoriesCard from "@/components/stories-card";
import Tab from "@/components/tab";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import HomeContent from "@/layout/HomeLayout/Home";
import {
	Building2,
	GalleryHorizontalEnd,
	Home,
	Sheet,
	Star,
	Trophy,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Ranking from "@/layout/HomeLayout/Ranking";
import Favorites from "@/layout/HomeLayout/Favorites";

type Stories = {
	storyImg: string;
	projectName: string;
	description: string;
};

const HomePage = () => {
	const [activeTab, setActiveTab] = useState<string>("Home");

	const resources: Stories[] = [
		{
			storyImg:
				"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
			projectName: "Urban Farming Revolution",
			description:
				"A project aimed at boosting sustainable agriculture in urban environments.",
		},
		{
			storyImg: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
			projectName: "Smart Farming Technologies",
			description:
				"Integrating modern technology with traditional farming methods for better yields.",
		},
		{
			storyImg: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
			projectName: "Organic Farming Solutions",
			description:
				"Providing innovative solutions for organic farming practices.",
		},
		{
			storyImg: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
			projectName: "Sustainable Crop Development",
			description:
				"Developing crops that can thrive in urban settings with limited resources.",
		},
		{
			storyImg: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b",
			projectName: "Vertical Farming Innovations",
			description:
				"Revolutionizing farming with vertical agriculture techniques.",
		},
		{
			storyImg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
			projectName: "Community Farming Initiative",
			description:
				"Empowering communities to grow their own food using sustainable methods.",
		},
	];

	return (
		<main className="relative h-screen flex flex-col gap-y-4 md:mx-[75px] max-md:px-4">
			<Header />
			<div className="flex md:gap-x-6 max-md:flex-col justify-center max-md:gap-y-1">
				<aside className="flex md:flex-col gap-y-2 md:w-1/4 w-full justify-center items-center">
					<nav className="flex md:gap-x-8 w-full">
						<Tab
							label="Home"
							icon={Home}
							isActive={activeTab === "Home"}
							onClick={() => setActiveTab("Home")}
						/>
						<Tab
							label="Ranking"
							icon={Trophy}
							isActive={activeTab === "Ranking"}
							onClick={() => setActiveTab("Ranking")}
						/>
						<Tab
							label="Favorites"
							icon={Star}
							isActive={activeTab === "Favorites"}
							onClick={() => setActiveTab("Favorites")}
						/>
					</nav>

					<section className="hidden md:block p-4 h-full rounded-lg bg-[#ECEDED] shadow-md">
						<h2 className="text-xl font-semibold mb-4">Stories</h2>
						<ScrollArea className="h-[40rem] lg:h-[67rem]">
							<div className="flex flex-col gap-y-4 py-1.5 px-2">
								{resources.map((resource, index) => (
									<StoriesCard
										key={index}
										storyImg={resource.storyImg}
										projectName={resource.projectName}
										description={resource.description}
									/>
								))}
							</div>
						</ScrollArea>
					</section>
				</aside>

				{/* CONTENT */}
				<section className="flex-1">
					{activeTab === "Home" ? (
						<HomeContent />
					) : activeTab === "Ranking" ? (
						<Ranking />
					) : activeTab === "Favorites" ? (
						<Favorites/>
					) : null}
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default HomePage;
