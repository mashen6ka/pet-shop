import { CompanyEntity } from "../entity";
import ICompanyRepo from "./ICompanyRepo";
import { MongoClient as mongoConn } from "mongodb";

export default class MongoCompanyRepo implements ICompanyRepo {
  private conn: mongoConn;

  constructor(conn: mongoConn) {
    this.conn = conn;
  }

  async createCompany(company: CompanyEntity): Promise<number> {
    const db = this.conn.db("main");
    const collection = db.collection("company");
    const res = await collection.insertOne(company);
    return Number(res?.insertedId) || null; //?
  }

  async updateCompany(company: CompanyEntity): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("company");
    const res = await collection.updateOne(
      { id: company.id },
      {
        $set: {
          name: company.name,
          KPP: company.KPP,
          INN: company.INN,
          address: company.address,
        },
      }
    );
  }

  async deleteCompany(id: number): Promise<void> {
    const db = this.conn.db("main");
    const collection = db.collection("company");
    const res = await collection.deleteOne({ id: id });
  }

  async getCompany(id: number): Promise<CompanyEntity> {
    const db = this.conn.db("main");
    const collection = db.collection("company");
    const res = await collection.find({ id: id }).toArray();
    const companyFields = res?.[0];
    if (companyFields) {
      const company = new CompanyEntity({
        id: companyFields.id,
        name: companyFields.name,
        KPP: companyFields.KPP,
        INN: companyFields.INN,
        address: companyFields.address,
      });
      return company;
    }
    return null;
  }

  async getCompanyList(): Promise<Array<CompanyEntity>> {
    const db = this.conn.db("main");
    const collection = db.collection("company");
    const res = await collection.find().toArray();

    const companyList: Array<CompanyEntity> = [];

    for (let companyFields of res) {
      companyList.push(
        new CompanyEntity({
          id: companyFields.id,
          name: companyFields.name,
          KPP: companyFields.KPP,
          INN: companyFields.INN,
          address: companyFields.address,
        })
      );
    }
    return companyList;
  }
}
