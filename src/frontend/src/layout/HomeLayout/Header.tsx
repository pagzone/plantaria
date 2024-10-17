import { CategoriesCB } from "@/components/catergories-cb"
import PostDialog from "@/components/post-tutorial"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserSetting from "@/components/user-setting"
import { PageRoutes } from "@/constants/PageRoutes"
import { Bell, Building2, LifeBuoy, LogOut, Menu, Search, Settings, User, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Header = () => {
  const [auth, setAuth] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <header className="py-4 w-full grid grid-cols-3 items-center max-md:grid-cols-2">
      <Link className="flex items-center gap-x-2 w-fit cursor-pointer"
        to={PageRoutes.Home}
      >
        <img className="size-14" src="Logo.png" alt="logo" />
        <img className="h-6" src="plantaria-logo.png" alt="plantaria-logo" />
      </Link>

      <div className="relative flex gap-x-3 flex-1 max-md:hidden">
        <div>
          <CategoriesCB />
        </div>

        <Input className="border border-black rounded-full pl-4 pr-12 py-2 w-full max-md:hidden" placeholder="Search..." />
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-lima-500 rounded-full p-1.5">
          <Search color="#ffffff" strokeWidth={2} size={20} />
        </div>
      </div>

      <div>
        {auth ? (
          <div className="flex gap-x-4 items-center justify-end max-md:gap-x-2">
            <div className="bg-lima-500 rounded-full p-1.5 md:hidden max-md:block flex items-center cursor-pointer">
              <Search
                color="#ffffff"
                strokeWidth={2}
                size={25}
              />
            </div>

            <PostDialog />
            <Building2 className="cursor-pointer text-lima-500" size={28} />
            <Bell className="cursor-pointer text-lima-500" size={28} />
            <UserSetting />

            <div className="md:hidden flex justify-end items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={40} /> : <Menu size={40} />}
              </button>
            </div>

            {isMenuOpen && (
              <nav className="fixed inset-0 bg-white flex flex-col justify-center items-center gap-y-4 z-50 transition-transform duration-300 md:hidden"
              >
                <div className="flex flex-col gap-y-4 justify-start">
                  <Link to={PageRoutes.Profile}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex gap-x-2 items-center cursor-pointer hover:underline">
                    <User className="size-6" />
                    <span className="text-xl">Profile</span>
                  </Link>

                  <Link to={PageRoutes.Home}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex gap-x-2 items-center cursor-pointer hover:underline">
                    <Settings className="size-6" />
                    <span className="text-xl">Settings</span>
                  </Link>

                  <Link to={PageRoutes.Home}
                        onClick={() => setIsMenuOpen(false)}
                       className="flex gap-x-2 items-center cursor-pointer hover:underline">
                    <LifeBuoy className="size-6" />
                    <span className="text-xl">Support</span>
                  </Link>

                  <Link to={PageRoutes.Home}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex gap-x-2 items-center cursor-pointer hover:underline">
                    <LogOut className="size-6" />
                    <span className="text-xl">Log out</span>
                  </Link>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute right-6 top-6"
                >
                  <X size={40} />
                </button>
              </nav>
            )}

          </div>
        ) : (
          <div className="flex gap-x-4 items-center justify-end max-md:gap-x-2 ">
            <div className="bg-lima-500 rounded-full p-1.5 md:hidden max-md:block flex items-center cursor-pointer">
              <Search
                color="#ffffff"
                strokeWidth={2}
                size={25}
              />
            </div>

            <div className="max-md:hidden flex justify-end items-center gap-x-4 " >
              <Link to={PageRoutes.Login}
                    onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to={PageRoutes.SignUp}
                    onClick={() => setIsMenuOpen(false)}
              >
                <Button>Sign Up</Button>
              </Link>
            </div>

            <div className="md:hidden flex justify-end items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={40} /> : <Menu size={40} />}
              </button>
            </div>

            {isMenuOpen && (
              <nav className="fixed inset-0 bg-white flex flex-col justify-center items-center gap-y-4 z-50 transition-transform duration-300 md:hidden"
              >
                <div className="flex flex-col items-center space-y-4 mt-4">
                  <Link to={PageRoutes.Login}
                   onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to={PageRoutes.SignUp}
                        onClick={() => setIsMenuOpen(false)}
                  >
                    <Button>Sign Up</Button>
                  </Link>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute right-6 top-6"
                >
                  <X size={40} />
                </button>
              </nav>
            )}
          </div>
        )}

      </div>
    </header>
  )
}

export default Header