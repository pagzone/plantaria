import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/PageRoutes";
import { isAuthenticated } from "@/lib/auth";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const authenticated = isAuthenticated();

	const links = [
		{ id: 1, url: "#goals", name: "Goals" },
		{ id: 2, url: "#about", name: "About" },
	];

	console.log(authenticated)

	return (
		<header className="p-4 grid grid-cols-3 max-md:grid-cols-2 md:mx-[75px] px-6 items-center">
			<div className="flex items-center gap-x-2">
				<img className="h-14 w-14 object-contain" src="Logo.png" alt="logo" />
				<img className="h-6" src="plantaria-logo.png" alt="plantaria-logo" />
			</div>

			<nav className="hidden md:flex justify-center items-center gap-x-12">
				{links.map((value) => (
					<a
						className="text-lg hover:underline font-medium"
						key={value.id}
						href={value.url}
					>
						{value.name}
					</a>
				))}
			</nav>

			{authenticated ? (
				<Link to={PageRoutes.HOME}
					className="flex justify-end">
					<Button className="flex items-center gap-x-1">
						<Home size={18}/>
						<span >Home</span>
					</Button>
				</Link>
			) : (

				<div>
					<div className="hidden md:flex justify-end items-center gap-x-4">
						<Link to={PageRoutes.LOGIN}>
							<Button variant="ghost">Login</Button>
						</Link>
						<Link to={PageRoutes.SIGN_UP}>
							<Button>Sign Up</Button>
						</Link>
					</div>

					<div className="md:hidden flex justify-end items-center">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
							{isMenuOpen ? <X size={30} /> : <Menu size={30} />}
						</button>
					</div>

					{isMenuOpen && (
						<nav className="fixed inset-0 bg-white flex flex-col justify-center items-center gap-y-4 z-50 transition-transform duration-300 md:hidden">
							{links.map((value) => (
								<a
									className="text-lg hover:underline font-medium"
									key={value.id}
									href={value.url}
									onClick={() => setIsMenuOpen(false)}
								>
									{value.name}
								</a>
							))}

							<button
								onClick={() => setIsMenuOpen(false)}
								className="absolute right-6 top-6"
							>
								<X size={30} />
							</button>

							<div className="flex flex-col items-center space-y-4 mt-4">
								<Link to={PageRoutes.LOGIN}>
									<Button variant="ghost">Login</Button>
								</Link>
								<Link to={PageRoutes.SIGN_UP}>
									<Button>Sign Up</Button>
								</Link>
							</div>
						</nav>
					)}
				</div>
			)}
		</header>
	);
};

export default Header;
