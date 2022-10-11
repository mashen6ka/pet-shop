import { OrderStatusEntity } from "../entity";
import IOrderStatusRepo from "./IOrderStatusRepo";
import { MongoClient as mongoConn } from "mongodb";
import { getNextSequence } from "./utils";

export default class MongoOrderStatusRepo implements IOrderStatusRepo {
  private conn: mongoConn;

  constructor(conn: mongoConn) {
    this.conn = conn;
  }

  async createOrderStatus(orderStatus: OrderStatusEntity): Promise<number> {
    const db = this.conn.db("main");
    const collection = db.collection("orderStatus");
    getNextSequence;
    const res = await collection.insertOne({
      _id: await getNextSequence(this.conn, "orderStatus"),
      name: orderStatus.name,
    });
    return Number(res?.insertedId) || null;
  }

  async updateOrderStatus(orderStatus: OrderStatusEntity): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("orderStatus");
    const res = await collection.updateOne(
      { _id: orderStatus.id },
      {
        $set: {
          name: orderStatus.name,
        },
      }
    );
  }

  async deleteOrderStatus(id: number): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("orderStatus");
    const res = await collection.deleteOne({ id: id });
  }

  async getOrderStatus(id: number): Promise<OrderStatusEntity> {
    const db = this.conn.db("main");
    const collection = db.collection("orderStatus");
    const res = await collection.find({ id: id }).toArray();
    const orderStatusFields = res?.[0];
    if (orderStatusFields) {
      const orderStatus = new OrderStatusEntity({
        id: Number(orderStatusFields._id),
        name: orderStatusFields.name,
      });
      return orderStatus;
    }
    return null;
  }

  async getOrderStatusList(): Promise<Array<OrderStatusEntity>> {
    const db = this.conn.db("main");
    const collection = db.collection("orderStatus");
    const res = await collection.find().toArray();

    const orderStatusList: Array<OrderStatusEntity> = [];

    for (let orderStatusFields of res) {
      orderStatusList.push(
        new OrderStatusEntity({
          id: Number(orderStatusFields._id),
          name: orderStatusFields.name,
        })
      );
    }
    return orderStatusList;
  }
}
