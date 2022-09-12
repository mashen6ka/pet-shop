import { Request, Response } from "express";
import { OrderService } from "../service";
import { OrderEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class OrderController {
  private service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  async createOrder(req: Request, res: Response): Promise<Number> {
    try {
      const order = plainToInstance(OrderEntity, req.body);
      await validateOrReject(order);
      const id = await this.service.createOrder(order);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = plainToInstance(OrderEntity, req.body);
      await validateOrReject(order);
      await this.service.updateOrder(order);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteOrder(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getOrder(req: Request, res: Response): Promise<OrderEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const order = await this.service.getOrder(id);
      if (_.isEmpty(order)) {
        throw "Order not found";
      }
      res.status(200).json({ success: true, data: order });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getOrderList(req: Request, res: Response): Promise<OrderEntity> {
    try {
      const orderList = await this.service.getOrderList();
      if (_.isEmpty(orderList)) {
        throw "No orders available";
      }
      res.status(200).json({ success: true, data: orderList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async createOrderItem(req: Request, res: Response): Promise<OrderEntity> {
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
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteOrderItem(req: Request, res: Response): Promise<OrderEntity> {
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
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<OrderEntity> {
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
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getOrderItemList(req: Request, res: Response): Promise<OrderEntity> {
    try {
      const orderId = req.body.orderId;
      if (!Number.isInteger(orderId)) {
        throw "Invalid data: orderId must be an int value";
      }
      const orderItemList = await this.service.getOrderItemList(orderId);
      if (orderItemList.length === 0) {
        throw "Order is empty";
      }
      res.status(200).json({ success: true, data: orderItemList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}
