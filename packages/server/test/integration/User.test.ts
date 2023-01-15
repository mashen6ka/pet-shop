import "reflect-metadata";
import { Client as pgConn } from "pg";
import crypto from "crypto";
import connectDB from "../connect-db";
import { UserBuilder } from "../builders";
import { authenticateUser } from "../create-and-authenticate-user";
import sendRequest from "../send-request";
import checkResponse from "../check-response";
import { insertUser, selectSession, selectUser } from "../db-helpers";
import { AuthnEntity } from "../../src/entity";

describe("User", () => {
  let conn: pgConn;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/user/create", async () => {
    const user = new UserBuilder().build();
    const serviceResponse = await sendRequest("post", "/user/create", user);

    const userId = serviceResponse.data.data.id;
    user.id = userId;
    user.password = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("base64");
    checkResponse(serviceResponse.data, { id: user.id });

    const dbResponse = await selectUser(conn, userId);
    expect(dbResponse).toStrictEqual(user);
  });

  it("/user/update", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);
    user.id = userId;
    const token = await authenticateUser(user.login, user.password);

    user.email = "updated@email.com";
    const serviceResponse = await sendRequest(
      "post",
      "/user/update",
      user,
      token
    );

    user.password = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("base64");

    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectUser(conn, userId);
    expect(dbResponse).toStrictEqual(user);
  });

  it("/user/get", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);
    user.id = userId;
    const token = await authenticateUser(user.login, user.password);

    const serviceResponse = await sendRequest("get", "/user/get", {}, token);

    user.password = crypto
      .createHash("sha256")
      .update(user.password)
      .digest("base64");

    expect(user.birthday.toLocaleDateString()).toEqual(
      serviceResponse.data.data.birthday
    );
    delete user.birthday;
    delete serviceResponse.data.data.birthday;

    checkResponse(serviceResponse.data, user);
  });

  it("/user/get/list", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);
    user.id = userId;
    const token = await authenticateUser(user.login, user.password);

    const serviceResponse = await sendRequest(
      "get",
      "/user/get/list",
      {},
      token
    );

    const userList = [user];
    for (let i = 0; i < userList.length; i++) {
      userList[i].password = crypto
        .createHash("sha256")
        .update(userList[i].password)
        .digest("base64");

      expect(userList[i].birthday.toLocaleDateString()).toEqual(
        serviceResponse.data.data[i].birthday
      );
      delete userList[i].birthday;
      delete serviceResponse.data.data[i].birthday;
    }
    checkResponse(serviceResponse.data, userList);
  });

  it("/user/delete", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);

    user.id = userId;
    const serviceResponse = await sendRequest("post", "/user/delete", {
      id: user.id,
    });
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectUser(conn, userId);
    expect(dbResponse).toStrictEqual(undefined);
  });

  it("/user/authn", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);

    const authn = new AuthnEntity({
      login: user.login,
      password: user.password,
    });

    const serviceResponse = await sendRequest("post", "/user/authn", authn);
    const token = serviceResponse.data.data.token;
    expect(serviceResponse.data.success).toBeTruthy();
    expect(token).toBeDefined();

    const dbResponse = await selectSession(conn, token);
    expect(dbResponse).toStrictEqual(userId);
  });
});
