import { ManufacturerEntity } from "../entity";
import IManufacturerRepo from "./IManufacturerRepo";
import { MongoClient as mongoConn } from "mongodb";
import { getNextSequence } from "./utils";

export default class MongoManufacturerRepo implements IManufacturerRepo {
  private conn: mongoConn;

  constructor(conn: mongoConn) {
    this.conn = conn;
  }

  async createManufacturer(manufacturer: ManufacturerEntity): Promise<number> {
    const db = this.conn.db("main");
    const collection = db.collection("manufacturer");
    getNextSequence;
    const res = await collection.insertOne({
      _id: await getNextSequence(this.conn, "manufacturer"),
      name: manufacturer.name,
    });
    return Number(res?.insertedId) || null;
  }

  async updateManufacturer(manufacturer: ManufacturerEntity): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("manufacturer");
    const res = await collection.updateOne(
      { _id: manufacturer.id },
      {
        $set: {
          name: manufacturer.name,
        },
      }
    );
  }

  async deleteManufacturer(id: number): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("manufacturer");
    const res = await collection.deleteOne({ id: id });
  }

  async getManufacturer(id: number): Promise<ManufacturerEntity> {
    const db = this.conn.db("main");
    const collection = db.collection("manufacturer");
    const res = await collection.find({ id: id }).toArray();
    const manufacturerFields = res?.[0];
    if (manufacturerFields) {
      const manufacturer = new ManufacturerEntity({
        id: Number(manufacturerFields._id),
        name: manufacturerFields.name,
      });
      return manufacturer;
    }
    return null;
  }

  async getManufacturerList(): Promise<Array<ManufacturerEntity>> {
    const db = this.conn.db("main");
    const collection = db.collection("manufacturer");
    const res = await collection.find().toArray();

    const manufacturerList: Array<ManufacturerEntity> = [];

    for (let manufacturerFields of res) {
      manufacturerList.push(
        new ManufacturerEntity({
          id: Number(manufacturerFields._id),
          name: manufacturerFields.name,
        })
      );
    }
    return manufacturerList;
  }
}
