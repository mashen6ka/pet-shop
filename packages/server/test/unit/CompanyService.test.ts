import "reflect-metadata";
import CompanyService from "../../src/service/CompanyService";
import PgCompanyRepoMock from "../../src/test/PgCompanyRepoMock";

describe("Company", () => {
  it("Service", async () => {
    const companyRepo = new PgCompanyRepoMock();
    const companyService = new CompanyService(companyRepo);

    const company = companyRepo.company;

    const createCompanyRes = await companyService.createCompany(company);
    expect(createCompanyRes).toEqual(company.id);

    const updateCompanyRes = await companyService.updateCompany(company);
    expect(updateCompanyRes).toEqual(undefined);

    const deleteCompanyRes = await companyService.deleteCompany(company.id);
    expect(deleteCompanyRes).toEqual(undefined);

    const getCompanyRes = await companyService.getCompany(company.id);
    expect(getCompanyRes).toEqual(company);

    const getCompanyListRes = await companyService.getCompanyList();
    expect(getCompanyListRes).toEqual([company]);
  });
});
