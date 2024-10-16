import UserLoginValidator from "App/Validators/UserLoginValidator";
import UserRegisterValidator from "App/Validators/UserRegisterValidator";
import { User } from "Database/entities/user";
import type { Response, Request } from "express";
import { hash, verifyHash } from "Helpers/hashing";
import { generateAuthToken } from "Helpers/customToken";

export namespace UsersController {
  export async function register(request: Request, response: Response) {
    const { data, success, error } = UserRegisterValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];

      return response.json({
        status: 0,
        message: `${path?.join('.')}: ${message}`,
        data: data
      });
    }

    const { email, password, name, location, principal } = data;

    const passwordHash = password ? await hash(password) : undefined;

    const userData: Partial<User> = {
      email,
      password_hash: passwordHash,
      name,
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
          message: 'Email/Identity already exists.',
        });
      }

      await User.save(userData);

      return response.json({
        status: 1,
        message: 'Registration success!',
      });
    } catch (error: any) {
      response.status(400);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  const handleLoginSuccess = async (user: Partial<User>, response: Response) => {
    const authToken = generateAuthToken(user);

    response.status(200);

    return response.json({
      status: 1,
      message: 'Login success!',
      token: authToken,
    });
  }

  export async function login(request: Request, response: Response) {
    const { data, success, error } = UserLoginValidator.validate(request.body);

    if (!success) {
      response.status(400);
      const { path, message } = error.issues?.[0];

      return response.json({
        status: 0,
        message: `${path?.join('.')}: ${message}`,
        data: data
      });
    }

    const { email, password, principal } = data;

    try {
      if (email && password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return response.status(400).json({
            status: 0,
            message: 'Email not found.',
          });
        }

        const isPasswordMatch = await verifyHash(password, user.password_hash);

        if (!isPasswordMatch) {
          return response.status(400).json({
            status: 0,
            message: 'Password does not match.',
          });
        }

        await handleLoginSuccess(user, response);
      }
      // Handle login by principal (Internet Identity)
      else if (principal) {
        const user = await User.findOne({ where: { principal_id: principal } });

        if (!user) {
          return response.status(400).json({
            status: 0,
            message: 'Identity not found.',
          });
        }

        await handleLoginSuccess(user, response);
      }
      // If neither email/password nor principal was provided
      else {
        return response.status(400).json({
          status: 0,
          message: 'No login method.',
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


  export async function test(request: Request, response: Response) {
    const users = await User.find();

    return response.json({
      status: 1,
      message: "Test success!",
      data: users,
    });
  }
}