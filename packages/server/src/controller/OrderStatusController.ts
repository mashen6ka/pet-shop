import { Request, Response } from "express";
import BaseController from "./BaseController";
import { OrderStatusService, AuthService } from "../service";
import { OrderStatusEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class OrderStatusController extends BaseController {
  private service: OrderStatusService;

  constructor(
    authService: AuthService,
    orderStatusService: OrderStatusService
  ) {
    super(authService);
    this.service = orderStatusService;
  }

  async createOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const orderStatus = plainToInstance(OrderStatusEntity, req.body);
      await validateOrReject(orderStatus);
      const id = await this.service.createOrderStatus(orderStatus);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const orderStatus = plainToInstance(OrderStatusEntity, req.body);
      await validateOrReject(orderStatus);
      await this.service.updateOrderStatus(orderStatus);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "OrderStatus id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteOrderStatus(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!id) {
        throw new ErrorEntity(
          "OrderStatus id must be a positive integer",
          statusCode.badRequest
        );
      }
      const orderStatus = await this.service.getOrderStatus(id);
      if (orderStatus === null) {
        throw new ErrorEntity("OrderStatus not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: orderStatus });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getOrderStatusList(req: Request, res: Response): Promise<void> {
    try {
      const orderStatusList = await this.service.getOrderStatusList();
      if (_.isEmpty(orderStatusList)) {
        throw new ErrorEntity("No orderStatus available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: orderStatusList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}
