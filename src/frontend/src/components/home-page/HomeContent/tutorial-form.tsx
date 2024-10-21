import { Image, X } from "lucide-react";
import CategoriesCB from "../../header/categories-cb";
import Editor from "../../header/editor";
import { Button } from "../../ui/button";
import { DialogClose, DialogFooter } from "../../ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { tutorialFormSchema } from "@/lib/formSchema";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/lib/upload";
import toast from "react-hot-toast";
import { getToken } from "@/lib/auth";
import { APIRoutes } from "@/constants/ApiRoutes";
import SubmitButton from "../../submit-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TutorialForm = () => {
	const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
	const [thumbnail, setThumbnail] = useState<File | null>(null);

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof tutorialFormSchema>>({
		resolver: zodResolver(tutorialFormSchema),
		defaultValues: {
			category: "",
			title: "",
			content: "",
			thumbnail: "",
		},
	});

	const mutation = useMutation(
		async (values: z.infer<typeof tutorialFormSchema>) => {
			const response = await fetch(
				`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.TUTORIALS}`,
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
				toast.loading("Posting tutorial...", { id: "post-tutorial" });
			},
			onSuccess: (data) => {
				toast.dismiss("post-tutorial");
				toast.success(data.message);
				form.reset();
				setThumbnailURL(null);
				if (thumbnailURL) URL.revokeObjectURL(thumbnailURL);
			},
			onError: (error) => {
				toast.error((error as Error).message);
			},
			onSettled: () => {
				queryClient.refetchQueries(["tutorials"]);
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

	const formSubmit = async () => {
		if (thumbnail && thumbnailURL) {
			try {
				const uploadData = await toast.promise(
					uploadImage(thumbnail, "tutorial"),
					{
						loading: "Uploading thumbnail...",
						success: "Thumbnail uploaded successfully",
						error: "Failed to upload thumbnail",
					},
				);

				if (!uploadData) return;

				form.setValue("thumbnail", uploadData.data!.fileName);
			} catch (error) {
				toast.error("Error uploading thumbnail");
				// return;
			}
		};

		form.handleSubmit(async (values) => {
			mutation.mutate(values);
		})();
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
									<Input {...field} type="hidden" className="hidden" required />
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex-1 flex flex-col overflow-auto">
 						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<Editor {...field} /> 
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

export default TutorialForm;
