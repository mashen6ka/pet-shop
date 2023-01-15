import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import {
  CountryBuilder,
  ManufacturerBuilder,
  ProductBuilder,
  ShopBuilder,
  UserBuilder,
} from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequest from "../send-request";
import checkResponse from "../check-response";
import {
  insertCountry,
  insertManufacturer,
  insertProduct,
  insertProductShop,
  insertShop,
  selectProduct,
} from "../db-helpers";

describe("Product", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of [
      "user",
      "product",
      "product__shop",
      "country",
      "manufacturer",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of [
      "user",
      "product",
      "product__shop",
      "country",
      "manufacturer",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/product/create", async () => {
    const product = await buildProductWithDependencies(conn);
    const serviceResponse = await sendRequest(
      "post",
      "/product/create",
      product,
      token
    );

    const productId = serviceResponse.data.data.id;
    product.id = productId;
    checkResponse(serviceResponse.data, { id: product.id });

    const dbResponse = await selectProduct(conn, productId);
    expect(dbResponse).toStrictEqual(product);
  });

  it("/product/update", async () => {
    const product = await buildProductWithDependencies(conn);
    const productId = await insertProduct(conn, product);

    const productUpdated = product;
    productUpdated.name + "-updated";
    productUpdated.id = productId;
    const serviceResponse = await sendRequest(
      "post",
      "/product/update",
      productUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectProduct(conn, productId);
    expect(dbResponse).toStrictEqual(productUpdated);
  });

  it("/product/get", async () => {
    const product = await buildProductWithDependencies(conn);
    const productId = await insertProduct(conn, product);

    product.id = productId;
    const serviceResponse = await sendRequest(
      "get",
      "/product/get",
      { id: product.id },
      token
    );
    checkResponse(serviceResponse.data, product);
  });

  it("/product/get/list", async () => {
    const product = await buildProductWithDependencies(conn);
    const productId = await insertProduct(conn, product);

    product.id = productId;
    const serviceResponse = await sendRequest(
      "get",
      "/product/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [product]);
  });

  it("/product/delete", async () => {
    const product = await buildProductWithDependencies(conn);
    const productId = await insertProduct(conn, product);

    product.id = productId;
    const serviceResponse = await sendRequest(
      "post",
      "/product/delete",
      { id: product.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectProduct(conn, productId);
    expect(dbResponse).toStrictEqual(undefined);
  });

  it("/product/get/shop/list", async () => {
    const product = await buildProductWithDependencies(conn);
    const productId = await insertProduct(conn, product);
    product.id = productId;

    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);
    shop.id = shopId;

    await insertProductShop(conn, productId, shopId, 5);

    product.id = productId;
    const serviceResponse = await sendRequest(
      "get",
      "/product/get/shop/list",
      { productId: productId },
      token
    );
    checkResponse(serviceResponse.data, [shop]);
  });
});

async function buildProductWithDependencies(conn: pgConn) {
  const country = new CountryBuilder().build();
  const countryId = await insertCountry(conn, country);

  const manufacturer = new ManufacturerBuilder().build();
  const manufacturerId = await insertManufacturer(conn, manufacturer);

  return new ProductBuilder()
    .withCountryId(countryId)
    .withManufacturerId(manufacturerId)
    .build();
}
