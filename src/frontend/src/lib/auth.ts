import { LocalStorageKeys } from "@/constants/LocalStorageKeys";

export const isAuthenticated = (): boolean => {
	const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

	if (!token) {
		return false;
	}

	try {
		return true;
	} catch (error) {
		localStorage.removeItem("token");
		return true;
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
