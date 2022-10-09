import { CompanyEntity } from "../entity";
import ICompanyRepo from "./ICompanyRepo";
import { Client as pgConn } from "pg";

export default class PgCompanyRepo implements ICompanyRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createCompany(company: CompanyEntity): Promise<number> {
    const res = await this.conn.query(
      `INSERT INTO company (name, "KPP", "INN", address) 
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [company.name, company.KPP, company.INN, company.address]
    );
    return res?.rows?.[0]?.id || null;
  }

  async updateCompany(company: CompanyEntity): Promise<void> {
    await this.conn.query(
      `UPDATE company SET (name, "KPP", "INN", address) 
       = ($1, $2, $3, $4)
       WHERE id = $5`,
      [company.name, company.KPP, company.INN, company.address, company.id]
    );
  }

  async deleteCompany(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM company
       WHERE id = $1`,
      [id]
    );
  }

  async getCompany(id: number): Promise<CompanyEntity> {
    const res = await this.conn.query(
      `SELECT * from company
       WHERE id = $1`,
      [id]
    );
    const companyFields = res?.rows?.[0];
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
    const res = await this.conn.query(`SELECT * from "company"`, []);
    const companyList: Array<CompanyEntity> = [];

    for (let companyFields of res?.rows) {
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
