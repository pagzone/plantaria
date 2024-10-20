import { Favorite } from "Database/entities/favorite";
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

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = Favorite.create({
        user,
        targetType: 'tutorial',
        targetId: parseInt(id)
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

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = await Favorite.findBy({ user, targetType: 'tutorial', targetId: parseInt(id) });

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

  export async function favoriteStory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
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
        targetType: 'story',
        targetId: parseInt(id)
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

  export async function unfavoriteStory(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
        });
      }

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = await Favorite.findBy({ user, targetType: 'story', targetId: parseInt(id) });

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

  export async function getUserFavorites(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing user id",
        });
      }

      const user = await User.findOneBy({ id: parseInt(id) });

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
      
      const tutorials = favorites.filter(favorite => favorite.targetType === 'tutorial');
      const stories = favorites.filter(favorite => favorite.targetType === 'story');

      return response.status(200).json({
        status: 1,
        message: "Favorites fetched successfully",
        data: {
          tutorials,
          stories
        }
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }
}