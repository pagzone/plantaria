import Tab from "@/components/home-page/tab";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import Stories from "@/layout/HomeLayout/Stories";
import { Home, Star, Trophy } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
	const [activeTab, setActiveTab] = useState("Home");

	
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
						<Stories/>
					</section>
				</aside>

				<section className="flex-1">
					<Outlet />
				</section>
			</div>
			<Footer />
		</main>
	);
};

export default HomePage;
