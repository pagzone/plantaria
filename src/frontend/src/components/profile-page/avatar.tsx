import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFetchAvatar } from "@/hooks/useFetchAvatar";
import { FC } from "react";
import { Skeleton } from "../ui/skeleton";

type ProfileProps = {
	userAvatar?: string;
	userName?: string;
	userId?: string;
	className?: string;
};

const Profile: FC<ProfileProps> = ({
	userAvatar,
	userId,
	userName,
	className,
}) => {
	const { data: avatarUrl, isLoading: isAvatarLoading } = useFetchAvatar(
		userId ?? "",
		userAvatar,
	);

	return (
		<Avatar className={className}>
			{isAvatarLoading || !avatarUrl ? (
				<AvatarImage src={avatarUrl} alt="User profile image" />
			) : userName ? (
				<AvatarFallback className="bg-lima-400">
					{userName[0].toUpperCase()}
				</AvatarFallback>
			) : (
				<Skeleton className="h-10 w-10 rounded-full" />
			)}
		</Avatar>
	);
};

export default Profile;
