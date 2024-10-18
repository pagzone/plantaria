import { Tutorial } from "Database/entities/tutorial";
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
        skip
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