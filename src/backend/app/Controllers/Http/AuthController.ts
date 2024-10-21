import UserLoginValidator from "App/Validators/UserLoginValidator";
import UserRegisterValidator from "App/Validators/UserRegisterValidator";
import { User } from "Database/entities/user";
import type { Response, Request } from "express";
import { hash, verifyHash } from "Helpers/hashing";
import { generateAuthToken } from "Helpers/customToken";
import UserRegisterWithIdentityValidator from "App/Validators/UserRegisterWithIdentityValidator";

export namespace AuthController {
	export async function register(request: Request, response: Response) {
		const { data, success, error } = UserRegisterValidator.validate(
			request.body,
		);

		if (!success) {
			response.status(400);
			const { path, message } = error.issues?.[0];

			return response.json({
				status: 0,
				message: `${path?.join(".")}: ${message}`,
				data: data,
			});
		}

		const { email, password, name, location, principal } = data;

		const passwordHash = password ? await hash(password) : undefined;

		const userData: Partial<User> = {
			email,
			password_hash: passwordHash,
			name,
			avatar_link: `./images/default_avatar.jpeg`,
			location,
			principal_id: principal,
		};

		try {
			const isUserExists = await User.findOne({
				where: [{ email }, { principal_id: principal }],
			});

			if (isUserExists) {
				response.status(400);
				return response.json({
					status: 0,
					message: "Email/Identity already exists.",
				});
			}

			const user = await User.save(userData).then(
				(user) => user as Partial<User>,
			);

			const authToken = generateAuthToken(user);

			return response.json({
				status: 1,
				message: "Registration success!",
				token: authToken,
			});
		} catch (error: any) {
			response.status(400);
			return response.json({
				status: 0,
				message: error.message,
			});
		}
	}

	const handleLoginSuccess = async (
		user: Partial<User>,
		response: Response,
	) => {
		const authToken = generateAuthToken(user);

		response.status(200);

		return response.json({
			status: 1,
			message: "Login success!",
			token: authToken,
		});
	};

	export async function login(request: Request, response: Response) {
		const { data, success, error } = UserLoginValidator.validate(request.body);

		if (!success) {
			response.status(400);
			const { path, message } = error.issues?.[0];

			return response.json({
				status: 0,
				message: `${path?.join(".")}: ${message}`,
				data: data,
			});
		}

		const { email, password, principal } = data;

		try {
			if (email && password) {
				const user = await User.findOne({ where: { email } });

				if (!user) {
					return response.status(400).json({
						status: 0,
						message: "Email not found.",
					});
				}

				const isPasswordMatch = await verifyHash(password, user.password_hash);

				if (!isPasswordMatch) {
					return response.status(400).json({
						status: 0,
						message: "Password does not match.",
					});
				}

				await handleLoginSuccess(user, response);
			} else if (principal) {
				const user = await User.findOne({ where: { principal_id: principal } });

				if (!user) {
					return response.status(400).json({
						status: 0,
						message: "Identity not found.",
					});
				}

				await handleLoginSuccess(user, response);
			} else {
				return response.status(400).json({
					status: 0,
					message: "No login method.",
				});
			}
		} catch (error: any) {
			console.log("error", error);
			response.status(500).json({
				status: 0,
				message: error.message,
			});
		}
	}

	export async function loginWithIdentity(
		request: Request,
		response: Response,
	) {
		const { principal } = request.body;

		if (!principal) {
			return response.status(400).json({
				status: 0,
				message: "No login method.",
			});
		}

		try {
			const user = await User.findOne({ where: { principal_id: principal } });

			if (!user) {
				return response.status(400).json({
					status: 2,
					message: "Identity not found. Please register first.",
				});
			}

			await handleLoginSuccess(user, response);
		} catch (error: any) {
			console.log("error", error);
			response.status(500).json({
				status: 0,
				message: error.message,
			});
		}
	}

	export const registerWithIdentity = async (
		request: Request,
		response: Response,
	) => {
		const { data, success, error } = UserRegisterWithIdentityValidator.validate(
			request.body,
		);

		if (!success) {
			response.status(400);
			const { path, message } = error.issues?.[0];

			return response.json({
				status: 0,
				message: `${path?.join(".")}: ${message}`,
				data: data,
			});
		}

		const { name, location, principal } = data;

		try {
			const user = await User.findOne({ where: { principal_id: principal } });

			if (user) {
				return response.status(400).json({
					status: 0,
					message: "Email already exists.",
				});
			}

			const userData: Partial<User> = {
				name,
				location,
				principal_id: principal,
			};

			const registeredUser = await User.save(userData).then(
				(user) => user as Partial<User>,
			);

			const authToken = generateAuthToken(registeredUser);

			return response.json({
				status: 1,
				message: "Registration success!",
				token: authToken,
			});
		} catch (error: any) {
			console.log("error", error);
			response.status(500).json({
				status: 0,
				message: error.message,
			});
		}
	};
}
