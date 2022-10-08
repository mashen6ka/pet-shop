import { ProductEntity, ShopEntity } from "../entity";
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
    const productFields = res.rows[0];
    const product = new ProductEntity({
      id: productFields.id,
      name: productFields.name,
      description: productFields.description,
      countryId: productFields.country_id,
      manufacturerId: productFields.manufacturer_id,
      initialPrice: productFields.initial_price,
      discount: productFields.discount,
      imgUrl: productFields.img_url,
    });

    return product;
  }

  async getProductList(): Promise<Array<ProductEntity>> {
    const res = await this.conn.query(`SELECT * from "product"`, []);
    const productList: Array<ProductEntity> = [];

    for (let productFields of res.rows) {
      productList.push(
        new ProductEntity({
          id: productFields.id,
          name: productFields.name,
          description: productFields.description,
          countryId: productFields.country_id,
          manufacturerId: productFields.manufacturer_id,
          initialPrice: productFields.initial_price,
          discount: productFields.discount,
          imgUrl: productFields.img_url,
        })
      );
    }

    return productList;
  }

  async getProductShopList(productId: number): Promise<Array<ShopEntity>> {
    const res = await this.conn.query(
      `SELECT DISTINCT id, address, working_hours, phone
       FROM "shop" s JOIN product__shop ps ON s.id = ps.shop_id
       WHERE ps.product_id = $1 AND not(ps.quantity = 0)`,
      [productId]
    );
    let shopList: Array<ShopEntity> = [];
    for (let shopFields of res.rows) {
      shopList.push(
        // мб стоит по аналогии с Order и OrderItem ввести новую сущность, чтоб еще кол-во хранить (но пока не надо)
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
