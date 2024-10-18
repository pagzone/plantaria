import { CirclePlus, Image, Plus, Video, X } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconTooltip from "./icon-tooltip";
import Editor from "./editor";
import CategoriesCB from "./catergories-cb";
import { Button } from "./ui/button";
import { useState } from "react";

const PostDialog = () => {
	const [thumbnail, setThumbnail] = useState<string | null>("link.example");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setThumbnail(URL.createObjectURL(file)); 
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="flex items-center rounded-full max-md:fixed bottom-4 max-md:bg-lima-500 max-md:p-3 cursor-pointer z-10">
					<IconTooltip
						IconComponent={CirclePlus}
						tooltipText="Post Tutorial"
						size={30}
						className="cursor-pointer text-lima-500 max-md:hidden"
					/>

					<IconTooltip
						IconComponent={Plus}
						tooltipText="Post Tutorial"
						size={25}
						className="cursor-pointer text-white md:hidden "
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="h-auto md:h-[28rem] md:w-[40rem] w-[90vw] max-w-[50rem] flex flex-col gap-y-8 p-4 md:p-6 rounded-lg">
				<DialogHeader className="flex items-center h-fit">
					<DialogTitle className="text-xl md:text-2xl font-bold">
						Create Tutorial
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col gap-y-4">
						<div className="flex flex-col md:flex-row gap-2 md:gap-4">
							<Input
								id="title"
								placeholder="Enter Title"
								className="w-full border border-gray-400 rounded-lg"
								required
							/>
							<CategoriesCB className="border border-gray-400 text-slate-600" />
						</div>
						<Editor />
					</div>
				</div>
				<DialogFooter className="mt-6 flex max-md:h-40">
					<div className="flex max-md:flex-col justify-between w-full gap-2 ">
						<div className="flex gap-2 max-md:flex-col md:items-center w-full">
							<Button
								variant="outline"
								className="flex gap-x-1 md:gap-x-2 border-gray-400"
								onClick={() => document.getElementById('url-upload')!.click()}
							>
								<input
									id="url-upload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleFileChange}
								/>
								<Image className="text-lima-500" size={20} />
								<span className="text-xs md:text-sm">Thumbnail</span>
							</Button>

							<div className="h-8 flex items-center ">
								{thumbnail && (
									<div className="flex gap-x-1 items-center h-6 w-28">
										<a
											className="text-xs text-sky-500 underline truncate"
											href={thumbnail}
											target="_blank"
											rel="noopener noreferrer"
										>
											{thumbnail}
										</a>
										<X size={60} onClick={() => setThumbnail(null)} className="cursor-pointer text-red-500" />
									</div>
								)}
							</div>
						</div>

						<div className="flex gap-x-2 max-md:justify-end">
							<Button>Post</Button>
							<Button variant="outline" className="border-gray-400">
								<DialogClose asChild>
									<span>Cancel</span>
								</DialogClose>
							</Button>
						</div>
					</div>
				</DialogFooter>

			</DialogContent>
		</Dialog>
	);
};

export default PostDialog;