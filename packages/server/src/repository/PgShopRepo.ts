import { ShopEntity } from "../entity";
import IShopRepo from "./IShopRepo";
import { Client as pgConn } from "pg";

export default class PgShopRepo implements IShopRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createShop(shop: ShopEntity): Promise<number> {
    const res = await this.conn.query(
      `INSERT INTO shop (address, working_hours, phone)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [shop.address, shop.workingHours, shop.phone]
    );

    return res?.rows?.[0]?.id;
  }

  async updateShop(shop: ShopEntity): Promise<void> {
    await this.conn.query(
      `UPDATE shop SET (address, working_hours, phone) 
       = ($1, $2, $3)
       WHERE id = $4`,
      [shop.address, shop.workingHours, shop.phone, shop.id]
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
    const shopFields = res.rows[0];
    const shop = new ShopEntity({
      id: shopFields.id,
      address: shopFields.address,
      workingHours: shopFields.working_hours,
      phone: shopFields.phone,
    });

    return shop;
  }

  async getShopList(): Promise<Array<ShopEntity>> {
    const res = await this.conn.query(`SELECT * from shop`, []);
    let shopList = [];
    for (let shopFields of res.rows) {
      shopList.push(
        new ShopEntity({
          id: shopFields.id,
          address: shopFields.address,
          workingHours: shopFields.working_hours,
          phone: shopFields.phone,
        })
      );
    }
    return shopList;
  }
}
