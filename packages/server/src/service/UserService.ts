import { CompanyEntity, UserEntity } from "../entity";
import { IUserRepo } from "../repository";

export default class UserService {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  async createUser(user: UserEntity): Promise<Number> {
    //хеширование пароля
    const id = await this.repo.createUser(user);
    return id;
  }

  async updateUser(user: UserEntity): Promise<void> {
    //хеширование пароля
    await this.repo.updateUser(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repo.deleteUser(id);
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.repo.getUser(id);
    return user;
  }

  async getUserCompanyList(id: number): Promise<Array<CompanyEntity>> {
    const companyList = await this.repo.getUserCompanyList(id);
    return companyList;
  }

  async createUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.createUserCompany(userId, companyId);
  }

  async deleteUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.deleteUserCompany(userId, companyId);
  }
}
