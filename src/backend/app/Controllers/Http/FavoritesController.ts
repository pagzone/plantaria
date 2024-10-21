import { Favorite } from "Database/entities/favorite";
import { Tutorial } from "Database/entities/tutorial";
import { User } from "Database/entities/user";
import type { Request, Response } from "express";

export namespace FavoritesController {
  export async function index(request: Request, response: Response) {
    try {
      const favorites = await Favorite.find({
        relations: {
          tutorial: true,
          user: true,
        },
        select: {
          id: true,
          tutorial: {
            id: true,
            title: true,
            content: true,
            thumbnail: true,
            created_at: true,
          },
          user: {
            id: true,
            name: true,
            avatar_link: true,
            location: true,
            created_at: true
          },
          created_at: true,
        }
      });

      return response.status(200).json({
        status: 1,
        data: favorites
      })
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      })
    }
  }

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

      const favorite = await Favorite.createQueryBuilder("favorite")
        .where("favorite.userId = :userId", { userId: user.id })
        .andWhere("favorite.tutorialId = :tutorialId", { tutorialId: tutorial.id })
        .getOne();

      if (favorite) {
        return response.status(409).json({
          status: 0,
          message: "Tutorial already favorited",
        });
      }

      const data = Favorite.create({
        user,
        tutorial
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

      const favorite = await Favorite.createQueryBuilder("favorite")
        .where("favorite.userId = :userId", { userId: user.id })
        .andWhere("favorite.tutorialId = :tutorialId", { tutorialId: tutorial.id })
        .getOne();

      if (!favorite) {
        return response.status(404).json({
          status: 0,
          message: "Favorite not found",
        });
      }

      await Favorite.createQueryBuilder()
        .delete()
        .from(Favorite)
        .where("id = :id", { id: favorite.id })
        .execute();

      return response.status(200).json({
        status: 1,
        message: "Tutorial unfavorited successfully",
      });
    } catch (error) {
      return response.status(500).json({
        status: 0,
        message: `Something went wrong: ${error}`,
      });
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

      const favorite = await Favorite.createQueryBuilder("favorite")
        .where("favorite.userId = :userId", { userId: user.id })
        .andWhere("favorite.tutorialId = :tutorialId", { tutorialId: tutorial.id })
        .getOne();

      if (!favorite) {
        return response.status(404).json({
          status: 0,
          message: "Favorite not found",
          data: false
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