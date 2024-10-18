import { Button } from "@/components/ui/button"

const PageNotFound = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="flex items-center justify-end">
        <div className="w-4/6">
          <img
            src="angry-plant.png"
            alt="angry-plant"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 h-3/4">
        <div className="w-4/6	">
          <img 
              src="404.png" 
              alt="404" 
              />
        </div>
        <div className="flex gap-x-2">
          <Button>Home</Button>
          <Button variant={"outline"}>Contact Us</Button>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound