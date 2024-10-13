import { CategoriesCB } from "@/components/CategoriesCB"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, ChevronDown, Search, Settings } from "lucide-react"

const Header = () => {
  return (
    <header className="p-4 grid grid-cols-3 items-center mx-auto max-w-7xl">
      {/* Logo and Title */}
      <div className="flex items-center gap-x-4">
					<img className="h-14 w-14 bg-primary" src="" alt="logo" />
					<h1 className="font-medium text-xl text-foreground">Project Name</h1>
          <CategoriesCB/>
			</div>

      {/* Search Bar */}
      <div className="relative">
        <Input className="border border-black rounded-full pl-4 pr-12 py-2 w-full" placeholder="Search..." />     
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-lima-500 rounded-full p-1.5">
          <Search color="#ffffff" strokeWidth={2} size={20} />
        </div>
      </div>

      {/* Icons and User Profile */}
      <div className="flex gap-x-4 items-center justify-end">
        <Bell className="cursor-pointer" /> 
        <Settings className="cursor-pointer" /> 
        <Button className="flex items-center gap-x-2 bg-lima-500 text-white rounded  px-4 py-2">
          <span className="h-8 w-8 bg-gray-500 rounded-full"></span> 
          <div className="flex items-center gap-x-2">
            <span>Darvey Trinidad</span>
            <ChevronDown />
          </div>
        </Button>
      </div>
    </header>
  )
}

export default Header