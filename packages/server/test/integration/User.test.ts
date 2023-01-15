import "reflect-metadata";
import { Client as pgConn } from "pg";
import crypto from "crypto";
import connectDB from "../connect-db";
import { UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequest from "../send-request";
import checkResponse from "../check-response";
import { insertUser, selectUser } from "../db-helpers";

describe("User", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
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
    const serviceResponse = await sendRequest(
      "post",
      "/user/create",
      user,
      token
    );

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

  it("/user/delete", async () => {
    const user = new UserBuilder().build();
    const userId = await insertUser(conn, user);

    user.id = userId;
    const serviceResponse = await sendRequest(
      "post",
      "/user/delete",
      { id: user.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectUser(conn, userId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
