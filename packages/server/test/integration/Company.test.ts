import "reflect-metadata";
import { Client as pgConn } from "pg";
import connectDB from "../connect-db";
import { CompanyBuilder, UserBuilder } from "../builders";
import { createAndAuthenticateUser } from "../create-and-authenticate-user";
import sendRequestAuthorized from "../send-request-authorized";
import checkResponse from "../check-response";
import { insertCompany, selectCompany } from "../db-helpers";

describe("Company", () => {
  let conn: pgConn;
  let token: string;

  beforeEach(async (done) => {
    conn = await connectDB();
    for (const table of ["user", "company"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    const user = new UserBuilder().withWorker(true).build();
    token = await createAndAuthenticateUser(user);
    done();
  });

  afterEach(async (done) => {
    for (const table of ["user", "company"]) {
      await conn.query(`DELETE FROM "${table}"`);
    }
    await conn.end();
    done();
  });

  it("/company/create", async () => {
    const company = new CompanyBuilder().build();
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/company/create",
      company,
      token
    );

    const companyId = serviceResponse.data.data.id;
    company.id = companyId;
    checkResponse(serviceResponse.data, { id: company.id });

    const dbResponse = await selectCompany(conn, companyId);
    expect(dbResponse).toStrictEqual(company);
  });

  it("/company/update", async () => {
    const company = new CompanyBuilder().build();
    const companyId = await insertCompany(conn, company);

    const companyUpdated = new CompanyBuilder().build();
    companyUpdated.id = companyId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/company/update",
      companyUpdated,
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectCompany(conn, companyId);
    expect(dbResponse).toStrictEqual(companyUpdated);
  });

  it("/company/get", async () => {
    const company = new CompanyBuilder().build();
    const companyId = await insertCompany(conn, company);

    company.id = companyId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/company/get",
      { id: company.id },
      token
    );
    checkResponse(serviceResponse.data, company);
  });

  it("/company/get/list", async () => {
    const company = new CompanyBuilder().build();
    const companyId = await insertCompany(conn, company);

    company.id = companyId;
    const serviceResponse = await sendRequestAuthorized(
      "get",
      "/company/get/list",
      {},
      token
    );
    checkResponse(serviceResponse.data, [company]);
  });

  it("/company/delete", async () => {
    const company = new CompanyBuilder().build();
    const companyId = await insertCompany(conn, company);

    company.id = companyId;
    const serviceResponse = await sendRequestAuthorized(
      "post",
      "/company/delete",
      { id: company.id },
      token
    );
    checkResponse(serviceResponse.data, null);

    const dbResponse = await selectCompany(conn, companyId);
    expect(dbResponse).toStrictEqual(undefined);
  });
});
