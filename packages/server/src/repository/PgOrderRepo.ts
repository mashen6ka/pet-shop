import { OrderEntity, OrderItemEntity, ProductEntity } from "../entity";
import IOrderRepo from "./IOrderRepo";
import { Client as pgConn } from "pg";

export default class PgOrderRepo implements IOrderRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createOrder(order: OrderEntity): Promise<Number> {
    const res = await this.conn.query(
      `INSERT INTO "order" (user_id, company_id, status_id, 
        created_at, completed_at, shop_id, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        order.userId,
        order.companyId,
        order.statusId,
        order.createdAt,
        order.completedAt,
        order.shopId,
        order.price,
      ]
    );

    return res?.rows?.[0]?.id;
  }

  async updateOrder(order: OrderEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "order" SET (user_id, company_id, status_id, 
        created_at, completed_at, shop_id, price) 
       = ($1, $2, $3, $4, $5, $6, $7)
       WHERE id = $8`,
      [
        order.userId,
        order.companyId,
        order.statusId,
        order.createdAt,
        order.completedAt,
        order.shopId,
        order.price,
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
    const order = new OrderEntity(res.rows[0]);

    return order;
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
    for (let orderItem of res.rows) {
      const quantity = orderItem.quantity;
      delete orderItem.quantity;
      const product = new ProductEntity(orderItem);
      orderItemList.push(
        new OrderItemEntity({ product: product, quantity: quantity })
      );
    }
    return orderItemList;
  }

  async createOrderItem(
    orderId: number,
    productId: Number,
    quantity: Number
  ): Promise<void> {
    const res = await this.conn.query(
      `INSERT INTO "order__product" (order_id, product_id, quantity)
       VALUES ($1, $2, $3)`,
      [orderId, productId, quantity]
    );
  }

  async deleteOrderItem(orderId: number, productId: Number): Promise<void> {
    const res = await this.conn.query(
      `DELETE FROM "order__product"
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId]
    );
  }

  async updateOrderItem(
    orderId: number,
    productId: Number,
    quantity: Number
  ): Promise<void> {
    const res = await this.conn.query(
      `UPDATE "order__product" SET quantity = $3
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId, quantity]
    );
  }
}
