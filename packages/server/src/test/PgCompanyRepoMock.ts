import { CompanyEntity } from "../entity";
import { PgCompanyRepo } from "../repository";

export default class PgCompanyRepoMock extends PgCompanyRepo {
  company: CompanyEntity;

  constructor() {
    super(null);
    this.company = new CompanyEntity({
      id: 256,
      name: "Lapka",
      KPP: "123456789",
      INN: "123456789012",
      address: "Proletarskiy pr-t 7a",
    });

    jest
      .spyOn(PgCompanyRepoMock.prototype, "createCompany")
      .mockImplementation((company: CompanyEntity) => {
        const res = this.company.id;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgCompanyRepo.prototype, "updateCompany")
      .mockImplementation((company: CompanyEntity) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgCompanyRepo.prototype, "deleteCompany")
      .mockImplementation((id: Number) => {
        return new Promise(function (resolve, reject) {
          resolve();
        });
      });

    jest
      .spyOn(PgCompanyRepo.prototype, "getCompany")
      .mockImplementation((id: number) => {
        const res = this.company;
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });

    jest
      .spyOn(PgCompanyRepo.prototype, "getCompanyList")
      .mockImplementation(() => {
        const res = [this.company];
        return new Promise(function (resolve, reject) {
          resolve(res);
        });
      });
  }
}
