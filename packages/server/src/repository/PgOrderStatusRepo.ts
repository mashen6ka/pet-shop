import { OrderStatusEntity } from "../entity";
import IOrderStatusRepo from "./IOrderStatusRepo";
import { Client as pgConn } from "pg";

export default class PgOrderStatusRepo implements IOrderStatusRepo {
  private connAdmin: pgConn;

  constructor(connAdmin: pgConn) {
    this.connAdmin = connAdmin;
  }

  async createOrderStatus(orderStatus: OrderStatusEntity): Promise<Number> {
    const res = await this.connAdmin.query(
      `INSERT INTO "order_status" (name)
       VALUES ($1)
       RETURNING id`,
      [orderStatus.name]
    );

    return res?.rows?.[0]?.id;
  }

  async updateOrderStatus(orderStatus: OrderStatusEntity): Promise<void> {
    await this.connAdmin.query(
      `UPDATE "order_status" SET name = $1
       WHERE id = $2`,
      [orderStatus.name, orderStatus.id]
    );
  }

  async deleteOrderStatus(id: number): Promise<void> {
    await this.connAdmin.query(
      `DELETE FROM "order_status"
       WHERE id = $1`,
      [id]
    );
  }

  async getOrderStatus(id: number): Promise<OrderStatusEntity> {
    const res = await this.connAdmin.query(
      `SELECT * from "order_status"
       WHERE id = $1`,
      [id]
    );
    const orderStatusFields = res.rows[0];
    const orderStatus = new OrderStatusEntity({
      id: orderStatusFields.id,
      name: orderStatusFields.name,
    });

    return orderStatus;
  }

  async getOrderStatusList(): Promise<Array<OrderStatusEntity>> {
    const res = await this.connAdmin.query(`SELECT * from "order_status"`, []);
    const orderStatusList: Array<OrderStatusEntity> = [];

    for (let orderStatusFields of res.rows) {
      orderStatusList.push(
        new OrderStatusEntity({
          id: orderStatusFields.id,
          name: orderStatusFields.name,
        })
      );
    }

    return orderStatusList;
  }
}
