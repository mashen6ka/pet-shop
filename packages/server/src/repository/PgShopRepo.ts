import { ShopEntity } from "../entity";
import IShopRepo from "./IShopRepo";
import { Client as pgConn } from "pg";

export default class PgShopRepo implements IShopRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createShop(shop: ShopEntity): Promise<Number> {
    const res = await this.conn.query(
      `INSERT INTO shop (address, working_hours)
       VALUES ($1, $2)
       RETURNING id`,
      [shop.address, shop.workingHours]
    );

    return res?.rows?.[0]?.id;
  }

  async updateShop(shop: ShopEntity): Promise<void> {
    await this.conn.query(
      `UPDATE shop SET (address, working_hours) 
       = ($1, $2)
       WHERE id = $3`,
      [shop.address, shop.workingHours, shop.id]
    );
  }

  async deleteShop(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM shop
       WHERE id = $1`,
      [id]
    );
  }

  async getShop(id: number): Promise<ShopEntity> {
    const res = await this.conn.query(
      `SELECT * from shop
       WHERE id = $1`,
      [id]
    );
    const shop = new ShopEntity(res.rows[0]);

    return shop;
  }

  async getShopList(): Promise<Array<ShopEntity>> {
    const res = await this.conn.query(`SELECT * from shop`, []);
    let shopList = [];
    for (let shop of res.rows) {
      shopList.push(new ShopEntity(shop));
    }
    return shopList;
  }
}
