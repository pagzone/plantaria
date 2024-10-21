import { Favorite } from "Database/entities/favorite";
import { Tutorial } from "Database/entities/tutorial";
import { User } from "Database/entities/user";
import type { Request, Response } from "express";

export namespace FavoritesController {
  export async function favoriteTutorial(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
        });
      }

      const tutorial = await Tutorial.findOneBy({ id });

      if (!tutorial) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = Favorite.create({
        user,
      })

      await Favorite.save(data);

      return response.status(200).json({
        status: 1,
        message: "Tutorial favorited successfully",
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }

  export async function unfavoriteTutorial(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
        });
      }

      const tutorial = await Tutorial.findOneBy({ id });

      if (!tutorial) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = await Favorite.findBy({ user, tutorial });

      if (!data) {
        return response.status(404).json({
          status: 0,
          message: "Favorite not found",
        });
      }

      await Favorite.remove(data);

      return response.status(200).json({
        status: 1,
        message: "Tutorial unfavorited successfully",
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }

  export async function isFavorite(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
        });
      }

      const tutorial = await Tutorial.findOneBy({ id });

      if (!tutorial) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = await Favorite.findBy({ user, tutorial });

      if (!data) {
        return response.status(404).json({
          status: 0,
          message: "Favorite not found",
        });
      }

      return response.status(200).json({
        status: 1,
        message: "Favorite found",
        data: true,
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }

  export async function getUserFavorites(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing user id",
        });
      }

      const user = await User.findOneBy({ id });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const favorites = await Favorite.find({
        where: {
          user
        }
      })

      return response.status(200).json({
        status: 1,
        message: "Favorites fetched successfully",
        data: favorites
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }
}