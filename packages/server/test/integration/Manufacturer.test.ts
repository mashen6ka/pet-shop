import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import { ManufacturerBuilder, UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequest from "../send-request";
import checkResponse from "../check-response";
import { insertManufacturer, selectManufacturer } from "../db-helpers";

describe("Manufacturer", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user", "manufacturer"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user", "manufacturer"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/manufacturer/create", async () => {
    const manufacturer = new ManufacturerBuilder().build();
    const serviceResponse = await sendRequest(
      "post",
      "/manufacturer/create",
      manufacturer,
      token
    );

    const manufacturerId = serviceResponse.data.data.id;
    manufacturer.id = manufacturerId;
    checkResponse(serviceResponse.data, { id: manufacturer.id });

    const dbResponse = await selectManufacturer(conn, manufacturerId);
    expect(dbResponse).toStrictEqual(manufacturer);
  });

  it("/manufacturer/update", async () => {
    const manufacturer = new ManufacturerBuilder().build();
    const manufacturerId = await insertManufacturer(conn, manufacturer);

    const manufacturerUpdated = new ManufacturerBuilder().build();
    manufacturerUpdated.id = manufacturerId;
    const serviceResponse = await sendRequest(
      "post",
      "/manufacturer/update",
      manufacturerUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectManufacturer(conn, manufacturerId);
    expect(dbResponse).toStrictEqual(manufacturerUpdated);
  });

  it("/manufacturer/get", async () => {
    const manufacturer = new ManufacturerBuilder().build();
    const manufacturerId = await insertManufacturer(conn, manufacturer);

    manufacturer.id = manufacturerId;
    const serviceResponse = await sendRequest(
      "get",
      "/manufacturer/get",
      { id: manufacturer.id },
      token
    );
    checkResponse(serviceResponse.data, manufacturer);
  });

  it("/manufacturer/get/list", async () => {
    const manufacturer = new ManufacturerBuilder().build();
    const manufacturerId = await insertManufacturer(conn, manufacturer);

    manufacturer.id = manufacturerId;
    const serviceResponse = await sendRequest(
      "get",
      "/manufacturer/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [manufacturer]);
  });

  it("/manufacturer/delete", async () => {
    const manufacturer = new ManufacturerBuilder().build();
    const manufacturerId = await insertManufacturer(conn, manufacturer);

    manufacturer.id = manufacturerId;
    const serviceResponse = await sendRequest(
      "post",
      "/manufacturer/delete",
      { id: manufacturer.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectManufacturer(conn, manufacturerId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
