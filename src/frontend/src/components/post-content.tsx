import { CirclePlus, Image, Plus, X } from "lucide-react";
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
import { useEffect, useRef, useState } from "react";
import Editor, { EditorRef } from "./editor";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIRoutes } from "@/constants/ApiRoutes";
import toast from "react-hot-toast";
import { getToken } from "@/lib/auth";
import { Label } from "./ui/label";
import { uploadImage } from "@/lib/upload";

const PostDialog = () => {
	const [dialogName, setDialogName] = useState("Create Tutorial");
	const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const editorRef = useRef<EditorRef | null>(null);

	const form = useForm<z.infer<typeof postFormSchema>>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			category: "",
			title: "",
			content: "",
			thumbnail: "",
		},
	});

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setThumbnail(file);
			setThumbnailURL(URL.createObjectURL(file));
		}
	};

	const handleGetEditorData = () => {
		if (!editorRef.current) return;
		return editorRef.current.getEditorData();
	};

	const handleGetEditorText = () => {
		if (!editorRef.current) return;
		return editorRef.current.getEditorText();
	};

	const handleResetEditor = () => {
		if (!editorRef.current) return;
		editorRef.current.resetEditor();
	};

	const formSubmit = async () => {
		const editorContent = handleGetEditorData();
		const editorText = handleGetEditorText();

		if (editorText?.trim() !== "" && editorContent) {
			form.setValue("content", editorContent);
		}

		if (thumbnail) {
			uploadImage(thumbnail);
			// form.setValue("thumbnail", thumbnailURL);
		}

		form.handleSubmit(onSubmit)();
	};

	const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
		try {
			const response = await toast.promise(
				fetch(
					`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.CREATE_TUTORIAL}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${getToken()}`,
						},
						body: JSON.stringify({
							...values,
						}),
					},
				).then(async (res) => {
					const data = await res.json();
					if (res.ok) {
						return { success: true, data };
					} else {
						throw new Error(data.message || "An error occurred");
					}
				}),
				{
					loading: "Posting tutorial...",
					success: "Posted tutorial successfully",
					error: (error) => error.message,
				},
			);

			const { data }: { data: { message: string } } = response;
			toast.success(data.message);
			form.reset();
			handleResetEditor();
			setThumbnailURL(null);
			if (thumbnailURL)
				URL.revokeObjectURL(thumbnailURL);
		} catch (error) {
			toast.error((error as Error).message);
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
						className="cursor-pointer text-white md:hidden"
					/>
				</div>
			</DialogTrigger>

			<Form {...form}>
				<DialogContent className="h-auto max-h-screen overflow-auto md:min-h-[26rem] md:w-[40rem] w-[90vw] max-w-[50rem] flex flex-col p-4 md:p-6 rounded-lg">
					<DialogHeader>
						<div className="flex justify-between h-fit w-full items-center">
							<DialogTitle className="text-xl md:text-2xl font-bold">
								{dialogName}
							</DialogTitle>
							<div className="flex gap-x-2">
								<Button
									variant={`${dialogName === "Create Tutorial" ? "default" : "ghost"}`}
									onClick={() => setDialogName("Create Tutorial")}
								>
									Tutorial
								</Button>
								<Button
									variant={`${dialogName === "Create Story" ? "default" : "ghost"}`}
									onClick={() => setDialogName("Create Story")}
								>
									Story
								</Button>
							</div>
						</div>
					</DialogHeader>

					<div className="flex flex-col space-y-4">
						<div className="flex flex-col gap-y-4">
							<div className="flex flex-col md:flex-row gap-2 md:gap-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<Label>Title</Label>
											<Input {...field} placeholder="Enter Title" required />
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="category"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<Label>Category</Label>
											<CategoriesCB
												onChange={(value) => form.setValue("category", value)}
											/>
											<Input
												{...field}
												type="hidden"
												className="hidden"
												required
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="md:h-full h-full overflow-auto">
								<Editor ref={editorRef} />
								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<input
												{...field}
												type="hidden"
												className="hidden"
												required
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>

					<DialogFooter className="flex max-md:h-32">
						<div className="flex max-md:flex-col justify-between w-full gap-2">
							<div className="flex gap-2 max-md:flex-col md:items-center w-full">
								<FormField
									control={form.control}
									name="thumbnail"
									render={({ field }) => (
										<FormItem>
											<Button
												type="button"
												variant="outline"
												className="flex gap-x-1 border-gray-400"
												onClick={() =>
													document.getElementById("thumbnail")?.click()
												}
											>
												<input
													id="thumbnail"
													type="file"
													accept="image/*"
													className="hidden"
													onChange={handleFileChange}
												/>
												<input {...field} type="hidden" className="hidden" />
												<Image size={20} />
												Thumbnail
											</Button>
											{thumbnailURL && (
												<div className="flex items-center gap-x-1">
													<a
														href={thumbnailURL}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-sky-500 underline max-w-8 truncate"
													>
														{thumbnailURL}
													</a>
													<X
														onClick={() => setThumbnailURL(null)}
														className="cursor-pointer text-red-500"
													/>
												</div>
											)}
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex gap-x-2 max-md:justify-end">
								<Button type="submit" onClick={formSubmit}>
									Post
								</Button>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
							</div>
						</div>
					</DialogFooter>
				</DialogContent>
			</Form>
		</Dialog>
	);
};

export default PostDialog;
