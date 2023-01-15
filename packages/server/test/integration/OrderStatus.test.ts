import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import { OrderStatusBuilder, UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequestAuthorized from "../send-request-authorized";
import checkResponse from "../check-response";
import { insertOrderStatus, selectOrderStatus } from "../db-helpers";

describe("OrderStatus", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user", "order_status"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user", "order_status"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/order/status/create", async () => {
    const orderStatus = new OrderStatusBuilder().build();
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/status/create",
      orderStatus,
      token
    );

    const orderStatusId = serviceResponse.data.data.id;
    orderStatus.id = orderStatusId;
    checkResponse(serviceResponse.data, { id: orderStatus.id });

    const dbResponse = await selectOrderStatus(conn, orderStatusId);
    expect(dbResponse).toStrictEqual(orderStatus);
  });

  it("/order/status/update", async () => {
    const orderStatus = new OrderStatusBuilder().build();
    const orderStatusId = await insertOrderStatus(conn, orderStatus);

    const orderStatusUpdated = new OrderStatusBuilder().build();
    orderStatusUpdated.id = orderStatusId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/status/update",
      orderStatusUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrderStatus(conn, orderStatusId);
    expect(dbResponse).toStrictEqual(orderStatusUpdated);
  });

  it("/order/status/get", async () => {
    const orderStatus = new OrderStatusBuilder().build();
    const orderStatusId = await insertOrderStatus(conn, orderStatus);

    orderStatus.id = orderStatusId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/order/status/get",
      { id: orderStatus.id },
      token
    );
    checkResponse(serviceResponse.data, orderStatus);
  });

  it("/order/status/get/list", async () => {
    const orderStatus = new OrderStatusBuilder().build();
    const orderStatusId = await insertOrderStatus(conn, orderStatus);

    orderStatus.id = orderStatusId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/order/status/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [orderStatus]);
  });

  it("/order/status/delete", async () => {
    const orderStatus = new OrderStatusBuilder().build();
    const orderStatusId = await insertOrderStatus(conn, orderStatus);

    orderStatus.id = orderStatusId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/order/status/delete",
      { id: orderStatus.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectOrderStatus(conn, orderStatusId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
