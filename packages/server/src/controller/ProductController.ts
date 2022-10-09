import { Request, Response } from "express";
import BaseController from "./BaseController";
import { ProductService, AuthService } from "../service";
import { ProductEntity, ShopEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../../test/common";

export default class ProductController extends BaseController {
  private service: ProductService;

  constructor(authService: AuthService, productService: ProductService) {
    super(authService);
    this.service = productService;
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      const id = await this.service.createProduct(product);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      await this.service.updateProduct(product);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteProduct(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }
      const product = await this.service.getProduct(id);
      if (product == null) {
        throw new ErrorEntity("Product not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getProductList(req: Request, res: Response): Promise<void> {
    try {
      const productList = await this.service.getProductList();
      if (_.isEmpty(productList)) {
        throw new ErrorEntity("No products available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: productList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getProductShopList(req: Request, res: Response): Promise<void> {
    try {
      const productId = Number(req.query.productId);
      if (!productId) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }
      const shopList = await this.service.getProductShopList(productId);
      res.status(200).json({ success: true, data: shopList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}
