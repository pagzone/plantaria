import CommentArea from "@/components/CommentArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageRoutes } from "@/constants/PageRoutes";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


const TutorialPage = () => {
  const [onFavorite, setOnFavorite] = useState(false);
  
  return (
    <div className="flex flex-col h-full gap-y-4 px-4 md:px-8 py-4">
      <Link className="flex items-center gap-x-1" to={PageRoutes.HOME}>
        <ArrowLeft size={25} />
        <span className="text-lg md:text-xl font-bold hover:underline">Home</span>
      </Link>

      <div className="flex flex-col gap-y-4">
        <div
          className="rounded-xl h-60 md:h-72 p-6 bg-cover bg-no-repeat flex flex-col justify-between cursor-pointer"
          style={{
            backgroundPosition: "60%",
            backgroundImage: `url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b')`,
          }}
        />

        <h1 className="text-2xl md:text-4xl font-bold">A Quick Guide to Vertical Farming</h1>

        {/* Author and Date Section */}
        <div className="flex items-center justify-between gap-2 ">
          <div className="flex items-center gap-x-2">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b"
              alt="avatar-image"
            />
            <span className="text-lg font-medium hover:underline cursor-pointer">Profile Name</span>
          </div>

          <div className="flex items-center gap-x-2 ">
            <div
              className="flex items-center gap-x-1 text-sm cursor-pointer 2"
              onClick={() => setOnFavorite(!onFavorite)}
            >
              <Heart className={`${onFavorite ? "text-red-500 fill-red-500" : "text-black"}`} size={20} />
              <span className="max-md:hidden">Add to favorites</span>
            </div>
          </div>
        </div>

      </div>

      {/* Scrollable Content */}
      <ScrollArea>
        <div className="h-96 mx-auto px-4 py-8">
          
        </div>
      </ScrollArea>
          
      {/* Comments Area */}
      <div className="h-96 p-4 ">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
         <CommentArea/>
      </div>
    </div>
  );
};

export default TutorialPage;
