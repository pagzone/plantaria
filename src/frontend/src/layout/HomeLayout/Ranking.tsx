import CurrentUserRanking from "@/components/home-page/Ranking/current-user-rank";
import RankingItem from "@/components/home-page/Ranking/ranking-items";
import { ScrollArea } from "@/components/ui/scroll-area";

const Ranking = () => {
	const rankings = [
		{ userid: 1, rank: 1, name: "Gian the cotton farmer", score: 10000 },
		{ userid: 2, rank: 2, name: "Marie the rice farmer", score: 9500 },
		{ userid: 3, rank: 3, name: "Carlos the corn farmer", score: 9000 },
		{ userid: 4, rank: 4, name: "Anna the wheat farmer", score: 8500 },
		{ userid: 5, rank: 5, name: "Samuel the soybean farmer", score: 8000 },
		{ userid: 6, rank: 6, name: "Nina the barley farmer", score: 7800 },
		{ userid: 7, rank: 7, name: "Oliver the oat farmer", score: 7600 },
		{ userid: 8, rank: 8, name: "Sophia the tomato farmer", score: 7400 },
		{ userid: 9, rank: 9, name: "Mia the potato farmer", score: 7200 },
		{ userid: 10, rank: 10, name: "Liam the pumpkin farmer", score: 7000 },
		{ userid: 11, rank: 11, name: "Noah the cucumber farmer", score: 6800 },
		{ userid: 12, rank: 12, name: "Emma the carrot farmer", score: 6600 },
		{ userid: 13, rank: 13, name: "Amelia the spinach farmer", score: 6400 },
		{ userid: 14, rank: 14, name: "Jacob the lettuce farmer", score: 6200 },
		{ userid: 15, rank: 15, name: "Isabella the garlic farmer", score: 6000 },
		{ userid: 16, rank: 16, name: "Elijah the onion farmer", score: 5800 },
		{ userid: 17, rank: 17, name: "Ava the eggplant farmer", score: 5600 },
		{ userid: 18, rank: 18, name: "James the bell pepper farmer", score: 5400 },
		{ userid: 19, rank: 19, name: "Charlotte the radish farmer", score: 5200 },
		{ userid: 20, rank: 20, name: "Luna the kale farmer", score: 5000 },
		{ userid: 21, rank: 21, name: "Lucas the broccoli farmer", score: 4800 },
		{ userid: 22, rank: 22, name: "Zoe the cauliflower farmer", score: 4600 },
		{ userid: 23, rank: 23, name: "Henry the bean farmer", score: 4400 },
		{ userid: 24, rank: 24, name: "Ella the asparagus farmer", score: 4200 },
		{ userid: 25, rank: 25, name: "Jack the squash farmer", score: 4000 },
		{ userid: 26, rank: 26, name: "Mason the blueberry farmer", score: 3800 },
		{ userid: 27, rank: 27, name: "Scarlett the raspberry farmer", score: 3600 },
		{ userid: 28, rank: 28, name: "Ethan the blackberry farmer", score: 3400 },
		{ userid: 29, rank: 29, name: "Grace the strawberry farmer", score: 3200 },
		{ userid: 30, rank: 30, name: "Aria the peach farmer", score: 3000 },
		{ userid: 31, rank: 31, name: "Aiden the cherry farmer", score: 2800 },
		{ userid: 32, rank: 32, name: "Chloe the grape farmer", score: 2600 },
		{ userid: 33, rank: 33, name: "Caleb the fig farmer", score: 2400 },
		{ userid: 34, rank: 34, name: "Natalie the olive farmer", score: 2200 },
		{ userid: 35, rank: 35, name: "Ryan the pomegranate farmer", score: 2000 },
		{ userid: 36, rank: 36, name: "Mila the persimmon farmer", score: 1800 },
		{ userid: 37, rank: 37, name: "Wyatt the apricot farmer", score: 1600 },
		{ userid: 38, rank: 38, name: "Lily the lemon farmer", score: 1400 },
		{ userid: 39, rank: 39, name: "Benjamin the lime farmer", score: 1200 },
		{ userid: 40, rank: 40, name: "Sofia the orange farmer", score: 1000 },
		{ userid: 41, rank: 41, name: "Oliver the tangerine farmer", score: 800 },
		{ userid: 42, rank: 42, name: "Henry the grapefruit farmer", score: 600 },
		{ userid: 43, rank: 43, name: "Emma the coconut farmer", score: 400 },
		{ userid: 44, rank: 44, name: "Alexander the walnut farmer", score: 200 },
		{ userid: 45, rank: 45, name: "Victoria the almond farmer", score: 100 },
		{ userid: 46, rank: 46, name: "Santiago the pecan farmer", score: 90 },
		{ userid: 47, rank: 47, name: "Julian the hazelnut farmer", score: 80 },
		{ userid: 48, rank: 48, name: "Cameron the cashew farmer", score: 70 },
		{ userid: 49, rank: 49, name: "Jasmine the macadamia farmer", score: 60 },
		{ userid: 50, rank: 50, name: "Anthony the peanut farmer", score: 50 },
	];
	

	return (
		<div className="h-full flex flex-col px-3 gap-y-4">
			<h1 className="hidden md:block font-bold md:text-3xl">Rankings</h1>

			<div className="flex flex-col gap-y-6 max-md:mt-4">
				<div className="grid grid-cols-2 items-center">
					<div className="flex gap-x-6">
						<div className="text-base md:text-xl font-semibold font-">Rank</div>
						<div className="text-base md:text-xl font-semibold">User</div>
					</div>
					<div className="text-base font-semibold text-center truncate">
						Contribution Points
					</div>
				</div>

				<ScrollArea>
					<div className="relative flex flex-col gap-y-2 h-[68rem] px-1.5 pb-4">
						{rankings.map((ranking, index) => (
							<RankingItem 
							      rank={ranking.rank} 
								  name={ranking.name} 
								  score={ranking.score} 
								  index={index} 
								  currentUser={ranking.userid === 2}
							/>
						))}

					{/* current user  */}
					  <CurrentUserRanking 
					        rank={500} 
							name={"kaiouzku"} 
							score={0}					  
					  />
				  </div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Ranking;
