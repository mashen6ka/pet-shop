import { CountryEntity } from "../entity";
import ICountryRepo from "./ICountryRepo";
import { MongoClient as mongoConn } from "mongodb";
import { getNextSequence } from "./utils";

export default class MongoCountryRepo implements ICountryRepo {
  private conn: mongoConn;

  constructor(conn: mongoConn) {
    this.conn = conn;
  }

  async createCountry(country: CountryEntity): Promise<number> {
    const db = this.conn.db("main");
    const collection = db.collection("country");
    getNextSequence;
    const res = await collection.insertOne({
      _id: await getNextSequence(this.conn, "country"),
      name: country.name,
    });
    return Number(res?.insertedId) || null;
  }

  async updateCountry(country: CountryEntity): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("country");
    const res = await collection.updateOne(
      { _id: country.id },
      {
        $set: {
          name: country.name,
        },
      }
    );
  }

  async deleteCountry(id: number): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("country");
    const res = await collection.deleteOne({ id: id });
  }

  async getCountry(id: number): Promise<CountryEntity> {
    const db = this.conn.db("main");
    const collection = db.collection("country");
    const res = await collection.find({ id: id }).toArray();
    const countryFields = res?.[0];
    if (countryFields) {
      const country = new CountryEntity({
        id: Number(countryFields._id),
        name: countryFields.name,
      });
      return country;
    }
    return null;
  }

  async getCountryList(): Promise<Array<CountryEntity>> {
    const db = this.conn.db("main");
    const collection = db.collection("country");
    const res = await collection.find().toArray();

    const countryList: Array<CountryEntity> = [];

    for (let countryFields of res) {
      countryList.push(
        new CountryEntity({
          id: Number(countryFields._id),
          name: countryFields.name,
        })
      );
    }
    return countryList;
  }
}
