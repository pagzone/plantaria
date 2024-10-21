import { User } from "Database/entities/user";
import type { Request, Response } from "express";
import { getDownloadUrlByName } from "Helpers/b2";

export namespace UsersController {
  export async function currentUser(request: Request, response: Response) {
    try {
      const userId = request.user;

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      return response.json({
        status: 1,
        message: "Success",
        data: user,
      });
    } catch (error: any) {
      console.log("error", error);
      response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function updateAvatar(request: Request, response: Response) {
    try {
      const userId = request.user;
      const { fileName } = request.body;

      if (!userId) {
        return response.status(400).json({
          status: 0,
          message: "Missing user id",
        });
      }

      const user = await User.findOne({ where: { id: userId } });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "User not found",
        });
      };

      const avatarLink = await getDownloadUrlByName(fileName);

      user.avatar_link = avatarLink;
      await user.save();

      return response.status(200).json({
        status: 1,
        message: "Success",
        data: user,
      });
    } catch (error: any) {
      console.log("error", error);
      response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }
}