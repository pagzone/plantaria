import { FC } from "react";

type FeaturedProps = {
   title : string;
   image : string;
   description : string;
}

const FeaturedCard:FC<FeaturedProps> = ({ ...params }) => {
  return (  
    <div className="relative h-full">
      <article className={`inset-0 rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer
        hover:scale-[1.01] transition-transform
      `} 
           style={{ backgroundPosition: "60%", backgroundImage : `url('${params.image}')`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 rounded-xl" />

            <span className="text-2xl md:text-3xl font-bold">Featured Tutorial</span>
            <div className="flex flex-col z-10">
                <p className="text-lg md:text-xl font-bold text-white">{params.title}</p>
                <p className="max-md:text-sm ext-ellipsis text-white ">{params.description}</p>
            </div>
      </article>
    </div>
  )
}

export default FeaturedCard;