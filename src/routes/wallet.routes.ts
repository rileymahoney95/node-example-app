import { Router } from "express";
import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { WalletController } from "@/controllers/wallet.controller";
import { authMiddleware } from "@/middleware/auth";
import { validate } from "@/middleware/validate";
import {
  walletCreateSchema,
  walletUpdateSchema,
} from "@/schemas/wallet.schema";

const router = Router();
const walletController = container.get<WalletController>(
  TYPES.WalletController
);

router.post(
  "/",
  validate({ body: walletCreateSchema }),
  walletController.create
);
router.get("/", walletController.findAll);
router.get("/:id", walletController.findById);
router.patch(
  "/:id",
  validate({ body: walletUpdateSchema }),
  walletController.update
);
router.delete("/:id", authMiddleware(), walletController.delete);

export default router;
