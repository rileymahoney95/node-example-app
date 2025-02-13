"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("@/services/user.service");
const logger_1 = __importDefault(require("@/utils/logger"));
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const user = await this.userService.create(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                logger_1.default.error("Error in user registration:", error);
                res.status(400).json({ error: "Registration failed" });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const result = await this.userService.authenticate({ email, password });
                res.json(result);
            }
            catch (error) {
                logger_1.default.error("Error in user login:", error);
                res.status(401).json({ error: "Authentication failed" });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const user = req.user;
                res.json(user);
            }
            catch (error) {
                logger_1.default.error("Error getting user profile:", error);
                res.status(400).json({ error: "Failed to get profile" });
            }
        };
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map