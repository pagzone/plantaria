import { Tutorial } from "Database/entities/tutorial";
import { User } from "Database/entities/user";
import type { Response, Request } from "express";
import {  getDownloadUrlByName } from "Helpers/b2";

export namespace TutorialsController {
  export async function index(request: Request, response: Response) {
    const { p } = request.query;

    const page: number = p ? parseInt(p as string) : 1;

    try {
      const take = 6;
      const skip = (page - 1) * take;

      const tutorials = await Tutorial.findAndCount({
        take,
        skip,
        relations: {
          user: true
        },
        select: {
          id: true,
          category: true,
          title: true,
          content: true,
          thumbnail: true,
          created_at: true,
          user: {
            id: true,
            name: true,
            avatar_link: true,
            location: true,
            created_at: true
          }
        }
      });

      response.status(200);
      return response.json({
        status: 1,
        data: tutorials,
      });
    } catch (error: any) {
      response.status(500);
      return response.json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing tutorial id",
        });
      }

      const tutorial = await Tutorial.findOne({
        where: {
          id
        },
        relations: {
          user: true
        },
        select: {
          id: true,
          category: true,
          title: true,
          content: true,
          thumbnail: true,
          created_at: true,
          user: {
            id: true,
            name: true,
            avatar_link: true,
            location: true,
            created_at: true
          }
        }
      })

      if (!tutorial) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      return response.status(200).json({
        status: 1,
        data: tutorial,
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function create(request: Request, response: Response) {
    try {
      const { title, content, category, thumbnail } = request.body;

      // TODO: Add tutorial validation


      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const thumbnailUrl = await getDownloadUrlByName(thumbnail);

      const data = Tutorial.create({
        title,
        content,
        category,
        thumbnail: thumbnailUrl,
        user
      })

      await Tutorial.save(data);

      return response.status(200).json({
        status: 1,
        message: "Tutorial created successfully",
        data
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { title, content, category, thumbnail } = request.body;

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

      const data = await Tutorial.findOneBy({ id });

      if (!data) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      data.title = title;
      data.content = content;
      data.category = category;
      data.thumbnail = thumbnail;

      await Tutorial.save(data);

      return response.status(200).json({
        status: 1,
        message: "Tutorial updated successfully",
        data
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function destroy(request: Request, response: Response) {
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

      const data = await Tutorial.findOneBy({ id });

      if (!data) {
        return response.status(404).json({
          status: 0,
          message: "Tutorial not found",
        });
      }

      if (data.user.id !== user.id) {
        return response.status(401).json({
          status: 0,
          message: "You are not authorized to delete this tutorial",
        });
      }

      await Tutorial.remove(data);

      return response.status(200).json({
        status: 1,
        message: "Tutorial deleted successfully",
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }

  export async function test(request: Request, response: Response) {
    const tutorials = await Tutorial.find();

    response.status(200);
    return response.json({
      status: 1,
      message: "Test success!",
      data: tutorials,
    });
  }
}