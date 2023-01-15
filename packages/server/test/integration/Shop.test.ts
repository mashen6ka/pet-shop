import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import { ShopBuilder, UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequestAuthorized from "../send-request-authorized";
import checkResponse from "../check-response";
import { insertShop, selectShop } from "../db-helpers";

describe("Shop", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user", "shop"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user", "shop"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/shop/create", async () => {
    const shop = new ShopBuilder().build();
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/shop/create",
      shop,
      token
    );

    const shopId = serviceResponse.data.data.id;
    shop.id = shopId;
    checkResponse(serviceResponse.data, { id: shop.id });

    const dbResponse = await selectShop(conn, shopId);
    expect(dbResponse).toStrictEqual(shop);
  });

  it("/shop/update", async () => {
    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);

    const shopUpdated = new ShopBuilder().build();
    shopUpdated.id = shopId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/shop/update",
      shopUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectShop(conn, shopId);
    expect(dbResponse).toStrictEqual(shopUpdated);
  });

  it("/shop/get", async () => {
    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);

    shop.id = shopId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/shop/get",
      { id: shop.id },
      token
    );
    checkResponse(serviceResponse.data, shop);
  });

  it("/shop/get/list", async () => {
    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);

    shop.id = shopId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/shop/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [shop]);
  });

  it("/shop/delete", async () => {
    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);

    shop.id = shopId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/shop/delete",
      { id: shop.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectShop(conn, shopId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
