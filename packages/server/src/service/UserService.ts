import { CompanyEntity, UserEntity, OrderEntity } from "../entity";
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

  async getUserList(): Promise<Array<UserEntity>> {
    const userList = await this.repo.getUserList();
    return userList;
  }

  async getUserCompanyList(userId: number): Promise<Array<CompanyEntity>> {
    const companyList = await this.repo.getUserCompanyList(userId);
    return companyList;
  }

  async getUserOrderList(userId: number): Promise<Array<OrderEntity>> {
    const orderList = await this.repo.getUserOrderList(userId);
    return orderList;
  }

  async createUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.createUserCompany(userId, companyId);
  }

  async deleteUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.deleteUserCompany(userId, companyId);
  }
}
