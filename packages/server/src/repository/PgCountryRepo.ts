import { CountryEntity } from "../entity";
import ICountryRepo from "./ICountryRepo";
import { Client as pgConn } from "pg";

export default class PgCountryRepo implements ICountryRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createCountry(country: CountryEntity): Promise<number> {
    const res = await this.conn.query(
      `INSERT INTO "country" (name)
       VALUES ($1)
       RETURNING id`,
      [country.name]
    );
    return res?.rows?.[0]?.id || null;
  }

  async updateCountry(country: CountryEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "country" SET name = $1
       WHERE id = $2`,
      [country.name, country.id]
    );
  }

  async deleteCountry(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM "country"
       WHERE id = $1`,
      [id]
    );
  }

  async getCountry(id: number): Promise<CountryEntity> {
    const res = await this.conn.query(
      `SELECT * from "country"
       WHERE id = $1`,
      [id]
    );
    const countryFields = res?.rows?.[0];
    if (countryFields) {
      const country = new CountryEntity({
        id: countryFields.id,
        name: countryFields.name,
      });
      return country;
    }
    return null;
  }

  async getCountryList(): Promise<Array<CountryEntity>> {
    const res = await this.conn.query(`SELECT * from "country"`, []);
    const countryList: Array<CountryEntity> = [];

    for (let countryFields of res?.rows) {
      countryList.push(
        new CountryEntity({
          id: countryFields.id,
          name: countryFields.name,
        })
      );
    }
    return countryList;
  }
}
