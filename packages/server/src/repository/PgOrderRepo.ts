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
      `INSERT INTO "order" (client_id, company_id, status_id, 
        created_at, completed_at, shop_id, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        order.clientId,
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
      `UPDATE "order" SET (client_id, company_id, status_id, 
        created_at, completed_at, shop_id, price) 
       = ($1, $2, $3, $4, $5, $6, $7)
       WHERE id = $8`,
      [
        order.clientId,
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
    const resOrder = await this.conn.query(
      `SELECT * from "order"
       WHERE id = $1`,
      [id]
    );
    const resOrderItem = await this.conn.query(
      `SELECT * from product p 
       JOIN order__product op on p.id = op.product_id 
       WHERE op.order_id = $1`,
      [id]
    );
    const orderItemList: Array<OrderItemEntity> = [];
    for (let orderItem of resOrderItem.rows) {
      const quantity = orderItem.quantity;
      delete orderItem.quantity;
      const product = new ProductEntity(orderItem);
      orderItemList.push(
        new OrderItemEntity({ product: product, quantity: quantity })
      );
    }
    // допилить
    const order = new OrderEntity(resOrder.rows[0]);

    return order;
  }

  async createOrderProduct(
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

  async deleteOrderProduct(orderId: number, productId: Number): Promise<void> {
    const res = await this.conn.query(
      `DELETE FROM "order__product"
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId]
    );
  }

  async updateOrderProduct(
    orderId: number,
    productId: Number,
    quantity: Number
  ): Promise<void> {
    const res = await this.conn.query(
      `UPDATE "order__product" SET (order_id, product_id, quantity)
       = ($1, $2, $3)
       WHERE order_id = $1 and product_id = $2`,
      [orderId, productId, quantity]
    );
  }
}
