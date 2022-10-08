import { CompanyEntity } from "../entity";
import { ICompanyRepo } from "../repository";

export default class CompanyService {
  private repo: ICompanyRepo;

  constructor(repo: ICompanyRepo) {
    this.repo = repo;
  }

  async createCompany(company: CompanyEntity): Promise<number> {
    const id = await this.repo.createCompany(company);
    return id;
  }

  async updateCompany(company: CompanyEntity): Promise<void> {
    await this.repo.updateCompany(company);
  }

  async deleteCompany(id: number): Promise<void> {
    await this.repo.deleteCompany(id);
  }

  async getCompany(id: number): Promise<CompanyEntity> {
    const company = await this.repo.getCompany(id);
    return company;
  }

  async getCompanyList(): Promise<Array<CompanyEntity>> {
    const companyList = await this.repo.getCompanyList();
    return companyList;
  }
}
