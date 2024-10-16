import { CategoriesCB } from "@/components/catergories-cb"
import { ScrollArea } from "@/components/ui/scroll-area";

const Ranking = () => {

    const rankings = [
        { name: "1. Gian the cotton farmer", score: 10000 },
        { name: "2. Marie the rice farmer", score: 9500 },
        { name: "3. Carlos the corn farmer", score: 9000 },
        { name: "4. Anna the wheat farmer", score: 8500 },
    ];

    return (
        <div className="h-full flex flex-col px-3 gap-y-4">
            <div className="w-full flex justify-between">
                <h1 className="font-bold text-3xl">Rankings</h1>
                <CategoriesCB />
            </div>
            <div className="flex flex-col gap-y-6">
                <div className="grid grid-cols-2">
                    <div className="flex gap-x-6">
                        <div className="text-xl font-bold">Rank</div>
                        <div className="text-xl font-bold">User</div>
                    </div>
                    <div className="text-xl font-bold text-center">Contribution Points</div>
                </div>

                <ScrollArea>
                    <div className="flex flex-col gap-y-2 h-[67rem]">
                        {rankings.map((ranking, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-2 items-center h-16 w-full rounded-lg border shadow ${index % 2 === 0 ? "bg-white" : "bg-slate-200"}`}
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
                                    <span className="text-base font-medium line-clamp-1">{ranking.name}</span>
                                </div>
                                <span className="text-base text-center font-medium">{ranking.score}</span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Ranking