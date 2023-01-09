import "reflect-metadata";
import PgCompanyRepo from "../../src/repository/PgCompanyRepo";
import CompanyService from "../../src/service/CompanyService";
import { CompanyBuilder } from "../builders";

let companyRepo: PgCompanyRepo;
let companyService: CompanyService;

let companyBuilder: CompanyBuilder;

describe("CompanyService", () => {
  beforeAll(() => {
    companyRepo = new PgCompanyRepo(null);
    companyService = new CompanyService(companyRepo);
  });
  beforeEach(() => {
    companyBuilder = new CompanyBuilder();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("createCompany", async () => {
    const company = companyBuilder.build();

    jest
      .spyOn(PgCompanyRepo.prototype, "createCompany")
      .mockResolvedValue(company.id);

    const response = await companyService.createCompany(company);
    expect(companyRepo.createCompany).toBeCalledTimes(1);
    expect(response).toEqual(company.id);
  });
  it("updateCompany", async () => {
    const company = companyBuilder.build();

    jest.spyOn(PgCompanyRepo.prototype, "updateCompany").mockResolvedValue();

    const response = await companyService.updateCompany(company);
    expect(companyRepo.updateCompany).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("deleteCompany", async () => {
    const company = companyBuilder.build();

    jest.spyOn(PgCompanyRepo.prototype, "deleteCompany").mockResolvedValue();

    const response = await companyService.deleteCompany(company.id);
    expect(companyRepo.deleteCompany).toBeCalledTimes(1);
    expect(response).toEqual(undefined);
  });
  it("getCompany -- success", async () => {
    const company = companyBuilder.build();

    jest
      .spyOn(PgCompanyRepo.prototype, "getCompany")
      .mockResolvedValue(company);

    const response = await companyService.getCompany(company.id);
    expect(companyRepo.getCompany).toBeCalledTimes(1);
    expect(response).toEqual(company);
  });
  it("getCompany -- company not found", async () => {
    const company = companyBuilder.build();

    jest.spyOn(PgCompanyRepo.prototype, "getCompany").mockResolvedValue(null);

    const response = await companyService.getCompany(company.id);
    expect(companyRepo.getCompany).toBeCalledTimes(1);
    expect(response).toEqual(null);
  });
  it("getCompanyList -- non-empty list", async () => {
    const companyList = [];
    for (let i = 0; i < 3; i++) companyList.push(companyBuilder.build());

    jest
      .spyOn(PgCompanyRepo.prototype, "getCompanyList")
      .mockResolvedValue(companyList);

    const response = await companyService.getCompanyList();
    expect(companyRepo.getCompanyList).toBeCalledTimes(1);
    expect(response).toEqual(companyList);
  });
  it("getCompanyList -- empty list", async () => {
    jest.spyOn(PgCompanyRepo.prototype, "getCompanyList").mockResolvedValue([]);

    const response = await companyService.getCompanyList();
    expect(companyRepo.getCompanyList).toBeCalledTimes(1);
    expect(response).toEqual([]);
  });
});
