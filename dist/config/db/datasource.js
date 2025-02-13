"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PG_HOST || "localhost",
    port: parseInt(process.env.PG_PORT || "5432"),
    username: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    database: process.env.PG_DB,
    synchronize: false, // set to process.env.NODE_ENV === 'development' if you want to synchronize the database
    logging: false, // set to true if you want to see the queries in the console
    entities: [(0, path_1.join)(__dirname, "../../models/**/*.ts")],
    migrations: [(0, path_1.join)(__dirname, "../../config/db/migrations/**/*.ts")],
    subscribers: [(0, path_1.join)(__dirname, "../../config/db/subscribers/**/*.ts")],
});
//# sourceMappingURL=datasource.js.map