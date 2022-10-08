import { Request, Response } from "express";
import BaseController from "./BaseController";
import { OrderStatusService, AuthService } from "../service";
import { OrderStatusEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class OrderStatusController extends BaseController {
  private service: OrderStatusService;

  constructor(
    authService: AuthService,
    orderStatusService: OrderStatusService
  ) {
    super(authService);
    this.service = orderStatusService;
  }

  async createOrderStatus(req: Request, res: Response): Promise<Number> {
    try {
      await this.checkWorkerToken(req);
      const orderStatus = plainToInstance(OrderStatusEntity, req.body);
      await validateOrReject(orderStatus);
      const id = await this.service.createOrderStatus(orderStatus);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const orderStatus = plainToInstance(OrderStatusEntity, req.body);
      await validateOrReject(orderStatus);
      await this.service.updateOrderStatus(orderStatus);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteOrderStatus(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getOrderStatus(
    req: Request,
    res: Response
  ): Promise<OrderStatusEntity> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no order status id";
      }
      const orderStatus = await this.service.getOrderStatus(id);
      if (_.isEmpty(orderStatus)) {
        throw "OrderStatus not found";
      }
      res.status(200).json({ success: true, data: orderStatus });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getOrderStatusList(
    req: Request,
    res: Response
  ): Promise<Array<OrderStatusEntity>> {
    try {
      const orderStatusList = await this.service.getOrderStatusList();
      if (_.isEmpty(orderStatusList)) {
        throw "No orderStatuss available";
      }
      res.status(200).json({ success: true, data: orderStatusList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}
