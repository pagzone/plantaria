	import CategoriesCB from "@/components/header/categories-cb";
	import IconTooltip from "@/components/tooltip/icon-tooltip";
	import Notification from "@/components/header/notification";
	import PostDialog from "@/components/header/post-content";
	import SearchBar from "@/components/header/search";
	import { Button } from "@/components/ui/button";
	import UserSetting from "@/components/profile-page/user-setting";
	import { PageRoutes } from "@/constants/PageRoutes";
	import { getCurrentUser, isAuthenticated, removeToken } from "@/lib/auth";
	import {
		Bell,
		Building2,
		GalleryHorizontalEnd,
		LifeBuoy,
		LogOut,
		Menu,
		Search,
		Settings,
		User,
		X,
	} from "lucide-react";
	import { useState } from "react";
	import { Link, useNavigate } from "react-router-dom";

	const Header = () => {
		const navigate = useNavigate();
		const authenticated = isAuthenticated();
		const [isMenuOpen, setIsMenuOpen] = useState(true);
		const [inputFormOpen, setInputFormOpen] = useState(false);

		const logout = () => {
			console.log("removing token");
			removeToken();

			console.log("removed token");
			navigate(PageRoutes.LANDING);
			console.log("land");
		};

		return (
			<header className="py-4 w-full grid grid-cols-3 items-center max-md:grid-cols-2">
				<Link
					className="flex items-center gap-x-2 w-fit cursor-pointer"
					to={PageRoutes.HOME}
				>
					<img className="size-14" src="Logo.png" alt="logo" />
					<img className="h-6" src="plantaria-logo.png" alt="plantaria-logo" />
				</Link>

				<div className="relative flex gap-x-3 flex-1 max-md:hidden">
					<div>
						<CategoriesCB className="border border-black"/>
					</div>

				<div className="relative"> 
					<SearchBar/>
					<div className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-lima-500 rounded-full p-1.5">
						<Search color="#ffffff" strokeWidth={2} size={20} />
					</div>
				</div>

				</div>

				<div>
					{authenticated ? (
						<div className="flex md:gap-x-4 items-center justify-end gap-x-2">

							<div className="rounded-full h-8" 
									onClick={() => setInputFormOpen(!inputFormOpen)}>
									<IconTooltip
										IconComponent={Search}
										tooltipText="Search"
										className="md:hidden"
									/>
							</div>

						 <Link className="h-8 rounded-full"
						 		to={"/stories"}>
							<IconTooltip
								IconComponent={GalleryHorizontalEnd}
								tooltipText="Stories"
								className="md:hidden"
							/>
						 </Link>

							<PostDialog />
							<Link to={PageRoutes.ORGANIZATION} className="flex item-center">
								<IconTooltip
									IconComponent={Building2}
									tooltipText="Organization"
									className="max-md:hidden"
								/>
							</Link>
							<Notification/>
							<UserSetting />
							<div className="md:hidden flex items-center">
								<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
									<Menu size={35} />
								</button>
							</div>

							{isMenuOpen && (
								<nav className="fixed inset-0 bg-white flex flex-col justify-center items-center gap-y-4 z-50 transition-transform duration-300 md:hidden">
									<div className="flex flex-col gap-y-4 justify-start">
										<Link
											to={PageRoutes.PROFILE}
											onClick={() => setIsMenuOpen(false)}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<User className="size-6" />
											<span className="text-xl">Profile</span>
										</Link>

										<Link
											to={PageRoutes.HOME}
											onClick={() => setIsMenuOpen(false)}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<Bell className="size-6" />
											<span className="text-xl">Notification</span>
										</Link>

										<Link
											to={PageRoutes.ORGANIZATION}
											onClick={() => setIsMenuOpen(false)}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<Building2 className="size-6" />
											<span className="text-xl">Organization</span>
										</Link>

										<Link
											to={PageRoutes.HOME}
											onClick={() => setIsMenuOpen(false)}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<Settings className="size-6" />
											<span className="text-xl">Settings</span>
										</Link>

										<Link
											to={PageRoutes.HOME}
											onClick={() => setIsMenuOpen(false)}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<LifeBuoy className="size-6" />
											<span className="text-xl">Support</span>
										</Link>

										<button
											onClick={() => {
												setIsMenuOpen(false);
												logout();
											}}
											className="flex gap-x-2 items-center cursor-pointer hover:underline"
										>
											<LogOut className="size-6" />
											<span className="text-xl">Log out</span>
										</button>
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
							<div className="bg-lima-500 rounded-full p-1.5 md:hidden max-md:block flex items-center cursor-pointer"
								onClick={() => setInputFormOpen(!inputFormOpen)}
							>
								<Search color="#ffffff" strokeWidth={2} size={25} />
							</div>

							<div className="max-md:hidden flex justify-end items-center gap-x-4 ">
								<Link to={PageRoutes.LOGIN} onClick={() => setIsMenuOpen(false)}>
									<Button variant="ghost">Login</Button>
								</Link>
								<Link
									to={PageRoutes.SIGN_UP}
									onClick={() => setIsMenuOpen(false)}
								>
									<Button>Sign Up</Button>
								</Link>
							</div>

							<div className="md:hidden flex justify-end items-center">
								<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
									{isMenuOpen ? <X size={40} /> : <Menu size={40} />}
								</button>
							</div>

							{isMenuOpen && (
								<nav className="fixed inset-0 bg-white flex flex-col justify-center items-center gap-y-4 z-50 transition-transform duration-300 md:hidden">
									<div className="flex flex-col items-center space-y-4 mt-4">
										<Link
											to={PageRoutes.LOGIN}
											onClick={() => setIsMenuOpen(false)}
										>
											<Button variant="ghost">Login</Button>
										</Link>
										<Link
											to={PageRoutes.SIGN_UP}
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
					{inputFormOpen && (
						<div className="md:hidden w-full p-4 col-span-3">
							<SearchBar/>
						</div>
					)}
			</header>
		);
	};

	export default Header;
