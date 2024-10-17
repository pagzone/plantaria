import { z } from "zod";

export default class UserRegisterWithIdentityValidator {
  static schema = z.object({
    name: z.string({ required_error: "Name is required" }).max(60, { message: "Name too long" }),
    location: z.string({ required_error: "Location is required" }).min(1, { message: "Location is required" }).max(60, { message: "Location too long" }),
    principal: z.string({ required_error: "Principal is required" }).max(128, { message: "Principal too long" }),
  });

  static validate = this.schema.safeParse;
}