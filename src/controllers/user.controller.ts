import { Request, Response } from "express";
import { UserService } from "@/services/user.service";
import { AuthRequest } from "@/middleware/auth";
import logger from "@/utils/logger";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      logger.error("Error in user registration:", error);
      res.status(400).json({ error: "Registration failed" });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.authenticate({ email, password });
      res.json(result);
    } catch (error) {
      logger.error("Error in user login:", error);
      res.status(401).json({ error: "Authentication failed" });
    }
  };

  getProfile = async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      logger.error("Error getting user profile:", error);
      res.status(400).json({ error: "Failed to get profile" });
    }
  };
}
