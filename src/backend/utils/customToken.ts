import { User } from "Database/entities/user";

export const generateAuthToken = (user: Partial<User>) => {
	const { id, email, principal_id } = user;

	const tokenPayload = {
		userId: id,
		email: email ?? null,
		principal_id: principal_id ?? null,
	};

	const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64");
	return token;
};

export const decodeAuthToken = (token: string): { userId: number; email: string | null; principal_id: string | null } | null => {
	try {
		const decodedToken = Buffer.from(token, "base64").toString("utf-8");

		const tokenPayload = JSON.parse(decodedToken);

		return tokenPayload;
	} catch (error) {
		return null;
	}
};
