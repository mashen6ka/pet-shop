import { Client as pgConn } from "pg";
import crypto from "crypto";
import {
  CompanyEntity,
  CountryEntity,
  ManufacturerEntity,
  OrderEntity,
  OrderItemEntity,
  OrderStatusEntity,
  ProductEntity,
  ShopEntity,
  UserEntity,
} from "../src/entity";

export async function insertProductShop(
  conn: pgConn,
  productId: number,
  shopId: number,
  quantity: number
) {
  await conn.query(
    `INSERT INTO "product__shop" (product_id, shop_id, quantity)
    VALUES ($1, $2, $3)`,
    [productId, shopId, quantity]
  );
}

export async function insertOrderItem(
  conn: pgConn,
  orderId: number,
  orderItem: OrderItemEntity
) {
  await conn.query(
    `INSERT INTO "order__product" (order_id, product_id, quantity)
    VALUES ($1, $2, $3)`,
    [orderId, orderItem.product.id, orderItem.quantity]
  );
}

export async function selectOrderItem(
  conn: pgConn,
  orderId: number,
  productId: number
) {
  const response = await conn.query(
    `SELECT order_id, product_id, quantity from "order__product"
    WHERE order_id = $1 and product_id = $2`,
    [orderId, productId]
  );
  const orderItemFields = response.rows[0];
  if (!orderItemFields) return undefined;
  return {
    orderId: orderItemFields.order_id,
    productId: orderItemFields.product_id,
    quantity: orderItemFields.quantity,
  };
}

