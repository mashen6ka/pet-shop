import { Request, Response } from "express";
import { OrderStatusService } from "../service";
import { OrderStatusEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class OrderStatusController {
  private service: OrderStatusService;

  constructor(service: OrderStatusService) {
    this.service = service;
  }

  async createOrderStatus(req: Request, res: Response): Promise<Number> {
    try {
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
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
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
        throw "No orderStatuss avaliable";
      }
      res.status(200).json({ success: true, data: orderStatusList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}
