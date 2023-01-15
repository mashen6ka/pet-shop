import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import {
  OrderBuilder,
  UserBuilder,
  CompanyBuilder,
  OrderStatusBuilder,
  ShopBuilder,
  OrderItemBuilder,
  ProductBuilder,
  CountryBuilder,
  ManufacturerBuilder,
} from "../builders";
import { createUser, authenticateUser } from "../create-and-authenticate-user";
import sendRequestAuthorized from "../send-request-authorized";
import checkResponse from "../check-response";
import {
  insertCompany,
  insertCountry,
  insertManufacturer,
  insertOrder,
  insertOrderItem,
  insertOrderStatus,
  insertProduct,
  insertShop,
  insertUser,
  selectOrder,
  selectOrderItem,
} from "../db-helpers";

describe("Order", () => {
  let conn: pgConn;
  let token: string;
  let userId: number;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of [
      "order",
      "order_status",
      "user",
      "company",
      "country",
      "manufacturer",
      "shop",
      "order__product",
      "product",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();

    userId = await createUser(user);
    token = await authenticateUser(user.login, user.password);
    done();
  });

  afterEach(async (done) => {
    for (const table of [
      "order",
      "order_status",
      "user",
      "company",
      "country",
      "manufacturer",
      "shop",
      "order__product",
      "product",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/order/create", async () => {
    const order = await buildOrderWithDependencies(conn, userId);

    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/create",
      order,
      token
    );

    const orderId = serviceResponse.data.data.id;
    order.id = orderId;

    checkResponse(serviceResponse.data, { id: order.id });

    const dbResponse = await selectOrder(conn, orderId);
    expect(dbResponse).toStrictEqual(order);
  });

  it("/order/update", async () => {
    const order = await buildOrderWithDependencies(conn, userId);

    const orderId = await insertOrder(conn, order);

    const orderUpdated = new OrderBuilder()
      .withShopId(order.shopId)
      .withStatusId(order.statusId)
      .withCompanyId(order.companyId)
      .withUserId(order.userId)
      .build();
    orderUpdated.id = orderId;

    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/update",
      orderUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrder(conn, orderId);
    expect(dbResponse).toStrictEqual(orderUpdated);
  });

  it("/order/get", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);

    order.id = orderId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/order/get",
      { id: order.id },
      token
    );
    checkResponse(serviceResponse.data, order);
  });

  it("/order/get/list", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);

    order.id = orderId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/order/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [order]);
  });

  it("/order/delete", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);

    order.id = orderId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/delete",
      { id: order.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrder(conn, orderId);
    expect(dbResponse).toStrictEqual(undefined);
  });

  it("/order/create/item", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);
    const orderItem = await buildOrderItemWithDependencies(conn);

    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/create/item",
      {
        orderId: orderId,
        productId: orderItem.product.id,
        quantity: orderItem.quantity,
      },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrderItem(
      conn,
      orderId,
      orderItem.product.id
    );
    expect(dbResponse).toStrictEqual({
      orderId: orderId,
      productId: orderItem.product.id,
      quantity: orderItem.quantity,
    });
  });

  it("/order/update/item", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);
    const orderItem = await buildOrderItemWithDependencies(conn);
    await insertOrderItem(conn, orderId, orderItem);

    const orderItemUpdated = orderItem;
    orderItemUpdated.quantity = orderItem.quantity + 1;

    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/update/item",
      {
        orderId: orderId,
        productId: orderItemUpdated.product.id,
        quantity: orderItemUpdated.quantity,
      },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrderItem(
      conn,
      orderId,
      orderItemUpdated.product.id
    );
    expect(dbResponse).toStrictEqual({
      orderId: orderId,
      productId: orderItemUpdated.product.id,
      quantity: orderItemUpdated.quantity,
    });
  });

  it("/order/delete/item", async () => {
    const order = await buildOrderWithDependencies(conn, userId);
    const orderId = await insertOrder(conn, order);
    const orderItem = await buildOrderItemWithDependencies(conn);
    await insertOrderItem(conn, orderId, orderItem);

    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/delete/item",
      {
        orderId: orderId,
        productId: orderItem.product.id,
      },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrderItem(
      conn,
      orderId,
      orderItem.product.id
    );
    expect(dbResponse).toStrictEqual(undefined);
  });
});

async function buildOrderWithDependencies(conn: pgConn, userId: number) {
  const shop = new ShopBuilder().build();
  const shopId = await insertShop(conn, shop);

  const status = new OrderStatusBuilder().withName("Completed").build();
  const statusId = await insertOrderStatus(conn, status);

  const company = new CompanyBuilder().build();
  const companyId = await insertCompany(conn, company);

  return new OrderBuilder()
    .withShopId(shopId)
    .withStatusId(statusId)
    .withCompanyId(companyId)
    .withUserId(userId)
    .build();
}

async function buildOrderItemWithDependencies(conn: pgConn) {
  const country = new CountryBuilder().build();
  const countryId = await insertCountry(conn, country);

  const manufacturer = new ManufacturerBuilder().build();
  const manufacturerId = await insertManufacturer(conn, manufacturer);

  const product = new ProductBuilder()
    .withCountryId(countryId)
    .withManufacturerId(manufacturerId)
    .build();
  const productId = await insertProduct(conn, product);
  product.id = productId;

  return new OrderItemBuilder().withProduct(product).build();
}
