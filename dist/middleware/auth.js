"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("@/models/User");
const datasource_1 = require("@/config/db/datasource");
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "your-secret-key");
        const user = await datasource_1.AppDataSource.getRepository(User_1.User).findOneBy({
            id: decoded.id,
        });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Please authenticate" });
    }
};
exports.auth = auth;
const adminAuth = async (req, res, next) => {
    try {
        await (0, exports.auth)(req, res, () => {
            if (req.user?.isAdmin) {
                next();
            }
            else {
                throw new Error();
            }
        });
    }
    catch (error) {
        res.status(403).json({ error: "Admin access required" });
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=auth.js.map