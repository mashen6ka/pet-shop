import "reflect-metadata";
import { CompanyEntity } from "../../src/entity";
import { PgCompanyRepo } from "../../src/repository";
import CompanyService from "../../src/service/CompanyService";
import { connectDB } from "../../src/common";

describe("Company", () => {
  it("Repository", async () => {
    const conn = connectDB("postgres", "postgres");
    const companyRepo = new PgCompanyRepo(conn);

    const company = new CompanyEntity({
      id: null,
      name: "Lapka",
      KPP: "123456789",
      INN: "123456789012",
      address: "Proletarskiy pr-t 7a",
    });

    const createCompanyRes = await companyRepo.createCompany(company);
    expect(createCompanyRes).toEqual(expect.any(Number));

    company.id = createCompanyRes;
    const updateCompanyRes = await companyRepo.updateCompany(company);
    expect(updateCompanyRes).toEqual(undefined);

    const getCompanyRes = await companyRepo.getCompany(company.id);
    expect(getCompanyRes).toEqual(company);

    const getCompanyListRes = await companyRepo.getCompanyList();
    expect(getCompanyListRes.length).not.toBe(0);

    const deleteCompanyRes = await companyRepo.deleteCompany(company.id);
    expect(deleteCompanyRes).toEqual(undefined);
  });
});
