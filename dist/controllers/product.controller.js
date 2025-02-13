"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("@/services/product.service");
const logger_1 = __importDefault(require("@/utils/logger"));
class ProductController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const product = await this.productService.create(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                logger_1.default.error("Error creating product:", error);
                res.status(400).json({ error: "Failed to create product" });
            }
        };
        this.getAll = async (req, res) => {
            try {
                const products = await this.productService.findAll();
                res.json(products);
            }
            catch (error) {
                logger_1.default.error("Error fetching products:", error);
                res.status(400).json({ error: "Failed to fetch products" });
            }
        };
        this.getOne = async (req, res) => {
            try {
                const product = await this.productService.findById(req.params.id);
                res.json(product);
            }
            catch (error) {
                logger_1.default.error("Error fetching product:", error);
                res.status(404).json({ error: "Product not found" });
            }
        };
        this.update = async (req, res) => {
            try {
                const product = await this.productService.update(req.params.id, req.body);
                res.json(product);
            }
            catch (error) {
                logger_1.default.error("Error updating product:", error);
                res.status(400).json({ error: "Failed to update product" });
            }
        };
        this.delete = async (req, res) => {
            try {
                await this.productService.delete(req.params.id);
                res.status(204).send();
            }
            catch (error) {
                logger_1.default.error("Error deleting product:", error);
                res.status(400).json({ error: "Failed to delete product" });
            }
        };
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map