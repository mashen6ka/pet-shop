import { CompanyEntity } from "../entity";

export default interface ICompanyRepo {
  createCompany: (company: CompanyEntity) => Promise<number>;
  updateCompany: (company: CompanyEntity) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
  getCompany: (id: number) => Promise<CompanyEntity>;
  getCompanyList: () => Promise<Array<CompanyEntity>>;
}
