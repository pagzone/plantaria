import { APIRoutes } from "@/constants/ApiRoutes";
import { LocalStorageKeys } from "@/constants/LocalStorageKeys";
import { IResponse } from "@/interface/IResponse";
import { IUser } from "@/interface/IUser";

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

	if (!token) {
		return false;
	}

	try {
		return true;
	} catch (error) {
		localStorage.removeItem("token");
		return false;
	}
};

export const decodeAuthToken = (token: string) => {
	const decodedToken = atob(token);

	const tokenPayload = JSON.parse(decodedToken);

	return tokenPayload;
};

export const getToken = () => {
	const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

	if (!token) {
		return null;
	}

	return token;
};

export const removeToken = () => {
	localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
};


export const getCurrentUser = async () => {
	const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}${APIRoutes.CURRENT_USER}`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

	const data: IResponse<IUser> = await response.json();
	if (response.ok) {
		return data;
	} else {
		console.error('Get current user failed:', data);
	}

	return null;
}