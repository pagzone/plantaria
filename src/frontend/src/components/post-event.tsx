import { CirclePlus, Image, Plus, UserRoundPen, Video, X } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IconTooltip from "./icon-tooltip";
import CategoriesCB from "./catergories-cb";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import Editor, { EditorRef } from "./editor";

const PostDialog = () => {
	const [thumbnail, setThumbnail] = useState<string | null>("");
	const editorRef = useRef<EditorRef | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (file) {
			setThumbnail(URL.createObjectURL(file));
		}
	};

	const handleGetEditorData = () => {
		if (!editorRef.current) return;

		const editorContent = editorRef.current?.getEditorData();
		console.log("Editor Content:", editorContent);
	};

	return (
		<Dialog>
			<DialogTrigger >
				<div className="bg-lime-700 text-white font-medium flex items-center gap-x-1.5 px-4 py-2 rounded-lg ">
                    <UserRoundPen size={20} />
                    <span className="text-sm md:text-base">Edit</span>
				</div>
			</DialogTrigger>
			<DialogContent className="h-auto md:h-[26rem] md:w-[40rem] w-[90vw] max-w-[50rem] flex flex-col p-4 md:p-6 rounded-lg">
				<DialogHeader>
						<DialogTitle className="text-xl md:text-2xl font-bold">
							Create Event
						</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4 ">
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
						<div className="md:h-56 h-60 overflow-auto">
							<Editor ref={editorRef} />
						</div>
					</div>
				</div>
				<DialogFooter className="flex max-md:h-32 ">
					<div className="flex max-md:flex-col justify-between w-full gap-2 ">
						<div className="flex gap-2 max-md:flex-col md:items-center w-full">
							<Button
								variant="outline"
								className="flex gap-x-1 md:gap-x-2 border-gray-400"
								onClick={() => document.getElementById("url-upload")!.click()}
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
											className="text-sm text-sky-500 underline truncate"
											href={thumbnail}
											target="_blank"
											rel="noopener noreferrer"
										>
											{thumbnail}
										</a>
										<X
											onClick={() => setThumbnail(null)}
											className="cursor-pointer text-red-500 size-4 "
										/>
									</div>
								)}
							</div>
						</div>

						<div className="flex gap-x-2 max-md:justify-end">
							<Button onClick={handleGetEditorData}>Post</Button>
							<DialogClose asChild>
								<Button variant="outline" className="border-gray-400">
									Cancel
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PostDialog;
