import { ProductEntity } from "../entity";
import IProductRepo from "./IProductRepo";
import { Client as pgConn } from "pg";

export default class PgProductRepo implements IProductRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createProduct(product: ProductEntity): Promise<Number> {
    const res = await this.conn.query(
      `INSERT INTO "product" (name, description, country_id, initial_price, 
        discount, manufacturer_id, img_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        product.name,
        product.description,
        product.countryId,
        product.initialPrice,
        product.discount,
        product.manufacturerId,
        product.imgUrl,
      ]
    );

    return res?.rows?.[0]?.id;
  }

  async updateProduct(product: ProductEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "product" SET (name, description, country_id, initial_price, 
        discount, manufacturer_id, img_url) 
       = ($1, $2, $3, $4, $5, $6, $7)
       WHERE id = $8`,
      [
        product.name,
        product.description,
        product.countryId,
        product.initialPrice,
        product.discount,
        product.manufacturerId,
        product.imgUrl,
        product.id,
      ]
    );
  }

  async deleteProduct(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM "product"
       WHERE id = $1`,
      [id]
    );
  }

  async getProduct(id: number): Promise<ProductEntity> {
    const res = await this.conn.query(
      `SELECT * from "product"
       WHERE id = $1`,
      [id]
    );
    const product = new ProductEntity(res.rows[0]);

    return product;
  }

  async getProductList(): Promise<Array<ProductEntity>> {
    const res = await this.conn.query(`SELECT * from "product"`, []);
    const productList: Array<ProductEntity> = [];

    for (let product of res.rows) {
      productList.push(new ProductEntity(product));
    }

    return productList;
  }
}
