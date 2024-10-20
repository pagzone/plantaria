import { ScrollArea } from "@/components/ui/scroll-area";

const Ranking = () => {
	const rankings = [
		{ userid: 1, rank: 1, name: "Gian the cotton farmer", score: 10000 },
		{ userid: 2, rank: 2, name: "Marie the rice farmer", score: 9500 },
		{ userid: 3, rank: 3, name: "Carlos the corn farmer", score: 9000 },
		{ userid: 4, rank: 4, name: "Anna the wheat farmer", score: 8500 },
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
					<div className="flex flex-col gap-y-2 h-[67rem]">
						{rankings.map((ranking,index) => (
							<div
								key={ranking.userid}
								className={`grid grid-cols-2 items-center h-16 w-full rounded-lg border shadow ${index % 2 === 0 ? "bg-[#ECEDED]" : "bg-white"}`}
							>
								<div className="flex items-center gap-x-6 px-2">
									<img
										className="h-8 w-8 object-scale-down object-center"
										src={
											index === 0
												? "gold-medal.png"
												: index === 1
													? "silver-medal.png"
													: index === 2
														? "bronzer-medal.png"
														: "plant.png"
										}
										alt="ranking"
									/>
									<span className="text-base font-medium line-clamp-1">
										{ranking.rank}.{" "}{ranking.name}
									</span>
								</div>
								<span className="text-base text-center font-medium">
									{ranking.score}
								</span>
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Ranking;
