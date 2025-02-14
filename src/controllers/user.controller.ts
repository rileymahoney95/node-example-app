import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { UserService } from "@/services/user.service";
import { TYPES } from "@/config/container/types";
import { asyncHandler } from "@/utils/async-handler";
import { ILogger } from "@/services/logger.service";

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.Logger) private logger: ILogger
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    this.logger.info(`Created user ${user.id}`);
    res.status(201).json(user);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.findById(req.params.id);
    res.json(user);
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.findAll();
    res.json(users);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.update(req.params.id, req.body);
    this.logger.info(`Updated user ${user.id}`);
    res.json(user);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.userService.delete(req.params.id);
    this.logger.info(`Deleted user ${req.params.id}`);
    res.status(204).send();
  });
}
