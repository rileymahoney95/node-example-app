import { Request, Response, NextFunction } from "express";
import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { ILogger } from "@/services/logger.service";
import { IUserService } from "@/interfaces/services";
import jwt from "jsonwebtoken";
import { UserEntity } from "@/models/user.entity";
import { AppDataSource } from "@/config/db/datasource";

export interface AuthRequest extends Request {
  user?: any;
  token?: string;
}

export const authMiddleware = () => {
  const logger = container.get<ILogger>(TYPES.Logger);
  const userService = container.get<IUserService>(TYPES.UserService);

  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("No token provided");
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      ) as { id: string };

      const user = await userService.findById(decoded.id);
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      logger.error("Authentication error:", error);
      res.status(401).json({ error: "Not authorized" });
    }
  };
};

export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await authMiddleware()(req, res, () => {
      if (req.user?.isAdmin) {
        next();
      } else {
        throw new Error();
      }
    });
  } catch (error) {
    res.status(403).json({ error: "Admin access required" });
  }
};
