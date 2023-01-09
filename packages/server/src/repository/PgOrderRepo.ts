import { OrderEntity, OrderItemEntity, ProductEntity } from "../entity";
import IOrderRepo from "./IOrderRepo";
import { Client as pgConn } from "pg";

export default class PgOrderRepo implements IOrderRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createOrder(order: OrderEntity): Promise<number> {
    const res = await this.conn.query(
      `INSERT INTO "order" (user_id, company_id, status_id, 
        created_at, completed_at, shop_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        order.userId,
        order.companyId,
        order.statusId,
        order.createdAt,
        order.completedAt,
        order.shopId,
      ]
    );
    return res?.rows?.[0]?.id || null;
  }

  async updateOrder(order: OrderEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "order" SET (user_id, company_id, status_id, 
        created_at, completed_at, shop_id) 
       = ($1, $2, $3, $4, $5, $6)
       WHERE id = $7`,
      [
        order.userId,
        order.companyId,
        order.statusId,
        order.createdAt,
        order.completedAt,
        order.shopId,
        order.id,
      ]
    );
  }

  async deleteOrder(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM "order"
       WHERE id = $1`,
      [id]
    );
  }

  async getOrder(id: number): Promise<OrderEntity> {
    const res = await this.conn.query(
      `SELECT * FROM "order"
       WHERE id = $1`,
      [id]
    );
    const orderFields = res?.rows?.[0];
    if (orderFields) {
      const order = new OrderEntity({
        id: orderFields.id,
        userId: orderFields.user_id,
        companyId: orderFields.company_id,
        statusId: orderFields.status_id,
        createdAt: orderFields.created_at,
        completedAt: orderFields.completed_at,
        shopId: orderFields.shop_id,
      });
      return order;
    }
    return null;
  }

  async getOrderList(): Promise<Array<OrderEntity>> {
    const res = await this.conn.query(`SELECT * FROM "order"`, []);

    const orderList: Array<OrderEntity> = [];
    for (let orderFields of res?.rows) {
      const order = new OrderEntity({
        id: orderFields.id,
        userId: orderFields.user_id,
        companyId: orderFields.company_id,
        statusId: orderFields.status_id,
        createdAt: orderFields.created_at,
        completedAt: orderFields.completed_at,
        shopId: orderFields.shop_id,
      });
      orderList.push(order);
    }
    return orderList;
  }

  async getOrderItemList(orderId: number): Promise<Array<OrderItemEntity>> {
    const res = await this.conn.query(
      `SELECT id, name, description, country_id, manufacturer_id,
       initial_price ,discount, img_url, quantity
       FROM product p 
       JOIN order__product op on p.id = op.product_id 
       WHERE op.order_id = $1`,
      [orderId]
    );

    const orderItemList: Array<OrderItemEntity> = [];
    for (let orderItemFields of res?.rows) {
      const quantity = orderItemFields.quantity;
      const product = new ProductEntity({
        id: orderItemFields.id,
        name: orderItemFields.name,
        description: orderItemFields.description,
        countryId: orderItemFields.country_id,
        manufacturerId: orderItemFields.manufacturer_id,
        initialPrice: orderItemFields.initial_price,
        discount: orderItemFields.discount,
        imgUrl: orderItemFields.img_url,
      });
      orderItemList.push(
        new OrderItemEntity({ product: product, quantity: quantity })
      );
    }
    return orderItemList;
  }

  async createOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    const res = await this.conn.query(
      `INSERT INTO "order__product" (order_id, product_id, quantity)
       VALUES ($1, $2, $3)`,
      [orderId, productId, quantity]
    );
  }

  async deleteOrderProduct(orderId: number, productId: Number): Promise<void> {
    const res = await this.conn.query(
      `DELETE FROM "order__product"
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId]
    );
  }

  async updateOrderProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    const res = await this.conn.query(
      `UPDATE "order__product" SET quantity = $3
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId, quantity]
    );
  }
}
