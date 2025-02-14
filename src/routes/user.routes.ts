import { Router } from "express";
import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { UserController } from "@/controllers/user.controller";
import { validate } from "../middleware/validate";
import { userCreateSchema } from "../schemas/user.schema";

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

// Public routes
router.post(
  "/register",
  validate({ body: userCreateSchema }),
  userController.register
);

router.get("/:id", userController.findById);
router.patch("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
