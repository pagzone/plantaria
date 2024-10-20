import { Tutorial } from "Database/entities/tutorial";
import { User } from "Database/entities/user";
import type { Response, Request } from "express";

export namespace TutorialsController {
  export async function index(request: Request, response: Response) {
    const { p } = request.query;

    const page: number = p ? parseInt(p as string) : 1;

    try {
      const take = 9;
      const skip = (page - 1) * take;

      const tutorials = await Tutorial.findAndCount({
        take,
        skip,
        relations: {
          user: true
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

      const data = Tutorial.create({
        title,
        content,
        category,
        thumbnail,
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

  // export async function update(request: Request, response: Response) {
  //   try {
  //     const { title, content, category, thumbnail, resources } = request.body;
  //     const { id } = request.params;
  //     const user = await User.findOneBy({ id: request.user });

  //     if (!user) {
  //       return response.status(401).json({
  //         status: 0,
  //         message: "Unauthorized",
  //       });
  //     }

  //     const tutorial = await Tutorial.findOneBy({ id });
  //   }
  // }

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