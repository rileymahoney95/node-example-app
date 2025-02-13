"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Public routes
router.post("/register", (0, validate_1.validate)({ body: user_schema_1.userCreateSchema }), userController.register);
router.post("/login", (0, validate_1.validate)({ body: user_schema_1.userLoginSchema }), userController.login);
// Protected routes
router.get("/profile", auth_1.auth, userController.getProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map