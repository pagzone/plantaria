import { APIRoutes } from "@/constants/ApiRoutes";
import { QueryKeys } from "@/constants/QueryKeys";
import { getToken } from "@/lib/auth";
import { storyFormSchema } from "@/lib/formSchema";
import { uploadImage } from "@/lib/upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import SubmitButton from "../submit-button";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Editor, { EditorRef } from "./editor";

const StoryForm = () => {
	const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
	const [thumbnail, setThumbnail] = useState<File | null>(null);
	const editorRef = useRef<EditorRef | null>(null);

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof storyFormSchema>>({
		resolver: zodResolver(storyFormSchema),
		defaultValues: {
			title: "",
			content: "",
			thumbnail: "",
		},
	});

	const mutation = useMutation(
		async (values: z.infer<typeof storyFormSchema>) => {
			const response = await fetch(
				`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.STORIES}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify(values),
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "An error occurred");
			}
			return response.json();
		},
		{
			onMutate: () => {
				toast.loading("Posting story...", { id: "post-story" });
			},
			onSuccess: (data) => {
				toast.dismiss("post-story");
				toast.success(data.message);
				form.reset();
				handleResetEditor();
				setThumbnailURL(null);
				if (thumbnailURL) URL.revokeObjectURL(thumbnailURL);
			},
			onError: (error) => {
				toast.error((error as Error).message);
			},
			onSettled: () => {
				queryClient.refetchQueries([QueryKeys.STORIES]);
			},
		},
	);

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
			try {
				const uploadData = await toast.promise(
					uploadImage(thumbnail, "story"),
					{
						loading: "Uploading thumbnail...",
						success: "Uploaded thumbnail successfully",
						error: "Failed to upload thumbnail",
					},
				);

				if (!uploadData) return;

				form.setValue("thumbnail", uploadData.data!.fileName);
			} catch (error) {
				toast.error("Error uploading thumbnail");
				return;
			}
		};

		form.handleSubmit(async (values) => {
			mutation.mutate(values);
		})
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
						<SubmitButton
							formState={form.formState}
							type="submit"
							onClick={formSubmit}
						>
							Post
						</SubmitButton>
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
