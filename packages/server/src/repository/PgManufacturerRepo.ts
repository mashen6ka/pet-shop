import { ManufacturerEntity } from "../entity";
import IManufacturerRepo from "./IManufacturerRepo";
import { Client as pgConn } from "pg";

export default class PgManufacturerRepo implements IManufacturerRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createManufacturer(manufacturer: ManufacturerEntity): Promise<number> {
    const res = await this.conn.query(
      `INSERT INTO "manufacturer" (name)
       VALUES ($1)
       RETURNING id`,
      [manufacturer.name]
    );

    return res?.rows?.[0]?.id;
  }

  async updateManufacturer(manufacturer: ManufacturerEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "manufacturer" SET name = $1
       WHERE id = $2`,
      [manufacturer.name, manufacturer.id]
    );
  }

  async deleteManufacturer(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM "manufacturer"
       WHERE id = $1`,
      [id]
    );
  }

  async getManufacturer(id: number): Promise<ManufacturerEntity> {
    const res = await this.conn.query(
      `SELECT * from "manufacturer"
       WHERE id = $1`,
      [id]
    );
    const manufacturerFields = res.rows[0];
    const manufacturer = new ManufacturerEntity({
      id: manufacturerFields.id,
      name: manufacturerFields.name,
    });

    return manufacturer;
  }

  async getManufacturerList(): Promise<Array<ManufacturerEntity>> {
    const res = await this.conn.query(`SELECT * from "manufacturer"`, []);
    const manufacturerList: Array<ManufacturerEntity> = [];

    for (let manufacturerFields of res.rows) {
      manufacturerList.push(
        new ManufacturerEntity({
          id: manufacturerFields.id,
          name: manufacturerFields.name,
        })
      );
    }

    return manufacturerList;
  }
}
