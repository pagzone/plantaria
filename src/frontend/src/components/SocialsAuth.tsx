import { AuthClient } from "@dfinity/auth-client";
import { Button } from "./ui/button";
import { InternetComputer } from "@/assets/icons";
import { APIRoutes } from "@/constants/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "@/constants/PageRoutes";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";

const SocialsAuth = () => {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const signInWithIdentity = async () => {
		setLoading(true);

		const authClient = await AuthClient.create();

		await authClient.login({
			identityProvider: "https://identity.ic0.app/#authorize",
			onSuccess: async () => {
				const identity = authClient.getIdentity();

				const principal = identity.getPrincipal();

				console.log(principal.toString());

				const response: { status: number; message: string; token: string } =
					await fetch(
						`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.LOGIN_II}`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								principal: principal.toString(),
							}),
						},
					).then((res) => res.json());

				if (response.status === 1) {
					console.log(response.status);
					const { token } = response;
					console.log(token);
					localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);
					navigate(PageRoutes.HOME);
				}

				if (response.status === 2) {
					navigate(
						`${PageRoutes.IDENTITY_SIGN_UP}/${encodeURIComponent(principal.toString())}`,
					);
				}
			},
			onError: () => {
				setLoading(false);
			},
		});
	};

	return (
		<div className="space-y-4">
			<Button
				variant={"outline"}
				className="relative w-full border-indigo-500 shadow-md shadow-indigo-200"
				onClick={signInWithIdentity}
				disabled={loading}
			>
				<InternetComputer className="size-6 p-1 bg-white rounded-full mr-2" />
				Continue with Internet Identity
				{loading && (
					<div className="absolute inset-0 flex items-center justify-center size-full bg-white/50">
						<LoaderCircle className="animate-spin text-primary" />
					</div>
				)}
			</Button>
		</div>
	);
};

export default SocialsAuth;
