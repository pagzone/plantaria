import { Image, X } from "lucide-react";
import CategoriesCB from "./catergories-cb";
import Editor, { EditorRef } from "./editor";
import { Button } from "./ui/button";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storyFormSchema } from "@/lib/formSchema";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/lib/upload";
import toast from "react-hot-toast";
import { getToken } from "@/lib/auth";
import { APIRoutes } from "@/constants/ApiRoutes";

const StoryForm = () => {
	const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const editorRef = useRef<EditorRef | null>(null);

	const form = useForm<z.infer<typeof storyFormSchema>>({
		resolver: zodResolver(storyFormSchema),
		defaultValues: {
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

		if (thumbnail && thumbnailURL) {
			const data = uploadImage(thumbnail);
			toast
				.promise(data, {
					loading: "Uploading thumbnail...",
					success: "Uploaded thumbnail successfully",
					error: (error) => error.message,
				})
				.then((data) => {
					if (!data) return;

					console.log(data);

					form.setValue("thumbnail", data.data!.fileId);
				});
		}

		form.handleSubmit(onSubmit)();
	};

	const onSubmit = async (values: z.infer<typeof storyFormSchema>) => {
		try {
			const response = await toast.promise(
				fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.CREATE_STORY}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						...values,
					}),
				}).then(async (res) => {
					const data = await res.json();
					if (res.ok) {
						return { success: true, data };
					} else {
						throw new Error(data.message || "An error occurred");
					}
				}),
				{
					loading: "Posting story...",
					success: "Posted story successfully",
					error: (error) => error.message,
				},
			);

			const { data }: { data: { message: string } } = response;
			toast.success(data.message);
			form.reset();
			handleResetEditor();
			setThumbnailURL(null);
			if (thumbnailURL) URL.revokeObjectURL(thumbnailURL);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	return (
		<Form {...form}>
			<div className="flex-1 flex flex-col space-y-4">
				<div className="flex-1 flex flex-col gap-y-4">
					<div className="flex flex-col md:flex-row gap-2 md:gap-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<Label>Title</Label>
									<Input
										{...field}
										placeholder="Enter Title"
										className="w-full"
										required
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex-1 flex flex-col overflow-auto">
						<Editor ref={editorRef} />
					</div>
					<FormField
						control={form.control}
						name="content"
						render={({ field }) => (
							<FormItem>
								<input {...field} type="hidden" className="hidden" required />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>

			<DialogFooter>
				<div className="flex max-md:flex-col justify-between w-full gap-2">
					<div className="flex gap-2 max-md:flex-col md:items-center w-full">
						<FormField
							control={form.control}
							name="thumbnail"
							render={({ field }) => (
								<FormItem className="flex flex-row items-center gap-2">
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
		</Form>
	);
};

export default StoryForm;
