import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/password-input";
import { Link } from "react-router-dom";
import SocialsAuth from "@/components/SocialsAuth";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { PageRoutes } from "@/constants/PageRoutes";
import { signUpFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUpPage = () => {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			location: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
	});

	function onSubmit(values: z.infer<typeof signUpFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}



	return (
		<div className="h-screen grid grid-cols-1 md:grid-cols-2 relative">
			{/* Sign Up Section */}
			<section className="w-full flex flex-col items-center md:block p-6 md:p-12 overflow-y-scroll">
				<Button
					variant="ghost"
					className="w-fit mb-2 flex items-center text-primary hover:text-primary/90 hover:bg-lima-100"
					asChild
				>
					<Link to={PageRoutes.LANDING}>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Home
					</Link>
				</Button>

				<div className="w-full text-center md:text-left xl:w-2/3 flex flex-col max-md:items-center">
					<img className="h-8 w-40" src="plantaria-logo.png" alt="plantaria-logo" />
					<h1 className="mt-4 leading-normal lg:leading-relaxed text-3xl md:text-4xl lg:text-5xl text-primary">
						Start growing your
						<span className="block md:inline"> urban garden today</span>
					</h1>
					<p className="mt-1 text-gray-500 text-sm md:text-base">
						Sign up to{" "}
						<span className="text-lima-700 font-medium">plantaria</span> and
						join our amazing community
					</p>
				</div>

				<div className="mt-14 w-full space-y-4 ">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
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

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<PasswordInput {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full">
								Sign Up
							</Button>
						</form>
					</Form>

					<div className="text-center">
						<span>Already have an account?</span>{" "}
						<Link
							to={PageRoutes.LOGIN}
							className="text-primary hover:underline"
						>
							Sign In
						</Link>
					</div>
					<div className="m-0 relative w-full flex justify-center">
						<p className="w-fit text-sm text-center bg-white px-2 text-gray-500 z-10">
							OR
						</p>
						<hr className="absolute top-1/2 w-full h-0.5 bg-gray-300" />
					</div>

					<SocialsAuth />
				</div>
			</section>

			{/* Background Image Section */}
			<section className="hidden md:block size-full relative overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-no-repeat"
					style={{
						backgroundPositionX: "60%",
						backgroundImage: "url('person-giving-vegetables.jpg')",
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
				<p
					className={cn(
						"absolute bottom-6 left-6 w-3/4 text-white font-bold",
						"lg:bottom-12 lg:left-12 lg:w-4/5 xl:w-3/5 md:text-4xl lg:text-5xl",
					)}
				>
					Start growing your urban garden today.
				</p>
			</section>
		</div>
	);
};

export default SignUpPage;
