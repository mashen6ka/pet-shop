import { Request, Response } from "express";
import { ProductService } from "../service";
import { ProductEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class ProductController {
  private service: ProductService;

  constructor(service: ProductService) {
    this.service = service;
  }

  async createProduct(req: Request, res: Response): Promise<Number> {
    try {
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      const id = await this.service.createProduct(product);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: err });
      return;
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      await this.service.updateProduct(product);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: err });
      return;
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteProduct(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: err });
      return;
    }
  }

  async getProduct(req: Request, res: Response): Promise<ProductEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const product = await this.service.getProduct(id);
      if (_.isEmpty(product)) {
        throw "Product not found";
      }
      res.status(200).json({ success: true, data: product });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: err });
      return;
    }
  }
}
