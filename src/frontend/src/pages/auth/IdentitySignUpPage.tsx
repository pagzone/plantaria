import SocialsAuth from "@/components/SocialsAuth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageRoutes } from "@/constants/PageRoutes";
import { Leaf, Users, Sprout, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function IdentitySignUpPage() {
	const navigate = useNavigate();
	const { principal } = useParams();
	const [principalValue, setPrincipalValue] = useState(principal);

	return (
		<div
			className="min-h-screen flex flex-col items-center object-cover object-center justify-center p-4 backdrop-blur-lg"
			style={{ backgroundImage: "url('person-looking-at-plants.jpg')" }}
		>
			<Card className="w-full max-w-md relative shadow-md">
				<div className="absolute top-4 left-4">
					<Button
						variant="ghost"
						className="w-fit mb-2 flex items-center text-primary hover:text-primary/90 hover:bg-lima-100"
						onClick={() => navigate(-1)}
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Go Back
					</Button>
				</div>
				{principal ? (
					<>
						<CardHeader className="text-center pt-16">
							<CardTitle className="flex justify-center text-2xl font-bold text-green-800">
								<img
									src="plantaria-logo.png"
									alt="Plantaria Logo"
									className="h-12"
								/>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<h2 className="text-xl font-semibold text-center text-primary">
									Continue signing up
								</h2>
							</div>
							<div>
								<div className="mt-14 w-full space-y-4 ">
									{/* TODO: Turn this into a form component */}
									<div className="space-y-3">
										<div className="space-y-2">
											<Label htmlFor="name">Name</Label>
											<Input id="name" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="location">Location</Label>
											<Input id="location" />
										</div>
										<Button type="submit" className="w-full">
											Sign Up
										</Button>
									</div>
								</div>
							</div>
						</CardContent>
					</>
				) : (
					<>
						<CardHeader className="text-center pt-16">
							<CardTitle className="flex justify-center text-2xl font-bold text-green-800">
								<img
									src="plantaria-logo.png"
									alt="Plantaria Logo"
									className="h-12"
								/>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div>
								<div className="space-y-3">
									<div className="space-y-2">
										<Label htmlFor="name">Principal ID</Label>
										<Input
											id="principal"
											name="principal"
											type="text"
											placeholder="Enter your Principal ID"
											value={principalValue}
											onChange={(e) => setPrincipalValue(e.target.value)}
											required
										/>
									</div>
									<Button
										type="submit"
										className="w-full"
										disabled={!principalValue}
										onClick={() =>
											navigate(
												`${PageRoutes.IDENTITY_SIGN_UP}/${principalValue}`,
											)
										}
									>
										Continue with Principal ID
									</Button>
								</div>
							</div>
						</CardContent>
					</>
				)}
				<CardFooter className="w-full flex justify-center">
					<div className="py-4 border-t border-gray-200">
						<h3 className="text-lg font-semibold text-lima-700 mb-2">
							Why Join Urban Farming Hub?
						</h3>
						<ul className="space-y-2">
							<li className="flex items-center text-sm text-gray-600">
								<Leaf className="mr-2 h-4 w-4 text-lima-500" />
								Access comprehensive urban farming guides
							</li>
							<li className="flex items-center text-sm text-gray-600">
								<Users className="mr-2 h-4 w-4 text-lima-500" />
								Connect with a community of urban farmers
							</li>
							<li className="flex items-center text-sm text-gray-600">
								<Sprout className="mr-2 h-4 w-4 text-lima-500" />
								Track and share your urban farming progress
							</li>
						</ul>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
