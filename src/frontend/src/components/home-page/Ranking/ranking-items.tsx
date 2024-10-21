

interface RankingItemProps {
    rank : number;
    name : string,
    score : number;
    index : number;
}

const RankingItem:React.FC<RankingItemProps> = ({ rank, name, score, index }) => {
    const getMedalImage = (index: number) => {
      switch (index) {
        case 0:
          return "gold-medal.png";
        case 1:
          return "silver-medal.png";
        case 2:
          return "bronzer-medal.png";
        default:
          return "plant.png";
      }
    };
  
    return (
      <div
        className={`grid grid-cols-2 items-center h-16 w-full rounded-lg border shadow ${
          index % 2 === 0 ? "bg-[#ECEDED]" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-x-6 px-2">
          <img className="h-8 w-8 object-scale-down" src={getMedalImage(index)} alt="ranking" />
          <span className="text-base font-medium line-clamp-1">
            {rank}. {name}
          </span>
        </div>
        <span className="text-base text-center font-medium">{score}</span>
      </div>
    );
  };
  
  export default RankingItem;
  