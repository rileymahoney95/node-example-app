import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { auth, adminAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../schemas/product.schema";
import { z } from "zod";

const router = Router();
const productController = new ProductController();

// Public routes
router.get("/", productController.getAll);
router.get(
  "/:id",
  validate({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  productController.getOne
);

// Protected routes (admin only)
router.post(
  "/",
  auth,
  validate({ body: productCreateSchema }),
  productController.create
);
router.put(
  "/:id",
  adminAuth,
  validate({
    params: z.object({
      id: z.string().uuid(),
    }),
    body: productUpdateSchema,
  }),
  productController.update
);
router.delete(
  "/:id",
  adminAuth,
  validate({
    params: z.object({
      id: z.string().uuid(),
    }),
  }),
  productController.delete
);

export default router;
