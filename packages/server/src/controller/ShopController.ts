import { Request, Response } from "express";
import { ShopService, AuthService } from "../service";
import { ShopEntity } from "../entity";
import BaseController from "./BaseController";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class ShopController extends BaseController {
  private service: ShopService;

  constructor(authService: AuthService, shopService: ShopService) {
    super(authService);
    this.service = shopService;
  }

  async createShop(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const shop = plainToInstance(ShopEntity, req.body);
      await validateOrReject(shop);
      const id = await this.service.createShop(shop);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateShop(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const shop = plainToInstance(ShopEntity, req.body);
      await validateOrReject(shop);
      await this.service.updateShop(shop);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteShop(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Shop id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteShop(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getShop(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw new ErrorEntity(
          "Shop id must be a positive integer",
          statusCode.badRequest
        );
      }
      const shop = await this.service.getShop(id);
      if (shop === null) {
        throw new ErrorEntity("Shop not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: shop });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getShopList(req: Request, res: Response): Promise<void> {
    try {
      const shopList = await this.service.getShopList();
      if (_.isEmpty(shopList)) {
        throw new ErrorEntity("No shops available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: shopList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}
