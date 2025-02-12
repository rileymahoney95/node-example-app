import { Repository } from "typeorm";
import { Product } from "../models/Product";
import { AppDataSource } from "../config/db/datasource";
import { ProductCreate, ProductUpdate } from "../schemas/product.schema";
import { AppError } from "../utils/AppError";

export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async create(productData: ProductCreate): Promise<Product> {
    const product = new Product(productData);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  async update(id: string, productData: ProductUpdate): Promise<Product> {
    const product = await this.findById(id);
    if (!product) {
      throw new AppError(404, "Product not found");
    }
    Object.assign(product, productData);
    return this.productRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    const product = await this.findById(id);
    await this.productRepository.remove(product);
  }
}
