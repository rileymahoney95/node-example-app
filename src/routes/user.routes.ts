import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { auth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { userCreateSchema, userLoginSchema } from "../schemas/user.schema";

const router = Router();
const userController = new UserController();

// Public routes
router.post(
  "/register",
  validate({ body: userCreateSchema }),
  userController.register
);
router.post(
  "/login",
  validate({ body: userLoginSchema }),
  userController.login
);

// Protected routes
router.get("/profile", auth, userController.getProfile);

export default router;