export async function insertProduct(conn: pgConn, product: ProductEntity) {
  const response = await conn.query(
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
  return response?.rows?.[0]?.id;
}

export async function selectProduct(conn: pgConn, productId: number) {
  const response = await conn.query(
    `SELECT * from "product"
    WHERE id = $1`,
    [productId]
  );
  const productFields = response.rows[0];
  if (!productFields) return undefined;
  return new ProductEntity({
    id: productFields.id,
    name: productFields.name,
    description: productFields.description,
    countryId: productFields.country_id,
    manufacturerId: productFields.manufacturer_id,
    initialPrice: productFields.initial_price,
    discount: productFields.discount,
    imgUrl: productFields.img_url,
  });
}

export async function insertUser(conn: pgConn, user: UserEntity) {
  const response = await conn.query(
    `INSERT INTO "user" (login, password, first_name, last_name, 
      middle_name, birthday, email, phone, personal_discount, worker) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id`,
    [
      user.login,
      crypto.createHash("sha256").update(user.password).digest("base64"),
      user.firstName,
      user.lastName,
      user.middleName,
      user.birthday,
      user.email,
      user.phone,
      user.personalDiscount,
      user.worker,
    ]
  );
  return response?.rows?.[0]?.id;
}

export async function selectUser(conn: pgConn, userId: number) {
  const response = await conn.query(
    `SELECT id, login, password, first_name, last_name, 
    middle_name, birthday, email, phone, personal_discount, worker
     FROM "user"
     WHERE id = $1`,
    [userId]
  );
  const userFields = response.rows[0];
  if (!userFields) return undefined;
  return new UserEntity({
    id: userFields.id,
    login: userFields.login,
    password: String.fromCharCode(...userFields.password),
    worker: userFields.worker,
    firstName: userFields.first_name,
    lastName: userFields.last_name,
    middleName: userFields.middle_name,
    birthday: userFields.birthday,
    email: userFields.email,
    phone: userFields.phone,
    personalDiscount: userFields.personal_discount,
  });
}

export async function insertOrder(conn: pgConn, order: OrderEntity) {
  const response = await conn.query(
    `INSERT INTO "order" (user_id, company_id, status_id, created_at, completed_at, shop_id) 
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id`,
    [
      order.userId,
      order.companyId,
      order.statusId,
      order.createdAt,
      order.completedAt,
      order.shopId,
    ]
  );
  return response?.rows?.[0]?.id;
}

export async function selectOrder(conn: pgConn, orderId: number) {
  const response = await conn.query(
    `SELECT id, user_id, company_id, status_id, created_at, completed_at, shop_id
     FROM "order"
     WHERE id = $1`,
    [orderId]
  );
  const orderFields = response.rows[0];
  if (!orderFields) return undefined;
  return new OrderEntity({
    id: orderFields.id,
    userId: orderFields.user_id,
    companyId: orderFields.company_id,
    statusId: orderFields.status_id,
    createdAt: orderFields.created_at,
    completedAt: orderFields.completed_at,
    shopId: orderFields.shop_id,
  });
}

export async function insertShop(conn: pgConn, shop: ShopEntity) {
  const response = await conn.query(
    `INSERT INTO shop (address, working_hours, phone) 
     VALUES ($1, $2, $3)
     RETURNING id`,
    [shop.address, shop.workingHours, shop.phone]
  );
  return response?.rows?.[0]?.id;
}

export async function selectShop(conn: pgConn, shopId: number) {
  const response = await conn.query(
    `SELECT id, address, working_hours, phone
     FROM "shop"
     WHERE id = $1`,
    [shopId]
  );
  const shopFields = response.rows[0];
  if (!shopFields) return undefined;
  return new ShopEntity({
    id: response.rows[0].id,
    address: response.rows[0].address,
    workingHours: response.rows[0].working_hours,
    phone: response.rows[0].phone,
  });
}

export async function insertOrderStatus(
  conn: pgConn,
  orderStatus: OrderStatusEntity
) {
  const response = await conn.query(
    `INSERT INTO order_status (name) 
     VALUES ($1)
     RETURNING id`,
    [orderStatus.name]
  );
  return response?.rows?.[0]?.id;
}

export async function selectOrderStatus(conn: pgConn, orderStatusId: number) {
  const response = await conn.query(
    `SELECT id, name
     FROM "order_status"
     WHERE id = $1`,
    [orderStatusId]
  );
  const orderStatusFields = response.rows[0];
  if (!orderStatusFields) return undefined;
  return new OrderStatusEntity({
    id: orderStatusFields.id,
    name: orderStatusFields.name,
  });
}

export async function insertManufacturer(
  conn: pgConn,
  manufacturer: ManufacturerEntity
) {
  const response = await conn.query(
    `INSERT INTO manufacturer (name) 
     VALUES ($1)
     RETURNING id`,
    [manufacturer.name]
  );
  return response?.rows?.[0]?.id;
}

export async function selectManufacturer(conn: pgConn, manufacturerId: number) {
  const response = await conn.query(
    `SELECT id, name
     FROM "manufacturer"
     WHERE id = $1`,
    [manufacturerId]
  );
  const manufacturerFields = response.rows[0];
  if (!manufacturerFields) return undefined;
  return new ManufacturerEntity({
    id: manufacturerFields.id,
    name: manufacturerFields.name,
  });
}

export async function insertCountry(conn: pgConn, country: CountryEntity) {
  const response = await conn.query(
    `INSERT INTO country (name) 
     VALUES ($1)
     RETURNING id`,
    [country.name]
  );
  return response?.rows?.[0]?.id;
}

export async function selectCountry(conn: pgConn, countryId: number) {
  const response = await conn.query(
    `SELECT id, name
     FROM "country"
     WHERE id = $1`,
    [countryId]
  );
  const countryFields = response.rows[0];
  if (!countryFields) return undefined;
  return new CountryEntity({
    id: countryFields.id,
    name: countryFields.name,
  });
}

export async function insertCompany(conn: pgConn, company: CompanyEntity) {
  const response = await conn.query(
    `INSERT INTO company (name, "KPP", "INN", address) 
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [company.name, company.KPP, company.INN, company.address]
  );
  return response?.rows?.[0]?.id;
}

export async function selectCompany(conn: pgConn, companyId: number) {
  const response = await conn.query(
    `SELECT id, name, "KPP", "INN", address
     FROM "company"
     WHERE id = $1`,
    [companyId]
  );
  const companyFields = response.rows[0];
  if (!companyFields) return undefined;
  return new CompanyEntity({
    id: companyFields.id,
    name: companyFields.name,
    KPP: companyFields.KPP,
    INN: companyFields.INN,
    address: companyFields.address,
  });
}
