
import { Story } from "Database/entities/story";
import { User } from "Database/entities/user";
import type { Response, Request } from "express";

export namespace StoriesController {
  export async function index(request: Request, response: Response) {
    const { p } = request.query;

    const page: number = p ? parseInt(p as string) : 1;

    try {
      const take = 9;
      const skip = (page - 1) * take;

      const stories = await Story.findAndCount({
        take,
        skip,
        relations: {
          user: true
        }
      });

      response.status(200);
      return response.json({
        status: 1,
        data: stories,
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
          message: "Missing story id",
        });
      }

      const story = await Story.findOneBy({ id: parseInt(id) });

      if (!story) {
        return response.status(404).json({
          status: 0,
          message: "Story not found",
        });
      }

      return response.status(200).json({
        status: 1,
        data: story,
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
      const { title, content, thumbnail } = request.body;
      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const data = Story.create({
        title,
        content,
        thumbnail,
        user
      })

      await Story.save(data);

      return response.status(200).json({
        status: 1,
        message: "Story created successfully",
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
      const { title, content, thumbnail } = request.body;

      if (!id) {
        return response.status(400).json({
          status: 0,
          message: "Missing story id",
        });
      }

      const story = await Story.findOneBy({ id: parseInt(id) });

      if (!story) {
        return response.status(404).json({
          status: 0,
          message: "Story not found",
        });
      }

      story.title = title;
      story.content = content;
      story.thumbnail = thumbnail;

      await Story.save(story);

      return response.status(200).json({
        status: 1,
        message: "Story updated successfully",
        data: story,
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
          message: "Missing story id",
        });
      }

      const user = await User.findOneBy({ id: request.user });

      if (!user) {
        return response.status(401).json({
          status: 0,
          message: "Unauthorized",
        });
      }

      const story = await Story.findOneBy({ id: parseInt(id) });

      if (!story) {
        return response.status(404).json({
          status: 0,
          message: "Story not found",
        });
      }

      if (story.user.id !== user.id) {
        return response.status(403).json({
          status: 0,
          message: "You are not allowed to delete this story",
        });
      }

      await Story.remove(story);

      return response.status(200).json({
        status: 1,
        message: "Story deleted successfully",
      });
    } catch (error: any) {
      return response.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  }
}