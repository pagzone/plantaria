import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocialsAuth from "@/components/SocialsAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageRoutes } from "@/constants/PageRoutes";
import { Leaf, Users, Sprout, ArrowLeft } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { identityFormSchema } from "@/lib/formSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/submit-button";
import { toast } from "react-hot-toast";
import { APIRoutes } from "@/constants/ApiRoutes";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";

export default function IdentitySignUpPage() {
	const navigate = useNavigate();
	const { principal } = useParams();

	const onSubmit = async (values: z.infer<typeof identityFormSchema>) => {
		try {
			const response = await toast.promise(
				fetch(
					`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.REGISTER_WITH_IDENTITY}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ ...values, principal }),
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
					loading: "Signing in with your identity...",
					success: "Signed in successfully",
					error: (error) => error.message,
				},
			);

			const {
				data: { token },
			}: { data: { token?: string } } = response;

			if (token) {
				localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);
				navigate(PageRoutes.HOME);
			};
		} catch (error: any) {
			console.error("Error during sign up:", error.message);
		}
	};

	const form = useForm<z.infer<typeof identityFormSchema>>({
		resolver: zodResolver(identityFormSchema),
		defaultValues: {
			name: "",
			location: "",
		},
	});

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-lima-100">
			<div>
				<Card className="w-full max-w-md relative shadow-lg backdrop-blur-md bg-white/90 p-6">
					<div className="flex items-center gap-1 flex-row">
						<div>
							<Button
								variant="ghost"
								className="w-fit mb-2 flex items-center text-primary hover:text-primary/90 hover:bg-lima-100 transition-colors duration-200"
								size={"sm"}
								onClick={() => navigate(-1)}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
							</Button>
						</div>
						<div className="h-7">
							<img
								src="plantaria-logo.png"
								alt="Plantaria Logo"
								className="h-5"
							/>
						</div>
					</div>
					<CardContent className="space-y-6">
						{principal && (
							<>
								<h2 className="text-md text-primary">Complete your sign up</h2>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className="space-y-4"
									>
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem className="space-y-2">
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="location"
											render={({ field }) => (
												<FormItem className="space-y-2">
													<FormLabel>Location</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<SubmitButton className="w-full" formState={form.formState}>
											Sign Up
										</SubmitButton>
									</form>
								</Form>
							</>
						)}
						{!principal && <SocialsAuth />}
					</CardContent>
					<CardFooter className="w-full flex justify-center">
						<div className="py-4 border-t border-gray-200">
							<h3 className="text-lg font-medium text-primary mb-4">
								Why join urban farming hub?
							</h3>
							<ul className="space-y-3">
								{[
									{
										icon: Leaf,
										text: "Access comprehensive urban farming guides",
									},
									{
										icon: Users,
										text: "Connect with a community of urban farmers",
									},
									{
										icon: Sprout,
										text: "Track and share your urban farming progress",
									},
								].map((item, index) => (
									<li
										key={index}
										className="flex items-center text-sm text-gray-600"
									>
										<item.icon className="mr-3 h-5 w-5 text-lima-500" />
										{item.text}
									</li>
								))}
							</ul>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
