import { FC } from "react";

type FeaturedProps = {
   title : string;
   image : string;
   description : string;
}

const FeaturedCard:FC<FeaturedProps> = ({ ...params }) => {
  return (  
    <div className="relative h-full z-10">
      <article className={`inset-0 rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer`} 
           style={{ backgroundPosition: "60%", backgroundImage : `url('${params.image}')`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 rounded-xl" />

            <span className="text-2xl md:text-3xl font-bold">Featured Tutorial</span>
            <div className="flex flex-col z-10">
                <p className="text-lg md:text-xl font-bold text-white">{params.title}</p>
                <p className="max-md:text-sm text-ellipsis break-words line-clamp-3 text-white max-md:h-16 ">{params.description}</p>
            </div>
      </article>
    </div>
  )
}

export default FeaturedCard;