import { Request, Response } from "express";
import { AuthService, OrderService, UserService } from "../service";
import { OrderEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import BaseController from "./BaseController";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class OrderController extends BaseController {
  private service: OrderService;

  constructor(authService: AuthService, service: OrderService) {
    super(authService);
    this.service = service;
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.getUserIdByToken(req);
      const order = plainToInstance(OrderEntity, req.body);
      order.userId = userId;
      await validateOrReject(order);
      const id = await this.service.createOrder(order);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const order = plainToInstance(OrderEntity, req.body);
      await validateOrReject(order);
      await this.service.updateOrder(order);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteOrder(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.params.id);
      if (!id) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      const order = await this.service.getOrder(id);
      if (order === null) {
        throw new ErrorEntity("Order not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getOrderList(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const orderList = await this.service.getOrderList();
      if (_.isEmpty(orderList)) {
        throw new ErrorEntity("No orders available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: orderList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async createOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);
      const quantity = req.body.quantity;
      if (!Number.isInteger(orderId)) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      if (!Number.isInteger(productId)) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }
      if (!Number.isInteger(quantity)) {
        throw new ErrorEntity(
          "Quantity must be a positive integer",
          statusCode.badRequest
        );
      }

      await this.service.createOrderProduct(orderId, productId, quantity);

      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);
      if (!Number.isInteger(orderId)) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      if (!Number.isInteger(productId)) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }

      await this.service.deleteOrderProduct(orderId, productId);

      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.orderId);
      const productId = Number(req.params.productId);
      const quantity = req.body.quantity;
      if (!Number.isInteger(orderId)) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      if (!Number.isInteger(productId)) {
        throw new ErrorEntity(
          "Product id must be a positive integer",
          statusCode.badRequest
        );
      }
      if (!Number.isInteger(quantity)) {
        throw new ErrorEntity(
          "Quantity must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.updateOrderProduct(orderId, productId, quantity);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getOrderItemList(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.orderId);
      if (!orderId) {
        throw new ErrorEntity(
          "Order id must be a positive integer",
          statusCode.badRequest
        );
      }
      const orderItemList = await this.service.getOrderItemList(orderId);
      if (_.isEmpty(orderItemList)) {
        throw new ErrorEntity("Order is empty", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: orderItemList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}
