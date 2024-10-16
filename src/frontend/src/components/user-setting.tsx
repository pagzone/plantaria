import { ChevronDown, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import Profile from "./avatar";
import { PageRoutes } from "@/constants/PageRoutes";

const UserSetting = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="rounded-full shadow flex items-center  w-16 border border-gray-400">
					<Profile userProfile="https://github.com/shadcn.png"/>
					<ChevronDown className="text-lima-500"/>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link to={PageRoutes.Profile} className="w-full">
							<User className="mr-2 size-4 inline" />
							Profile
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 size-4 inline" />
						<span>Settings</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LifeBuoy className="mr-2 size-4 inline" />
					<span>Support</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut className="mr-2 size-4 inline" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserSetting;
