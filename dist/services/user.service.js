"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("@/models/User");
const datasource_1 = require("@/config/db/datasource");
const AppError_1 = require("@/utils/AppError");
class UserService {
    constructor() {
        this.userRepository = datasource_1.AppDataSource.getRepository(User_1.User);
    }
    async create(userData) {
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            throw new AppError_1.AppError(400, "Email already in use");
        }
        const user = new User_1.User(userData);
        user.password = await (0, bcryptjs_1.hash)(user.password, 10);
        return this.userRepository.save(user);
    }
    async authenticate({ email, password, }) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new AppError_1.AppError(401, "Invalid credentials");
        }
        const isValid = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValid) {
            throw new AppError_1.AppError(401, "Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "your-secret-key", {
            expiresIn: "24h",
        });
        return { user, token };
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map