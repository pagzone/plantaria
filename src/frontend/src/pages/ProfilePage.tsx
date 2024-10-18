import Profile from "@/components/avatar";
import TutorialCard from "@/components/tutorial-card";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import { Pencil, Save } from "lucide-react";
import { FC, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditDialog from "@/components/edit-information";

const ProfilePage: FC = () => {
	const [userProfile, setUserProfile] = useState(
		"https://github.com/shadcn.png",
	);
	const [preview, setPreview] = useState<string | null>(null);
	const [savedProfile, setSaveProfile] = useState(true);

	const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
				setUserProfile(reader.result as string);
			};
			reader.readAsDataURL(file);
			setSaveProfile(false);
		}
	};

	return (
		<div className="md:mx-[75px] flex flex-col gap-y-4 max-md:px-4">
			<Header />
			<div className="flex flex-col gap-y-4">
				<h1 className="text-3xl font-bold text-lime-700">My Profile</h1>

				<div className="relative border border-gray-200 shadow-lg md:h-64 h-44 rounded-xl bg-white flex items-center gap-x-6 px-6 py-4">
					<div className="relative">
						<Profile
							userProfile={preview || userProfile}
							style="size-40 max-md:size-32"
						/>
						<span className="absolute right-2 bottom-2 bg-slate-300 rounded-full p-2 hover:bg-slate-400 transition-colors duration-150 cursor-pointer">
							<label
								htmlFor="profile-upload"
								aria-label="Change Profile Picture"
							>
								<Pencil size={15} aria-hidden="true" />
							</label>
							<input
								id="profile-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleChangeProfile}
							/>
						</span>
					</div>
					<div className="flex flex-col justify-center">
						<span className="text-xl md:text-2xl font-bold">
							Gian Carlo Villar
						</span>
						<span className="text-slate-600 max-md:text-sm">
							San Jose Del Monte, Bulacan
						</span>
					</div>
					<button
						onClick={() => setSaveProfile(true)}
						className={`absolute right-3 top-3 font-medium md:px-4 md:py-2 py-1 px-2 flex items-center gap-x-1.5 rounded-lg transition-transform transform md:w-24 
            ${!savedProfile ? "bg-lime-700 text-white hover:bg-lime-600 hover:scale-[1.05] cursor-pointer" : "border border-lime-700 text-lime-700 cursor-not-allowed"}`}
						disabled={savedProfile}
					>
						<Save size={20} />
						<span className="text-base max-md:hidden">Save</span>
					</button>
				</div>

				<div className="relative border border-gray-200 shadow-lg md:h-64 h-56 rounded-xl p-6 bg-white">
					<h1 className="text-xl md:text-2xl font-bold text-lime-700 mb-6">
						User Information
					</h1>

					<div className="grid grid-cols-2 gap-x-8 items-center">
						<div className="flex flex-col gap-y-5">
							<div className="flex flex-col">
								<span className="text-gray-500 text-sm">Full Name</span>
								<span className="text-sm md:text-lg font-medium text-gray-800 max-md:truncate">
									John Doe
								</span>
							</div>
							<div className="flex flex-col">
								<span className="text-gray-500 text-sm">Email Address</span>
								<span className="text-sm md:text-lg font-medium text-gray-800 max-md:truncate">
									Darvey234244@gmail.com
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-y-5">
							<div className="flex flex-col">
								<span className="text-gray-500 text-sm">Location</span>
								<span className="text-sm md:text-lg font-medium text-gray-800 truncate">
									Third World Country
								</span>
							</div>
						</div>
						<div className="absolute right-3 md:top-3 top-6">
							<EditDialog />
						</div>
					</div>
				</div>

				<div className="border border-gray-200 shadow-lg h-[30rem] rounded-xl p-6 bg-white">
					<h1 className="text-2xl font-bold text-lime-700 mb-4">Timeline</h1>
					<ScrollArea className="h-96">
						<div className="grid grid-col-1 md:grid-cols-4 gap-4 px-2.5">
							{[
								{
									id: 1,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 2,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 3,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 4,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 5,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 6,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 7,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
								{
									id: 8,
									tutorialImage:
										"https://oneacrefund.org/sites/default/files/styles/banner_large_desktop/public/2024-04/TZN_0819.jpg?h=2e5cdddf&itok=ExHuaX_n",
									profileImage:
										"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybsd7cw9VxpeBObuBE90Al3a1OB0kgPhyHg&s",
									profileName: "John Doe",
									title: "Intro to Urban Farming",
									description:
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laboriosam ut eos labore sit in sint.",
								},
							].map((value) => (
								<TutorialCard
									key={value.id}
									tutorialImage={value.tutorialImage}
									profileImage={value.profileImage}
									profileName={value.profileName}
									title={value.title}
									description={value.description}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProfilePage;
