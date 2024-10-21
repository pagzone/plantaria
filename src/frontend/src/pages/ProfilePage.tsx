import Profile from "@/components/profile-page/avatar";
import TutorialCard from "@/components/home-page/HomeContent/tutorial-card";
import Footer from "@/layout/Footer";
import Header from "@/layout/HomeLayout/Header";
import { Pencil, Save } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditDialog from "@/components/profile-page/edit-information";
import { decodeAuthToken, getCurrentUser, getToken } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/QueryKeys";
import { getUserAvatar } from "@/lib/avatar";
import { updateUserAvatar } from "@/lib/api";
import toast from "react-hot-toast";

const ProfilePage: FC = () => {
	const [userAvatar, setUserAvatar] = useState<File>();
	const [userAvatarUrl, setUserAvatarUrl] = useState<string>(
		"/images/default_avatar.jpeg",
	);
	// const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [timeline, setTimeLine] = useState([]);

	const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setUserAvatar(file);
			setUserAvatarUrl(URL.createObjectURL(file));
			setIsEditingProfile(true);
		}
	};

	const {
		data: currentUser,
		isLoading,
		isSuccess,
		refetch,
	} = useQuery([QueryKeys.CURRENT_USER, getToken()], getCurrentUser);

	const saveAvatar = async () => {
		if (!userAvatar) return;

		const uploadData = await toast
			.promise(updateUserAvatar(userAvatar), {
				loading: "Uploading avatar...",
				success: "Avatar uploaded successfully",
				error: "Failed to upload avatar",
			})
			.then((res) => {
				setIsEditingProfile(false);
				return res;
			})
			.finally(() => {
				refetch();
			});
		console.log("uploadData", uploadData);
	};

	useEffect(() => {
		if (isSuccess && currentUser) {
			setUserAvatarUrl(currentUser.data!.avatar_link);
		}
	}, [isSuccess, currentUser]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="md:mx-[75px] flex flex-col gap-y-4 max-md:px-4">
			<Header />
			<div className="flex flex-col gap-y-4">
				<h1 className="text-3xl font-bold text-primary">My Profile</h1>

				<div className="relative border border-gray-200 shadow-lg md:h-64 h-44 rounded-xl bg-white flex items-center gap-x-6 px-6 py-4">
					<div className="relative">
						<Profile
							userAvatar={userAvatarUrl}
							userName={currentUser?.data?.name}
							className="size-40 max-md:size-32"
						/>
						<button
							className="absolute right-2 bottom-2 bg-slate-300 rounded-full p-2 hover:bg-slate-400 transition-colors duration-150 cursor-pointer"
							onClick={() => document.getElementById("profile-upload")?.click()}
						>
							<Pencil size={15} aria-hidden="true" />
							<input
								id="profile-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleChangeProfile}
							/>
						</button>
					</div>
					<div className="flex flex-col justify-center">
						<span className="text-xl md:text-2xl font-bold">
							{currentUser?.data?.name}
						</span>
						<span className="text-slate-600 max-md:text-sm">
							{currentUser?.data?.location}
						</span>
					</div>
					{isEditingProfile && (
						<button
							onClick={() => saveAvatar()}
							className={`absolute right-3 top-3 font-medium md:px-4 md:py-2 py-1 px-2 flex items-center gap-x-1.5 rounded-lg transition-transform transform md:w-24 
      bg-lime-700 text-white hover:bg-lime-600 hover:scale-[1.05] cursor-pointer`}
						>
							<Save size={20} />
							<span className="text-base max-md:hidden">Save</span>
						</button>
					)}
				</div>

				<div className="relative border border-gray-200 shadow-lg md:h-64 h-56 rounded-xl p-6 bg-white">
					<h1 className="text-xl md:text-2xl font-bold text-primary mb-6">
						User Information
					</h1>

					<div className="grid grid-cols-2 gap-x-8 items-center">
						<div className="flex flex-col gap-y-5">
							<div className="flex flex-col">
								<span className="text-gray-500 text-sm">Full Name</span>
								<span className="text-sm md:text-lg font-medium text-gray-800 max-md:truncate">
									{currentUser?.data?.name}
								</span>
							</div>
						</div>

						<div className="flex flex-col gap-y-5">
							<div className="flex flex-col">
								<span className="text-gray-500 text-sm">Location</span>
								<span className="text-sm md:text-lg font-medium text-gray-800 truncate">
									{currentUser?.data?.location}
								</span>
							</div>
						</div>
						<div className="absolute right-3 md:top-3 top-6">
							<EditDialog />
						</div>
					</div>
				</div>

				<div className="border border-gray-200 shadow-lg h-[30rem] rounded-xl p-6 bg-white">
					<h1 className="text-2xl font-bold text-primary mb-4">Timeline</h1>
					<ScrollArea className="h-96">
						<div className="grid grid-col-1 md:grid-cols-4 gap-4 ">
							{/* {timeline.length > 0 && timeline.map((value) => (
								<TutorialCard
									key={value.id}
									tutorialImage={value.tutorialImage}
									userAvatar={value.profileImage}
									userName={value.profileName}
									title={value.title}
									content={value.description}
								/>
							))} */}
						</div>
					</ScrollArea>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ProfilePage;
