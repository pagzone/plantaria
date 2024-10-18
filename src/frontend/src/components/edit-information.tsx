import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { UserRoundPen } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const EditDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="bg-lime-700 text-white font-medium flex items-center gap-x-1.5 px-4 py-2 rounded-lg hover:bg-lime-600 transition-transform transform hover:scale-[1.05] w-24">
					<UserRoundPen size={20} />
					<span className="text-sm md:text-base">Edit</span>
				</div>
			</DialogTrigger>
			<DialogContent className="w-full max-w-[90%] sm:max-w-md p-4 sm:p-6 rounded-lg">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="flex flex-col">
						<Label htmlFor="username" className="text-left mb-2">
							Username
						</Label>
						<Input
							id="username"
							placeholder="Enter username"
							className="w-full"
						/>
					</div>

					<div className="flex flex-col">
						<Label htmlFor="email-address" className="text-left mb-2">
							Email Address
						</Label>
						<Input
							id="email-address"
							placeholder="Enter email address"
							className="w-full"
						/>
					</div>

					<div className="flex flex-col">
						<Label htmlFor="country" className="text-left mb-2">
							Country
						</Label>
						<Input
							id="country"
							placeholder="Enter country"
							className="w-full"
						/>
					</div>

					<div className="flex flex-col">
						<Label htmlFor="city" className="text-left mb-2">
							City
						</Label>
						<Input id="city" placeholder="Enter city" className="w-full" />
					</div>
				</div>
				<DialogFooter className="pt-4">
					<div className="flex  flex-col md:flex-row  md:justify-between gap-2 ">
						<Button>
							Save changes
						</Button>
						<Button variant="outline" className="w-full">
							<DialogClose asChild>
								<span>Cancel</span>
							</DialogClose>
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditDialog;
