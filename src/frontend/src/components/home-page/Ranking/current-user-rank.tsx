
interface CurrentUserRankingProps{
    rank : number;
    name : string;
    score : number;
}

const CurrentUserRanking:React.FC<CurrentUserRankingProps> = ({ rank, name, score }) => {
    return (
      <div className="sticky bottom-0 mt-auto grid grid-cols-2 py-2 items-center h-16 w-full rounded-lg border shadow bg-[#ECEDED] z-20">
        <div className="flex items-center gap-x-6 px-2">
          <img className="h-8 w-8 object-scale-down" src="plant.png" alt="current user ranking" />
          <span className="text-base font-medium line-clamp-1">
            {rank}. {name}
          </span>
        </div>
        <span className="text-base text-center font-medium">{score}</span>
      </div>
    );
  };
  
  export default CurrentUserRanking;
  