import { Button } from "@/components/ui/button"
import { PageRoutes } from "@/constants/PageRoutes"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="flex items-center justify-end max-md:hidden">
        <div className="w-4/6">
          <img
            src="angry-plant.png"
            alt="angry-plant"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 md:h-3/4 h-full">
        <div className="w-4/6	">
          <img 
              src="404.png" 
              alt="404" 
              />
        </div>
        <div className="flex gap-x-2">
             <Link to={PageRoutes.LANDING}>
               <Button>
                Home             
               </Button>
             </Link>
          <Button variant={"outline"}>Contact Us</Button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound