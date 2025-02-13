"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const Product_1 = require("@/models/Product");
const datasource_1 = require("@/config/db/datasource");
const AppError_1 = require("@/utils/AppError");
class ProductService {
    constructor() {
        this.productRepository = datasource_1.AppDataSource.getRepository(Product_1.Product);
    }
    async create(productData) {
        const product = new Product_1.Product(productData);
        return this.productRepository.save(product);
    }
    async findAll() {
        return this.productRepository.find();
    }
    async findById(id) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }
    async update(id, productData) {
        const product = await this.findById(id);
        if (!product) {
            throw new AppError_1.AppError(404, "Product not found");
        }
        Object.assign(product, productData);
        return this.productRepository.save(product);
    }
    async delete(id) {
        const product = await this.findById(id);
        await this.productRepository.remove(product);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map