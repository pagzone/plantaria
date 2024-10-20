import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/PageRoutes";
import Footer from "@/layout/Footer";
import Header from "@/layout/LandingLayout/Header";
import { ArrowUpRight, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import NumberTicker from "@/components/ui/number-ticker";
import Marquee from "@/components/ui/marquee";

const LandingPage = () => {

	
	return (
		<div className="flex flex-col gap-y-8 max-md:gap-y-4">
			<Header />
			<section className="md:h-[55rem] max-md:h-[40rem] flex flex-col items-center justify-center md:mx-[75px]  max-md:gap-y-6">
				<div className="flex flex-col items-center gap-y-6 p-4 font-medium text-center">
					<div className="text-3xl md:text-6xl leading-snug flex flex-col">
						<span>Join Us In a</span>
						<div className="flex gap-x-1 items-center">
							<span className="bg-lima-200 rounded-full md:px-4 py-2 max-md:w-52">
								Hunger Free
							</span>
							<span>World</span>
						</div>
					</div>
					<Button
						className="flex items-center gap-1 bg-primary font-medium rounded-full shadow-md transition-transform transform hover:scale-105"
						asChild
					>
						<Link to={PageRoutes.HOME}>
							<span className="text-sm text-white">Visit us</span>
							<ArrowUpRight
								className="bg-white p-1 rounded-full text-black"
								size={20}
							/>
						</Link>
					</Button>
				</div>

				<div className="h-72 md:h-80 w-full flex justify-center md:items-end gap-x-4 p-4 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory">
					<div className="h-60 w-60 md:h-full flex-shrink-0 rounded-3xl bg-center shadow-lg snap-center">
						<img
							src="woman-in-greenhouse.png"
							alt="Woman in Greenhouse"
							className="h-full w-full rounded-3xl object-cover"
						/>
					</div>

					<div className="h-60 w-48 md:h-4/5 flex-shrink-0 rounded-3xl bg-lima-700 flex flex-col justify-center items-center text-white shadow-lg snap-center">
						<span className="text-5xl font-bold">
							<NumberTicker className="text-white" value={200} />+
						</span>
						<span className="text-lg font-medium">monthly</span>
						<span className="text-lg font-medium">users</span>
					</div>

					<div className="h-60 w-60 md:h-4/6 flex-shrink-0 rounded-3xl bg-lima-200 flex flex-col justify-center items-center text-lima-900 shadow-lg snap-center">
						<span className="text-5xl font-bold">
							<NumberTicker className="text-lima-900" value={500} />+
						</span>
						<span className="text-lg font-medium">Urban Farming</span>
						<span className="text-lg font-medium">Tutorials</span>
					</div>

					<div className="h-60 w-48 md:h-4/5 flex-shrink-0 rounded-3xl bg-lima-500 flex flex-col justify-center items-center text-white shadow-lg snap-center">
						<span className="text-5xl font-bold">
							<NumberTicker className="text-white" value={50} />+
						</span>
						<span className="text-lg font-medium">Daily farming</span>
						<span className="text-lg font-medium">Resources</span>
					</div>

					<div className="h-60 w-60 md:h-full flex-shrink-0 rounded-3xl bg-center text-white shadow-lg snap-center">
						<img
							src="couple-checking-plants.png"
							alt="Couple checking plants"
							className="h-full w-full object-cover rounded-3xl"
						/>
					</div>
				</div>
			</section>

			<div className="bg-primary">
				<Marquee repeat={24} className="flex items-center [--duration:20s]">
					<span className="text-xl font-bold text-white">
						Hunger-Free World
					</span>
					<div className="flex items-center flex-1">
						<Dot className="text-white size-6 inline" />
					</div>
				</Marquee>
			</div>

			<section className="h-auto md:h-[40rem] flex flex-col justify-evenly items-center mx-4 md:mx-[75px]">
				<h1 className="text-3xl sm:text-5xl font-bold max-md:my-8">
					Why It Matters?
				</h1>

				<div className="h-auto md:h-96 w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-4">
					<div className="w-4/5 md:w-1/4 h-72 flex justify-center items-center">
						<img
							src="high-food-prices.png"
							alt="High food prices continue to plague many nations despite falling in 2021."
							className="size-full object-scale-down object-center "
						/>
					</div>

					<div className="w-4/5 md:w-1/4 h-72 flex flex-col justify-center items-center">
						<img
							src="600million.png"
							alt="An alarming projection for 2030: over 600 million people worldwide facing hunger."
							className="w-full h-auto object-scale-down object-center"
						/>
					</div>

					<div className="w-4/5 md:w-1/4 h-72 flex justify-center items-center">
						<img
							src="1-in-3-people.png"
							alt="1 in 3 people worldwide struggle with moderate to severe food insecurity."
							className="size-full object-scale-down object-center"
						/>
					</div>
				</div>

				<Button
					variant={"ghost"}
					className="text-xl flex items-center gap-x-2 text-gray-500 hover:text-primary transition-colors cursor-pointer"
					asChild
				>
					<a href="https://sdgs.un.org/goals/goal2" target="_blank">
						<span>KNOW MORE</span>
						<ArrowUpRight size={30} />
					</a>
				</Button>
			</section>

			<section
				id="goals"
				className="bg-primary h-auto md:h-[40rem] max-md:py-8"
			>
				<div className="md:mx-[75px] h-full flex flex-col justify-evenly items-center">
					<h1 className="text-3xl sm:text-5xl font-bold text-white">
						Our Response
					</h1>

					<div className="h-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
						<div className="w-4/5 md:w-1/4 h-72 flex justify-center items-center">
							<img
								src="accesible-education.png"
								alt="Deliver Accessible urban farming Education"
								className="size-full object-scale-down object-center"
							/>
						</div>

						<div className="w-4/5 md:w-1/4 h-72 flex justify-center items-center">
							<img
								src="community-of-farmers.png"
								alt="Foster a connected Community of Farmers"
								className="size-full object-scale-down object-center "
							/>
						</div>

						<div className="w-4/5 md:w-1/4 h-72 flex justify-center items-center">
							<img
								src="sustainable.png"
								alt="Promote Sustainable Food Sources"
								className="size-full object-scale-down object-center "
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				id="about"
				className="h-auto md:h-[39rem] md:mx-[75px] flex flex-col items-center gap-y-6 py-8"
			>
				<h1 className="text-3xl sm:text-5xl font-bold text-center">About Us</h1>
				<div className="flex flex-col md:flex-row h-full md:space-x-6 items-center ">
					<div className="flex-1 md:w-1/2 p-4">
						<p className="text-2xl max-md:text-center">
							<span className="text-4xl font-medium text-lima-500">
								Plantaria
							</span>{" "}
							is your gateway to urban farming and sustainable food solutions.
							Inspired by the United Nations' Zero Hunger goal, we empower
							individuals to grow their own food through expert guidance,
							community support, and practical tools for sustainable
							farming—right in the city.
						</p>
					</div>

					<div className="w-full md:w-1/3	h-full p-4 flex justify-center">
						<img
							src="person-holding-a-plant.png"
							alt="Person holding a small plant"
							className="object-scale-down"
						/>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
