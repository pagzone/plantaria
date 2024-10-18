import { User } from "Database/entities/user";
import type { NextFunction, Request, Response } from "express";
import { decodeAuthToken } from "Helpers/customToken";

export namespace AuthMiddleware {
  export const authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: 0, message: "Access denied. No token provided." });
      }

      const token = authHeader.split(" ")[1];

      const decodedToken = decodeAuthToken(token);

      if (!decodedToken) {
        return res.status(401).json({ status: 0, message: "Access denied. Invalid token provided." });
      }

      let user: User | null = null;
      if (decodedToken.email) {
        user = await User.findOneBy({ email: decodedToken.email });
      } else if (decodedToken.principal_id) {
        user = await User.findOneBy({ principal_id: decodedToken.principal_id });
      }
      
      if (!user) {
        console.log("User not found");
        return res.status(401).json({ status: 0, message: "Access denied. User not found." });
      }

      req.user = user.id;

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 0, message: "Internal server error." });
    }
  };
}
