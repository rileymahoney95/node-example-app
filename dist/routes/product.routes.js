"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const product_schema_1 = require("../schemas/product.schema");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const productController = new product_controller_1.ProductController();
// Public routes
router.get("/", productController.getAll);
router.get("/:id", (0, validate_1.validate)({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
}), productController.getOne);
// Protected routes (admin only)
router.post("/", auth_1.auth, (0, validate_1.validate)({ body: product_schema_1.productCreateSchema }), productController.create);
router.put("/:id", auth_1.adminAuth, (0, validate_1.validate)({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
    body: product_schema_1.productUpdateSchema,
}), productController.update);
router.delete("/:id", auth_1.adminAuth, (0, validate_1.validate)({
    params: zod_1.z.object({
        id: zod_1.z.string().uuid(),
    }),
}), productController.delete);
exports.default = router;
//# sourceMappingURL=product.routes.js.map