import { Request, Response } from "express";
import { ShopService, AuthService } from "../service";
import { ShopEntity } from "../entity";
import BaseController from "./BaseController";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

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
      res.status(502).json({ success: false, error: new Error(err).message });
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
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async deleteShop(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteShop(id);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getShop(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no shop id";
      }
      const shop = await this.service.getShop(id);
      if (_.isEmpty(shop)) {
        throw "Shop not found";
      }
      res.status(200).json({ success: true, data: shop });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getShopList(req: Request, res: Response): Promise<void> {
    try {
      const shopList = await this.service.getShopList();
      if (_.isEmpty(shopList)) {
        throw "No shops available";
      }
      res.status(200).json({ success: true, data: shopList });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }
}
