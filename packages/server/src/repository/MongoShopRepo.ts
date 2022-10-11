import { ShopEntity } from "../entity";
import IShopRepo from "./IShopRepo";
import { MongoClient as mongoConn } from "mongodb";
import { getNextSequence } from "./utils";

export default class MongoShopRepo implements IShopRepo {
  private conn: mongoConn;

  constructor(conn: mongoConn) {
    this.conn = conn;
  }

  async createShop(shop: ShopEntity): Promise<number> {
    const db = this.conn.db("main");
    const collection = db.collection("shop");
    getNextSequence;
    const res = await collection.insertOne({
      _id: await getNextSequence(this.conn, "shop"),
      address: shop.address,
      workingHours: shop.workingHours,
      phone: shop.phone,
    });
    return Number(res?.insertedId) || null;
  }

  async updateShop(shop: ShopEntity): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("shop");
    const res = await collection.updateOne(
      { _id: shop.id },
      {
        $set: {
          address: shop.address,
          workingHours: shop.workingHours,
          phone: shop.phone,
        },
      }
    );
  }

  async deleteShop(id: number): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("shop");
    const res = await collection.deleteOne({ id: id });
  }

  async getShop(id: number): Promise<ShopEntity> {
    const db = this.conn.db("main");
    const collection = db.collection("shop");
    const res = await collection.find({ id: id }).toArray();
    const shopFields = res?.[0];
    if (shopFields) {
      const shop = new ShopEntity({
        id: Number(shopFields._id),
        address: shopFields.address,
        workingHours: shopFields.working_hours,
        phone: shopFields.phone,
      });
      return shop;
    }
    return null;
  }

  async getShopList(): Promise<Array<ShopEntity>> {
    const db = this.conn.db("main");
    const collection = db.collection("shop");
    const res = await collection.find().toArray();

    const shopList: Array<ShopEntity> = [];

    for (let shopFields of res) {
      shopList.push(
        new ShopEntity({
          id: Number(shopFields._id),
          address: shopFields.address,
          workingHours: shopFields.working_hours,
          phone: shopFields.phone,
        })
      );
    }
    return shopList;
  }
}
