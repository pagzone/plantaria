import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserAvatar } from "@/lib/avatar";
import { FC } from "react";

type ProfileProps = {
	userAvatar?: string;
	userName?: string;
	style?: string;
};

const Profile: FC<ProfileProps> = ({
	userAvatar,
	userName = "John Doe",
	style: className,
}) => {
	return (
		<Avatar className={className}>
			{userAvatar ? (
				<AvatarImage src={getUserAvatar(userAvatar)} alt="User profile image" />
			) : (
				<AvatarFallback>{userName[0].toUpperCase()}</AvatarFallback>
			)}
		</Avatar>
	);
};

export default Profile;
