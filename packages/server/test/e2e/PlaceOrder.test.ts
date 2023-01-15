import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import {
  CountryBuilder,
  ManufacturerBuilder,
  OrderBuilder,
  OrderStatusBuilder,
  ProductBuilder,
  ShopBuilder,
  UserBuilder,
} from "../builders";
import sendRequestAuthorized from "../send-request-authorized";
import {
  insertCountry,
  insertManufacturer,
  insertOrderStatus,
  insertProduct,
  insertShop,
  insertUser,
  selectOrder,
  selectOrderItem,
} from "../db-helpers";
import { AuthnEntity } from "../../src/entity";

describe("PlaceOrder", () => {
  let conn: pgConn;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of [
      "order",
      "user",
      "manufacturer",
      "country",
      "product",
      "shop",
      "order_status",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    done();
  });

  afterEach(async (done) => {
    for (const table of [
      "order",
      "user",
      "manufacturer",
      "country",
      "product",
      "shop",
      "order_status",
    ]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("", async () => {
    // создаем обычного пользователя
    const testUser = new UserBuilder().withWorker(false).build();
    const testUserId = await insertUser(conn, testUser);

    // создаем список товаров
    let productList = await createProductList(conn);

    // создаем магазин
    const shop = new ShopBuilder().build();
    const shopId = await insertShop(conn, shop);
    shop.id = shopId;

    // создаем статус заказа
    const status = new OrderStatusBuilder().withName("Accepted").build();
    const statusId = await insertOrderStatus(conn, status);
    status.id = statusId;

    // авторизовываемся под тестовым юзером
    const authn = new AuthnEntity({
      login: testUser.login,
      password: testUser.password,
    });

    const authResponse = await sendRequestAuthorized(
      "post",
      "/user/authn",
      authn,
      null
    );
    const token = authResponse.data.data.token;

    // получаем список товаров
    await sendRequestAuthorized("get", "/product/get/list", {}, token);

    // оформляем заказ - заполняем основные данные
    const order = new OrderBuilder()
      .withCompanyId(null)
      .withShopId(shopId)
      .withStatusId(statusId)
      .withUserId(testUserId)
      .build();
    order.completedAt = null;
    const orderCreateResponse = await sendRequestAuthorized(
      "post",
      "/order/create",
      order,
      token
    );
    const orderId = orderCreateResponse.data.data.id;
    order.id = orderId;

    // оформляем заказ - добавляем товар
    const productInOrder = productList[0];
    const productQuantity = 2;
    await sendRequestAuthorized(
      "post",
      "/order/create/item",
      {
        orderId: orderId,
        productId: productInOrder.id,
        quantity: productQuantity,
      },
      token
    );

    // получаем список оформленных юзером заказов
    await sendRequestAuthorized("get", "/user/get/order/list", {}, token);

    // проверяем оформленный заказ в бд
    const dbOrderResponse = await selectOrder(conn, orderId);
    expect(dbOrderResponse).toStrictEqual(order);

    // проверяем наполнение заказа в бд
    const dbOrderItemReponse = await selectOrderItem(
      conn,
      orderId,
      productInOrder.id
    );
    expect(dbOrderItemReponse).toStrictEqual({
      orderId: orderId,
      productId: productInOrder.id,
      quantity: productQuantity,
    });
  });
});

async function createProductList(conn: pgConn) {
  const country = new CountryBuilder().build();
  const countryId = await insertCountry(conn, country);

  const manufacturer = new ManufacturerBuilder().build();
  const manufacturerId = await insertManufacturer(conn, manufacturer);

  let productList = [];
  for (let i = 0; i < 5; i++) {
    const product = new ProductBuilder()
      .withCountryId(countryId)
      .withManufacturerId(manufacturerId)
      .build();

    const productId = await insertProduct(conn, product);
    product.id = productId;

    productList.push(product);
  }
  return productList;
}
