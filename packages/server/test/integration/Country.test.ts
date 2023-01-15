import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import { CountryBuilder, UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequestAuthorized from "../send-request-authorized";
import checkResponse from "../check-response";
import { insertCountry, selectCountry } from "../db-helpers";

describe("Country", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user", "country"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user", "country"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/country/create", async () => {
    const country = new CountryBuilder().build();
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/country/create",
      country,
      token
    );

    const countryId = serviceResponse.data.data.id;
    country.id = countryId;
    checkResponse(serviceResponse.data, { id: country.id });

    const dbResponse = await selectCountry(conn, countryId);
    expect(dbResponse).toStrictEqual(country);
  });

  it("/country/update", async () => {
    const country = new CountryBuilder().build();
    const countryId = await insertCountry(conn, country);

    const countryUpdated = new CountryBuilder().build();
    countryUpdated.id = countryId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/country/update",
      countryUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectCountry(conn, countryId);
    expect(dbResponse).toStrictEqual(countryUpdated);
  });

  it("/country/get", async () => {
    const country = new CountryBuilder().build();
    const countryId = await insertCountry(conn, country);

    country.id = countryId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/country/get",
      { id: country.id },
      token
    );
    checkResponse(serviceResponse.data, country);
  });

  it("/country/get/list", async () => {
    const country = new CountryBuilder().build();
    const countryId = await insertCountry(conn, country);

    country.id = countryId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/country/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [country]);
  });

  it("/country/delete", async () => {
    const country = new CountryBuilder().build();
    const countryId = await insertCountry(conn, country);

    country.id = countryId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/country/delete",
      { id: country.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectCountry(conn, countryId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
