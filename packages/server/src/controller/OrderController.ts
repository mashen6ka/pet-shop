import { Request, Response } from "express";
import { AuthService, OrderService, UserService } from "../service";
import { OrderEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import BaseController from "./BaseController";

export default class OrderController extends BaseController {
  private service: OrderService;

  constructor(authService: AuthService, service: OrderService) {
    super(authService);
    this.service = service;
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const order = plainToInstance(OrderEntity, req.body);
      order.userId = userId;
      await validateOrReject(order);
      const id = await this.service.createOrder(order);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
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
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteOrder(id);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getOrder(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no order id";
      }
      const order = await this.service.getOrder(id);
      if (_.isEmpty(order)) {
        throw "Order not found";
      }
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getOrderList(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const orderList = await this.service.getOrderList();
      if (_.isEmpty(orderList)) {
        throw "No orders available";
      }
      res.status(200).json({ success: true, data: orderList });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async createOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.body.orderId;
      const productId = req.body.productId;
      const quantity = req.body.quantity;
      if (!Number.isInteger(orderId)) {
        throw "Invalid data: orderId must be an int value";
      }
      if (!Number.isInteger(productId)) {
        throw "Invalid data: productId must be an int value";
      }
      if (!Number.isInteger(quantity)) {
        throw "Invalid data: quantity must be an int value";
      }

      await this.service.createOrderProduct(orderId, productId, quantity);

      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async deleteOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.body.orderId;
      const productId = req.body.productId;
      if (!Number.isInteger(orderId)) {
        throw "Invalid data: orderId must be an int value";
      }
      if (!Number.isInteger(productId)) {
        throw "Invalid data: productId must be an int value";
      }

      await this.service.deleteOrderProduct(orderId, productId);

      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.body.orderId;
      const productId = req.body.productId;
      const quantity = req.body.quantity;
      if (!Number.isInteger(orderId)) {
        throw "Invalid data: orderId must be an int value";
      }
      if (!Number.isInteger(productId)) {
        throw "Invalid data: productId must be an int value";
      }
      if (!Number.isInteger(quantity)) {
        throw "Invalid data: quantity must be an int value";
      }
      await this.service.updateOrderProduct(orderId, productId, quantity);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getOrderItemList(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.query.orderId);
      if (!orderId) {
        throw "Invalid data: no order id";
      }
      const orderItemList = await this.service.getOrderItemList(orderId);
      if (orderItemList.length === 0) {
        throw "Order is empty";
      }
      res.status(200).json({ success: true, data: orderItemList });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }
}
