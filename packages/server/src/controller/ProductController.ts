import { Request, Response } from "express";
import BaseController from "./BaseController";
import { ProductService, AuthService } from "../service";
import { ProductEntity, ShopEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class ProductController extends BaseController {
  private service: ProductService;

  constructor(authService: AuthService, productService: ProductService) {
    super(authService);
    this.service = productService;
  }

  async createProduct(req: Request, res: Response): Promise<number> {
    try {
      await this.checkWorkerToken(req);
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      const id = await this.service.createProduct(product);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const product = plainToInstance(ProductEntity, req.body);
      await validateOrReject(product);
      await this.service.updateProduct(product);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteProduct(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getProduct(req: Request, res: Response): Promise<ProductEntity> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no product id";
      }
      const product = await this.service.getProduct(id);
      if (_.isEmpty(product)) {
        throw "Product not found";
      }
      res.status(200).json({ success: true, data: product });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getProductList(
    req: Request,
    res: Response
  ): Promise<Array<ProductEntity>> {
    try {
      const productList = await this.service.getProductList();
      if (_.isEmpty(productList)) {
        throw "No products available";
      }
      res.status(200).json({ success: true, data: productList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getProductShopList(
    req: Request,
    res: Response
  ): Promise<Array<ShopEntity>> {
    try {
      const productId = Number(req.query.productId);
      if (!productId) {
        throw "Invalid data: no product id";
      }
      const shopList = await this.service.getProductShopList(productId);
      res.status(200).json({ success: true, data: shopList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}
