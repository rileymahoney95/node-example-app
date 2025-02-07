import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import logger from '../utils/logger';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  create = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      logger.error('Error creating product:', error);
      res.status(400).json({ error: 'Failed to create product' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.findAll();
      res.json(products);
    } catch (error) {
      logger.error('Error fetching products:', error);
      res.status(400).json({ error: 'Failed to fetch products' });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.findById(req.params.id);
      res.json(product);
    } catch (error) {
      logger.error('Error fetching product:', error);
      res.status(404).json({ error: 'Product not found' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.update(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      logger.error('Error updating product:', error);
      res.status(400).json({ error: 'Failed to update product' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.productService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting product:', error);
      res.status(400).json({ error: 'Failed to delete product' });
    }
  };
} 